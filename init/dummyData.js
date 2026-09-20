// A handful of dummy listings for testing/demoing, matching this project's
// actual schema (models/listing.js): a single `image` object, not an array.
//
// Images are hotlinked from Unsplash for convenience — they are NOT real
// Cloudinary uploads, so the "filename" values here are placeholders only.
// If you ever delete one of these listings, the app's Cloudinary-cleanup
// step will harmlessly no-op on these fake filenames (nothing to actually
// delete on Cloudinary's side).
//
// No `owner` is set here on purpose — this file only inserts the listings,
// it doesn't tie them to any specific user account. They'll show up in the
// listings grid but won't show edit/delete buttons to anyone (same as your
// existing seed data behaves).
//
// No `geometry` is set either — leave it out and the map will simply stay
// hidden for these until you run your existing backfill script:
//   node scripts/backfill-geocode.js
// which will geocode these along with anything else missing coordinates.

module.exports = [
  {
    title: "Bamboo Cottage by the Paddy Fields",
    description:
      "A simple bamboo-and-thatch cottage overlooking terraced rice paddies. Wake up to mist over the fields and the sound of birds, not traffic. A short walk takes you to the village market.",
    price: 2800,
    location: "Munnar",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop",
      filename: "dummy_1",
    },
  },
  {
    title: "Modern Studio Above the Harbour",
    description:
      "A compact, sunlit studio with floor-to-ceiling windows looking straight out over the fishing harbour. Walkable to every café and gallery in town, with a rooftop terrace shared by the building.",
    price: 5200,
    location: "Kochi",
    country: "India",
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      filename: "dummy_2",
    },
  },
  {
    title: "Stone Farmhouse with a Wood-Fired Oven",
    description:
      "A restored stone farmhouse on a working olive farm. Guests are welcome to help with the harvest in season, and the outdoor wood-fired oven is fair game for anyone who wants to bake.",
    price: 6100,
    location: "Tuscany",
    country: "Italy",
    image: {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
      filename: "dummy_3",
    },
  },
  {
    title: "Cliffside Cabana with a Private Plunge Pool",
    description:
      "A small, open-air cabana perched above the coastline, with its own private plunge pool and uninterrupted sunset views. Best suited to travelers who want quiet over nightlife.",
    price: 8700,
    location: "Uluwatu",
    country: "Indonesia",
    image: {
      url: "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?q=80&w=1200&auto=format&fit=crop",
      filename: "dummy_4",
    },
  },
  {
    title: "Converted Barn Loft in the Vineyards",
    description:
      "A high-ceilinged loft carved out of a 19th-century barn, surrounded by rows of vines. Bikes are provided for exploring nearby wineries, and the loft's skylights make for excellent stargazing.",
    price: 4300,
    location: "Napa Valley",
    country: "United States",
    image: {
      url: "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?q=80&w=1200&auto=format&fit=crop",
      filename: "dummy_5",
    },
  },
];
