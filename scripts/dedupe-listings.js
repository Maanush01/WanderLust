// Finds listings that share the exact same title — a sign they were
// inserted more than once (e.g. a seed/dummy script run twice). For each
// group of duplicates, keeps the OLDEST one (first ever created) and
// lists the rest as candidates for removal.
//
// SAFE BY DEFAULT: running with no flags just lists what it found.
// Run again with --delete to actually remove the extra copies.
//
//   node scripts/dedupe-listings.js            (dry run — lists only)
//   node scripts/dedupe-listings.js --delete    (actually deletes extras)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");

async function run() {
  const dbUrl = process.env.ATLASDB_URL;
  if (!dbUrl) {
    console.error("ATLASDB_URL is not set — check your .env file.");
    process.exit(1);
  }

  const shouldDelete = process.argv.includes("--delete");

  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB.");

  const all = await Listing.find({}).sort({ _id: 1 }); // sort by _id = creation order

  const byTitle = new Map();
  for (const listing of all) {
    const key = listing.title.trim();
    if (!byTitle.has(key)) byTitle.set(key, []);
    byTitle.get(key).push(listing);
  }

  const duplicateGroups = [...byTitle.entries()].filter(([, docs]) => docs.length > 1);

  if (duplicateGroups.length === 0) {
    console.log("No duplicate titles found. Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  let totalExtras = 0;
  console.log(`Found ${duplicateGroups.length} title(s) with duplicates:\n`);

  for (const [title, docs] of duplicateGroups) {
    const [keep, ...extras] = docs;
    totalExtras += extras.length;
    console.log(`"${title}" — ${docs.length} copies`);
    console.log(`  KEEP:   ${keep._id} (oldest)`);
    extras.forEach((d) => console.log(`  ${shouldDelete ? "DELETE" : "would delete"}: ${d._id}`));
    console.log("");
  }

  if (!shouldDelete) {
    console.log(`This was a dry run — nothing was deleted. Re-run with --delete to remove these ${totalExtras} duplicate(s):`);
    console.log("  node scripts/dedupe-listings.js --delete");
  } else {
    const idsToDelete = duplicateGroups.flatMap(([, docs]) => docs.slice(1).map((d) => d._id));
    const result = await Listing.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`Deleted ${result.deletedCount} duplicate listing(s). Kept the original of each.`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Dedupe failed:", err);
  process.exit(1);
});
