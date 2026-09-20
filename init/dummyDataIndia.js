// A batch of dummy listings, all within India, matching this project's
// actual schema (models/listing.js): a single `image` object, not an array.
//
// Images are hotlinked from Unsplash for convenience — NOT real Cloudinary
// uploads, so the "filename" values are placeholders only (safe to delete,
// nothing real to clean up on Cloudinary's side).
//
// No owner or geometry is set here — the insert script assigns the owner,
// and you run the existing backfill script afterward to add map coordinates.

module.exports = [
  {
    title: "Houseboat on the Backwaters",
    description:
      "A traditional Kerala houseboat, slow-drifting through palm-lined backwaters. Meals are cooked fresh onboard, and the sunset from the deck is the whole reason to book this one.",
    price: 7500,
    location: "Alleppey",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
      filename: "india_dummy_1",
    },
  },
  {
    title: "Heritage Haveli in the Old City",
    description:
      "A restored 18th-century haveli with carved sandstone balconies and a rooftop that looks straight out over the old city's rooftops and kites. Ten minutes' walk from the main bazaar.",
    price: 5600,
    location: "Jaipur",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
      filename: "india_dummy_2",
    },
  },
  {
    title: "Tea Estate Bungalow in the Hills",
    description:
      "A colonial-era planter's bungalow set inside a working tea estate, surrounded by mist and rolling green slopes. Estate walks and tea-tasting are arranged on request.",
    price: 6200,
    location: "Munnar",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1200&auto=format&fit=crop",
      filename: "india_dummy_3",
    },
  },
  {
    title: "Beach Shack Steps from the Sand",
    description:
      "A simple, breezy shack right behind the dunes — nothing fancy, just a hammock, a fan, and about thirty seconds to the water. Popular with people who came to do absolutely nothing.",
    price: 2200,
    location: "Gokarna",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      filename: "india_dummy_4",
    },
  },
  {
    title: "Desert Camp Under the Stars",
    description:
      "A tented camp on the edge of the Thar desert, with charpoy beds under open sky and a bonfire most nights. Camel rides at sunset are arranged through the camp.",
    price: 3800,
    location: "Jaisalmer",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
      filename: "india_dummy_5",
    },
  },
  {
    title: "Riverside Cottage in the Himalayan Foothills",
    description:
      "A wooden cottage right on the riverbank, with the sound of rushing water audible from every room. Good base for short treks in the surrounding hills.",
    price: 4100,
    location: "Rishikesh",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop",
      filename: "india_dummy_6",
    },
  },
];
