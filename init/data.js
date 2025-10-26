const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
      filename: "beachfront"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259]
    }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
      filename: "loft"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-74.0060, 40.7128]
    }
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
      filename: "mountain"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911]
    }
  },
  {
    title: "Historic Castle Stay",
    description: "Live like royalty in this medieval castle turned luxury hotel. A once-in-a-lifetime experience!",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
      filename: "castle"
    },
    price: 5000,
    location: "Edinburgh",
    country: "Scotland",
    geometry: {
      type: "Point",
      coordinates: [-3.1883, 55.9533]
    }
  },
  {
    title: "Desert Oasis",
    description: "Experience tranquility in this desert retreat with breathtaking views of sand dunes and starry nights.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      filename: "desert"
    },
    price: 900,
    location: "Sahara",
    country: "Morocco",
    geometry: {
      type: "Point",
      coordinates: [-5.9300, 31.7917]
    }
  },
  {
    title: "Luxury City Penthouse",
    description: "Enjoy stunning skyline views from this modern penthouse apartment, complete with private rooftop pool.",
    image: {
      url: "https://images.unsplash.com/photo-1505692794400-23dbd8036e0e?auto=format&fit=crop&w=800&q=60",
      filename: "penthouse"
    },
    price: 4500,
    location: "Dubai",
    country: "UAE",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048]
    }
  },
  {
    title: "Forest Treehouse",
    description: "Reconnect with nature in this beautifully designed treehouse surrounded by lush greenery and wildlife.",
    image: {
      url: "https://images.unsplash.com/photo-1551888419-7d7f57a59731?auto=format&fit=crop&w=800&q=60",
      filename: "treehouse"
    },
    price: 1300,
    location: "Vancouver",
    country: "Canada",
    geometry: {
      type: "Point",
      coordinates: [-123.1207, 49.2827]
    }
  },
  {
    title: "Countryside Bungalow",
    description: "Relax in this charming countryside home surrounded by rolling hills and fresh air.",
    image: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
      filename: "bungalow"
    },
    price: 800,
    location: "Cotswolds",
    country: "England",
    geometry: {
      type: "Point",
      coordinates: [-1.8407, 51.9167]
    }
  },
  {
    title: "Lakefront Cabin",
    description: "Wake up to serene lake views and enjoy kayaking or fishing in this cozy lakeside cabin.",
    image: {
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60",
      filename: "lakefront"
    },
    price: 1100,
    location: "Lake Tahoe",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-120.0324, 39.0968]
    }
  },
  {
    title: "Tropical Paradise Villa",
    description: "A luxurious villa with private beach access and an infinity pool overlooking the ocean.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "tropical"
    },
    price: 3200,
    location: "Bali",
    country: "Indonesia",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095]
    }
  },
  {
    title: "Secluded Jungle Cabin",
    description: "Immerse yourself in nature with this eco-friendly jungle cabin featuring bamboo interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb21072?auto=format&fit=crop&w=800&q=60",
      filename: "jungle"
    },
    price: 950,
    location: "Chiang Mai",
    country: "Thailand",
    geometry: {
      type: "Point",
      coordinates: [98.9817, 18.7883]
    }
  },
  {
    title: "Elegant Paris Apartment",
    description: "A romantic apartment with Eiffel Tower views, located in the heart of Paris.",
    image: {
      url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=60",
      filename: "paris"
    },
    price: 2700,
    location: "Paris",
    country: "France",
    geometry: {
      type: "Point",
      coordinates: [2.3522, 48.8566]
    }
  },
  {
    title: "Iceland Glass Igloo",
    description: "Watch the Northern Lights from the comfort of your bed in this unique glass igloo stay.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "igloo"
    },
    price: 3000,
    location: "Reykjavik",
    country: "Iceland",
    geometry: {
      type: "Point",
      coordinates: [-21.9426, 64.1466]
    }
  },
  {
    title: "Tokyo Capsule Stay",
    description: "A compact yet modern capsule experience in central Tokyo for tech lovers.",
    image: {
      url: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=60",
      filename: "capsule"
    },
    price: 700,
    location: "Tokyo",
    country: "Japan",
    geometry: {
      type: "Point",
      coordinates: [139.6917, 35.6895]
    }
  },
  {
    title: "Safari Tent Lodge",
    description: "Experience wild Africa from a luxury tented camp with guided safari tours.",
    image: {
      url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=60",
      filename: "safari"
    },
    price: 2500,
    location: "Serengeti",
    country: "Tanzania",
    geometry: {
      type: "Point",
      coordinates: [34.8333, -2.3333]
    }
  },
  {
    title: "Venice Canal View Apartment",
    description: "Wake up to the sound of gondolas in this beautiful canal-side apartment.",
    image: {
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
      filename: "venice"
    },
    price: 2200,
    location: "Venice",
    country: "Italy",
    geometry: {
      type: "Point",
      coordinates: [12.3155, 45.4408]
    }
  },
  {
    title: "Swiss Alps Chalet",
    description: "A cozy ski chalet nestled in the snow-covered Swiss Alps with a fireplace and hot tub.",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      filename: "chalet"
    },
    price: 4000,
    location: "Zermatt",
    country: "Switzerland",
    geometry: {
      type: "Point",
      coordinates: [7.7491, 46.0207]
    }
  },
  {
    title: "Greek Cliffside Villa",
    description: "An iconic whitewashed villa overlooking the sea with stunning sunset views.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "cliffside"
    },
    price: 3500,
    location: "Santorini",
    country: "Greece",
    geometry: {
      type: "Point",
      coordinates: [25.4615, 36.3932]
    }
  },
  {
    title: "Australian Beach House",
    description: "A sunny and airy house just steps from the golden beaches of Sydney.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "beachhouse"
    },
    price: 2700,
    location: "Sydney",
    country: "Australia",
    geometry: {
      type: "Point",
      coordinates: [151.2093, -33.8688]
    }
  },
  {
    title: "Amsterdam Canal Loft",
    description: "Stay in a renovated warehouse loft with classic Dutch architecture.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "amsterdam"
    },
    price: 2000,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676]
    }
  },
  {
    title: "Istanbul Rooftop Suite",
    description: "Experience the skyline of Istanbul from a luxurious rooftop suite with modern design.",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      filename: "rooftop"
    },
    price: 2300,
    location: "Istanbul",
    country: "Turkey",
    geometry: {
      type: "Point",
      coordinates: [28.9784, 41.0082]
    }
  },
  {
    title: "Machu Picchu Base Camp",
    description: "Rest in comfort after a long trek with stunning mountain views.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      filename: "basecamp"
    },
    price: 1200,
    location: "Cusco",
    country: "Peru",
    geometry: {
      type: "Point",
      coordinates: [-71.9675, -13.5319]
    }
  },
  {
    title: "Dubai Desert Camp",
    description: "A blend of traditional Arabian style and modern luxury in the desert dunes.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      filename: "desertcamp"
    },
    price: 2800,
    location: "Dubai",
    country: "UAE",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048]
    }
  },
  {
    title: "Seoul Sky Apartment",
    description: "A futuristic apartment overlooking the vibrant skyline of Seoul.",
    image: {
      url: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=60",
      filename: "seoul"
    },
    price: 2400,
    location: "Seoul",
    country: "South Korea",
    geometry: {
      type: "Point",
      coordinates: [126.9780, 37.5665]
    }
  },
  {
    title: "Barcelona City Studio",
    description: "A compact yet stylish studio close to La Rambla and local tapas bars.",
    image: {
      url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=60",
      filename: "barcelona"
    },
    price: 1600,
    location: "Barcelona",
    country: "Spain",
    geometry: {
      type: "Point",
      coordinates: [2.1734, 41.3851]
    }
  },
  {
    title: "Cape Town Ocean Villa",
    description: "Breathtaking views of Table Mountain and the ocean from this luxury villa.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "capetown"
    },
    price: 3100,
    location: "Cape Town",
    country: "South Africa",
    geometry: {
      type: "Point",
      coordinates: [18.4241, -33.9249]
    }
  },
  {
    title: "Himalayan Eco Lodge",
    description: "Sustainable stay in the lap of the Himalayas with organic food and mountain treks.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "himalayan"
    },
    price: 950,
    location: "Manali",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2396]
    }
  },
  {
    title: "Rio Beach Apartment",
    description: "A lively beachfront apartment with views of Copacabana and Christ the Redeemer.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      filename: "rio"
    },
    price: 1900,
    location: "Rio de Janeiro",
    country: "Brazil",
    geometry: {
      type: "Point",
      coordinates: [-43.1729, -22.9068]
    }
  },
  {
    title: "Norwegian Fjord Cabin",
    description: "A peaceful cabin by the fjord, perfect for kayaking and watching the northern lights.",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      filename: "fjord"
    },
    price: 2200,
    location: "Bergen",
    country: "Norway",
    geometry: {
      type: "Point",
      coordinates: [5.3221, 60.3913]
    }
  }
];

module.exports = { data: sampleListings };