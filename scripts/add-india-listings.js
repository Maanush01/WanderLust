// Inserts the India-only dummy listings from init/dummyDataIndia.js,
// assigning them to a real user account so you can log in and edit/delete
// them normally. ADDITIVE ONLY — never deletes anything.
//
// Run with: node scripts/add-india-listings.js <your-username>

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const dummyListings = require("../init/dummyDataIndia");

async function run() {
  const dbUrl = process.env.ATLASDB_URL;
  if (!dbUrl) {
    console.error("ATLASDB_URL is not set — check your .env file.");
    process.exit(1);
  }

  const username = process.argv[2];
  if (!username) {
    console.error(
      "Usage: node scripts/add-india-listings.js <your-username>\n" +
      "This assigns you as the owner, so you can log in and edit/delete these listings normally."
    );
    process.exit(1);
  }

  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB.");

  const user = await User.findOne({ username });
  if (!user) {
    console.error(`No user found with username "${username}". Sign up on the site first, then re-run this.`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const listingsWithOwner = dummyListings.map((l) => ({ ...l, owner: user._id }));
  const inserted = await Listing.insertMany(listingsWithOwner);
  console.log(`Inserted ${inserted.length} listing(s), owned by "${username}":`);
  inserted.forEach((l) => console.log(`  - "${l.title}" (id: ${l._id})`));

  console.log(
    "\nThese have no map coordinates yet. Run 'node scripts/backfill-geocode.js' to add them."
  );

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Insert failed:", err);
  process.exit(1);
});
