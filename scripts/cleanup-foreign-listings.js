// One-time cleanup: removes listings that don't belong to this app's data
// model — specifically, the sample seed listings from a different
// WanderLust project that ended up in this shared database.
//
// SAFE BY DEFAULT: running with no flags just lists what would be deleted.
// Run again with --delete to actually remove them.
//
//   node scripts/cleanup-foreign-listings.js            (dry run — lists only)
//   node scripts/cleanup-foreign-listings.js --delete    (actually deletes)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");

// Exact titles from the other project's seed data (seeds/data.js there).
// Matching on these, rather than a generic "broken image" check, means
// we only ever touch documents we can positively identify as foreign —
// never a real listing of yours that just happens to have a bad image.
const FOREIGN_TITLES = [
  "Lakeside Timber Cabin",
  "Sunlit Loft in the Old Quarter",
  "Whitewashed Cliffside Studio",
  "Desert Farmstay with Pool",
  "Restored Hillside Stone Cottage",
  "Glass-Roofed Aurora Cabin",
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

  const matches = await Listing.find({ title: { $in: FOREIGN_TITLES } });

  if (matches.length === 0) {
    console.log("No matching foreign listings found. Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  console.log(`Found ${matches.length} foreign listing(s):\n`);
  matches.forEach((l) => console.log(`  - "${l.title}" (id: ${l._id})`));

  if (!shouldDelete) {
    console.log(
      `\nThis was a dry run — nothing was deleted. Re-run with --delete to remove these ${matches.length} listing(s):`
    );
    console.log("  node scripts/cleanup-foreign-listings.js --delete");
  } else {
    const ids = matches.map((l) => l._id);
    const result = await Listing.deleteMany({ _id: { $in: ids } });
    console.log(`\nDeleted ${result.deletedCount} listing(s).`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
