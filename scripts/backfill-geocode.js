// One-time script: finds every listing still sitting on the default
// [0, 0] coordinates and geocodes it using its location + country.
// Run once with: node scripts/backfill-geocode.js
// Safe to re-run — it only touches listings that still need it.

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const NodeGeocoder = require("node-geocoder");
const Listing = require("../models/listing");

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  httpAdapter: "https",
  formatter: null,
  fetch: function customFetch(url, opts) {
    return fetch(url, {
      ...opts,
      headers: { ...(opts && opts.headers), "user-agent": "WanderLustApp/1.0" },
    });
  },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  const dbUrl = process.env.ATLASDB_URL;
  if (!dbUrl) {
    console.error("ATLASDB_URL is not set — check your .env file.");
    process.exit(1);
  }

  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB.");

  const needsGeocoding = await Listing.find({
    $or: [
      { "geometry.coordinates": { $exists: false } },
      { "geometry.coordinates": [0, 0] },
    ],
  });

  console.log(`Found ${needsGeocoding.length} listing(s) needing coordinates.`);

  let updated = 0;
  let skipped = 0;

  for (const listing of needsGeocoding) {
    const query = `${listing.location}, ${listing.country}`;
    try {
      const geoData = await geocoder.geocode(query);
      if (geoData && geoData.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: [geoData[0].longitude, geoData[0].latitude],
        };
        await listing.save();
        updated++;
        console.log(`✓ Geocoded "${listing.title}" (${query})`);
      } else {
        skipped++;
        console.log(`✗ No results for "${listing.title}" (${query}) — location may not be a real/recognized place`);
      }
    } catch (err) {
      skipped++;
      console.log(`✗ Error geocoding "${listing.title}" (${query}): ${err.message}`);
    }

    // Nominatim's usage policy caps public requests at 1 per second.
    await sleep(1100);
  }

  console.log(`\nDone. Updated: ${updated}, skipped: ${skipped}.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
