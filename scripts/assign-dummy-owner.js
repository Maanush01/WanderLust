// One-off fix: the dummy listings were already inserted without an owner
// (an older version of the insert script was used). This just sets the
// owner on those specific 5, by title — doesn't touch anything else,
// doesn't re-insert, doesn't re-geocode.
//
// Run with: node scripts/assign-dummy-owner.js <your-username>

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");

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

  const username = process.argv[2];
  if (!username) {
    console.error("Usage: node scripts/assign-dummy-owner.js <your-username>");
    process.exit(1);
  }

  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB.");

  const user = await User.findOne({ username });
  if (!user) {
    console.error(`No user found with username "${username}".`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const result = await Listing.updateMany(
    { title: { $in: DUMMY_TITLES } },
    { $set: { owner: user._id } }
  );

  console.log(`Matched ${result.matchedCount}, updated ${result.modifiedCount} listing(s) to be owned by "${username}".`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
