// Removes the duplicate dummy listings that ended up with NO owner set
// (these are the ones showing "WanderLust" as the owner on the show page —
// that's just the view's fallback text for listings with no real owner).
// Listings that DO have an owner (e.g. yours) are left completely alone.
//
// SAFE BY DEFAULT: running with no flags just lists what it found.
//   node scripts/remove-ownerless-duplicates.js            (dry run)
//   node scripts/remove-ownerless-duplicates.js --delete    (actually deletes)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");

const DUMMY_TITLES = [
  "Bamboo Cottage by the Paddy Fields",
  "Modern Studio Above the Harbour",
  "Stone Farmhouse with a Wood-Fired Oven",
  "Cliffside Cabana with a Private Plunge Pool",
  "Converted Barn Loft in the Vineyards",
];

async function run() {
  const dbUrl = process.env.ATLASDB_URL;
  if (!dbUrl) {
    console.error("ATLASDB_URL is not set — check your .env file.");
    process.exit(1);
  }

  const shouldDelete = process.argv.includes("--delete");

  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB.");

  const ownerless = await Listing.find({
    title: { $in: DUMMY_TITLES },
    owner: { $exists: false },
  });

  if (ownerless.length === 0) {
    console.log("No ownerless duplicates found among the dummy listings. Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  console.log(`Found ${ownerless.length} ownerless duplicate(s):\n`);
  ownerless.forEach((l) => console.log(`  - "${l.title}" (id: ${l._id})`));

  if (!shouldDelete) {
    console.log(`\nThis was a dry run — nothing was deleted. Re-run with --delete to remove these ${ownerless.length} listing(s):`);
    console.log("  node scripts/remove-ownerless-duplicates.js --delete");
  } else {
    const ids = ownerless.map((l) => l._id);
    const result = await Listing.deleteMany({ _id: { $in: ids } });
    console.log(`\nDeleted ${result.deletedCount} ownerless listing(s).`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
