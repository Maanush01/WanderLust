(() => {
  const toggleBtn = document.getElementById("chat-toggle");
  const panel = document.getElementById("chat-panel");
  const messagesEl = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  if (!toggleBtn || !panel || !form) return;

  let history = [];
  let sending = false;

  function openPanel() {
    panel.hidden = false;
    toggleBtn.classList.add("chat-toggle--open");
    toggleBtn.setAttribute("aria-expanded", "true");
    input.focus();
  }

  function closePanel() {
    panel.hidden = true;
    toggleBtn.classList.remove("chat-toggle--open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  toggleBtn.addEventListener("click", () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBubble(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-msg chat-msg--${role === "user" ? "user" : "bot"}`;
    const p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);
    messagesEl.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function addTypingIndicator() {
    const bubble = document.createElement("div");
    bubble.className = "chat-msg chat-msg--bot chat-msg--typing";
    bubble.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function addListingCards(listings) {
    if (!listings || !listings.length) return;
    const wrap = document.createElement("div");
    wrap.className = "chat-results";

    listings.forEach((l) => {
      const card = document.createElement("a");
      card.className = "chat-result-card";
      card.href = `/listings/${l.id}`;

      const title = document.createElement("p");
      title.className = "chat-result-card__title";
      title.textContent = l.title;

      const meta = document.createElement("p");
      meta.className = "chat-result-card__meta";
      meta.textContent = `${l.location}, ${l.country}`;

      const price = document.createElement("p");
      price.className = "chat-result-card__price";
      price.textContent = `₹${Number(l.price).toLocaleString("en-IN")} / night`;

      card.append(title, meta, price);
      wrap.appendChild(card);
    });

    messagesEl.appendChild(wrap);
    scrollToBottom();
  }

  function addErrorBubble(text) {
    const bubble = document.createElement("div");
    bubble.className = "chat-msg chat-msg--bot chat-msg--error";
    const p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);
    messagesEl.appendChild(bubble);
    scrollToBottom();
  }

  async function sendMessage(message) {
    sending = true;
    const typing = addTypingIndicator();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      const data = await res.json().catch(() => ({}));
      typing.remove();

      if (!res.ok) {
        addErrorBubble(data.error || "Something went wrong — please try again.");
        return;
      }

      addBubble("bot", data.reply);
      addListingCards(data.listings);

      history.push({ role: "user", content: message });
      history.push({ role: "assistant", content: data.reply });
      history = history.slice(-6);
    } catch (err) {
      typing.remove();
      addErrorBubble("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      sending = false;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message || sending) return;
    addBubble("user", message);
    input.value = "";
    sendMessage(message);
  });
})();
