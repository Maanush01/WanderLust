const Listing = require("../models/listing");

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_TURNS = 6;
const MAX_CATALOG_SIZE = 200;

function buildSystemPrompt(catalog) {
  return `You are the WanderLust stay-finder assistant, embedded as a chat widget on a travel-stays marketplace website. A visitor is chatting with you to find a place to stay.

Reply with ONLY a single JSON object — no markdown code fences, no text outside the JSON — matching exactly this shape:
{"reply": "<a short, warm, conversational reply, 2-4 sentences>", "listingIds": ["<id>", "..."]}

Rules:
- Recommend at most 4 listings, and only ones that genuinely fit what the visitor described (budget, location, vibe). It's fine to recommend zero.
- If nothing in the catalog fits well, say so honestly in "reply" (don't force a bad match) and return an empty listingIds array.
- Only use ids that appear in the catalog below — never invent one.
- In "reply", refer to recommended places by name and mention what makes them a fit (price, location) rather than just listing IDs.
- If the visitor asks something unrelated to finding a stay, gently steer the conversation back to helping them find a place, in "reply", with an empty listingIds array.
- Keep "reply" plain text (no markdown formatting, no links).

Catalog (JSON array of available listings):
${JSON.stringify(catalog)}`;
}

module.exports.chat = async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      error: "The assistant isn't configured yet — add GEMINI_API_KEY to your .env file.",
    });
  }

  const listings = await Listing.find({})
    .select("title location country price description")
    .limit(MAX_CATALOG_SIZE)
    .lean();

  const catalog = listings.map((l) => ({
    id: l._id.toString(),
    title: l.title,
    location: l.location,
    country: l.country,
    price: l.price,
    description: (l.description || "").slice(0, 220),
  }));

  // Gemini uses role "model" instead of "assistant" for the assistant's turns.
  const safeHistory = Array.isArray(history)
    ? history
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .slice(-MAX_HISTORY_TURNS)
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content.slice(0, MAX_MESSAGE_LENGTH) }],
        }))
    : [];

  const contents = [
    ...safeHistory,
    { role: "user", parts: [{ text: message.trim().slice(0, MAX_MESSAGE_LENGTH) }] },
  ];

  const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

  let apiResponse;
  try {
    apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: buildSystemPrompt(catalog) }] },
          contents,
          generationConfig: {
            maxOutputTokens: 1024,
            thinkingConfig: { thinkingLevel: "minimal" },
          },
        }),
      }
    );
  } catch (err) {
    console.error("Gemini API request failed:", err);
    return res.status(502).json({ error: "Couldn't reach the assistant right now. Please try again shortly." });
  }

  if (!apiResponse.ok) {
    const errText = await apiResponse.text().catch(() => "");
    console.error("Gemini API error:", apiResponse.status, errText);
    return res.status(502).json({ error: "The assistant is having trouble right now. Please try again shortly." });
  }

  const data = await apiResponse.json();
  const rawText = (
    data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || ""
  ).trim();

  let parsed;
  try {
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
    parsed = JSON.parse(cleaned);
  } catch (e) {
    parsed = { reply: rawText || "Sorry, I couldn't quite follow that — could you rephrase?", listingIds: [] };
  }

  const validIds = new Set(catalog.map((c) => c.id));
  const matchedIds = Array.isArray(parsed.listingIds)
    ? parsed.listingIds.filter((id) => typeof id === "string" && validIds.has(id)).slice(0, 4)
    : [];

  const matches = matchedIds
    .map((id) => listings.find((l) => l._id.toString() === id))
    .filter(Boolean)
    .map((l) => ({
      id: l._id.toString(),
      title: l.title,
      location: l.location,
      country: l.country,
      price: l.price,
    }));

  res.json({
    reply: typeof parsed.reply === "string" && parsed.reply.trim() ? parsed.reply : "Here's what I found.",
    listings: matches,
  });
};
