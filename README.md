# WanderLust

A travel-stays marketplace where people can browse, search, list, and review places to stay. Built with Node.js, Express, MongoDB, and EJS — with photo uploads, interactive maps, and an AI-powered "Stay Finder" chat assistant.

**Live site:** https://wanderlust-y8zv.onrender.com

## Features

- Browse and search listings by title, location, or country, with category filters
- Sign up / log in (session-based auth via Passport); only a listing's owner can edit or delete it
- Create and edit listings with photo uploads, stored on Cloudinary
- Each listing shows an interactive map, auto-generated from its location text (geocoded via OpenStreetMap)
- Leave star ratings and written reviews on listings
- **Stay Finder** — a chat widget (bottom-right corner) that reads the current listings and recommends ones that match what a visitor describes, powered by Google's Gemini API
- Responsive layout — usable on both desktop and mobile

## Tech stack

| Layer         | Technology                                                           |
| ------------- | -------------------------------------------------------------------- |
| Server        | Node.js, Express 5                                                   |
| Database      | MongoDB (Mongoose)                                                   |
| Views         | EJS + ejs-mate (layouts/partials), Bootstrap 5                       |
| Auth          | Passport, passport-local-mongoose (hashed passwords, sessions)       |
| Image storage | Cloudinary (via multer + multer-storage-cloudinary)                  |
| Maps          | Leaflet + node-geocoder (OpenStreetMap/Nominatim — free, no API key) |
| AI chat       | Google Gemini API (free tier)                                        |
| Validation    | Joi                                                                  |

## Project structure

```
app.js                    # server entrypoint, middleware, route mounting
middleware.js              # auth checks, ownership checks
schema.js                   # Joi validation schemas
cloudConfig.js               # Cloudinary + multer storage setup
models/                       # Mongoose schemas (listing, user, review)
controllers/                   # route handler logic
routes/                          # Express routers
views/                             # EJS templates
public/                             # static CSS/JS
init/                                 # seed/demo listing data
scripts/                               # one-off maintenance scripts (see below)
```

## Setup

1. **Clone the repo**

   ```
   git clone https://github.com/Maanush01/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies**

   ```
   npm install
   ```

   (An `.npmrc` with `legacy-peer-deps=true` is included, so this should resolve cleanly without extra flags.)

3. **Create a `.env` file** in the project root with:

   ```
   ATLASDB_URL=your-mongodb-connection-string
   SECRET=any-long-random-string
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   GEMINI_API_KEY=your-gemini-api-key
   ```

   - MongoDB Atlas: [mongodb.com/atlas](https://www.mongodb.com/atlas) (free tier works fine)
   - Cloudinary: [cloudinary.com](https://cloudinary.com) (free tier)
   - Gemini API key (free, no card required): [aistudio.google.com](https://aistudio.google.com) → "Get API key"
   - `GEMINI_API_KEY` is optional — without it, the chat widget still shows up but tells visitors it isn't configured yet. Everything else works fine without it.
   - Optional: `GEMINI_MODEL` to override the default model if Google renames/deprecates it later.

4. **Run it**
   ```
   npm run dev     # with nodemon (auto-restarts on file changes)
   # or
   npm start
   ```
   Visit `http://localhost:3000`.

## Utility scripts (`scripts/`)

These are one-off maintenance scripts, run manually with `node scripts/<name>.js` — not part of the running app. Most connect using the same `ATLASDB_URL` from your `.env`.

| Script                                      | What it does                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `backfill-geocode.js`                       | Geocodes any listing still missing map coordinates. Safe to re-run.                                                             |
| `add-dummy-listings.js <username>`          | Inserts 5 sample listings, owned by the given user.                                                                             |
| `add-india-listings.js <username>`          | Inserts 6 sample listings within India, owned by the given user.                                                                |
| `assign-dummy-owner.js <username>`          | One-off fix: sets an owner on the original 5 dummy listings if they were inserted without one.                                  |
| `cleanup-foreign-listings.js [--delete]`    | Finds/removes specific known seed listings from an unrelated project that ended up in this shared database. Dry-run by default. |
| `dedupe-listings.js [--delete]`             | Finds/removes duplicate listings (same title, keeps the oldest). Dry-run by default.                                            |
| `remove-ownerless-duplicates.js [--delete]` | Removes ownerless duplicates of the 5 dummy listings specifically, leaving owned copies alone. Dry-run by default.              |

Scripts marked `[--delete]` only **list** what they'd remove by default — nothing is deleted until you re-run with `--delete`.

## Deployment (Render)

The live site is deployed on [Render](https://render.com), connected to this GitHub repo.

- Push to the connected branch → Render auto-deploys
- All the `.env` variables above must also be set in **Render → your service → Environment**, separately from your local `.env`
- Watch the **Logs** tab during a deploy to catch build/start errors early

## Notes / known limitations

- No password-reset flow yet — if a user forgets their password, there's currently no way to recover the account.
- The AI chat assistant sends your entire listings catalog to Gemini on every message. Fine at small scale; would need a pre-filtering step (e.g. text/vector search) before it'd scale to a large number of listings.
- Map geocoding depends on OpenStreetMap's free Nominatim service — very made-up or misspelled location names won't resolve to a real map.
