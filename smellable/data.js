// Basic seed list (replace images with your own)
const smells = [

  { id: "smell_001", name: "Freshly cut grass", image: "img/1.jpg", category: "nature" },
  { id: "smell_002", name: "Coffee in the morning", image: "img/2.jpg", category: "food" },
  { id: "smell_003", name: "New book pages", image: "img/3.jpg", category: "cozy" },
  { id: "smell_004", name: "Sea breeze", image: "img/4.jpg", category: "nature" },
  { id: "smell_005", name: "Rain on warm asphalt", image: "img/5.jpg", category: "nature" },
    // --- START: Smellable Batch 01 (50 items) ---
  { id: "smell_006", name: "Play-Doh tub just opened", image: "img/playdoh.jpg", category: "nostalgia" },
  { id: "smell_007", name: "New car interior (first day)", image: "img/new-car.jpg", category: "nostalgia" },
  { id: "smell_008", name: "Opening a fresh bag of chips", image: "img/chips.jpg", category: "food" },
  { id: "smell_009", name: "Warm cinnamon roll from the oven", image: "img/cinnamon-roll.jpg", category: "food" },
  { id: "smell_010", name: "Toasted bread + melting butter", image: "img/toast-butter.jpg", category: "food" },

  { id: "smell_011", name: "Freshly peeled orange", image: "img/orange-peel.jpg", category: "food" },
  { id: "smell_012", name: "Popcorn at the cinema lobby", image: "img/popcorn.jpg", category: "food" },
  { id: "smell_013", name: "Chocolate bar unwrapped", image: "img/chocolate.jpg", category: "food" },
  { id: "smell_014", name: "Espresso shot pulling", image: "img/espresso.jpg", category: "food" },
  { id: "smell_015", name: "Tea steam on a rainy day", image: "img/tea-steam.jpg", category: "cozy" },

  { id: "smell_016", name: "A new candle lit for the first time", image: "img/candle-first-light.jpg", category: "cozy" },
  { id: "smell_017", name: "Fresh laundry out of the dryer", image: "img/fresh-laundry.jpg", category: "cozy" },
  { id: "smell_018", name: "Clean hotel sheets at check-in", image: "img/hotel-sheets.jpg", category: "cozy" },
  { id: "smell_019", name: "Shampoo in a hot shower", image: "img/shampoo-shower.jpg", category: "cozy" },
  { id: "smell_020", name: "Bookstore air (paper + quiet)", image: "img/bookstore.jpg", category: "cozy" },

  { id: "smell_021", name: "Cracking a cold soda can", image: "img/soda-can.jpg", category: "food" },
  { id: "smell_022", name: "Mint gum first chew", image: "img/mint-gum.jpg", category: "fresh" },
  { id: "smell_023", name: "Eucalyptus in a sauna", image: "img/sauna-eucalyptus.jpg", category: "fresh" },
  { id: "smell_024", name: "Aftershave splash (barber vibe)", image: "img/aftershave.jpg", category: "fresh" },
  { id: "smell_025", name: "Sunscreen at the beach", image: "img/sunscreen.jpg", category: "summer" },

  { id: "smell_026", name: "Pool chlorine in summer heat", image: "img/pool-chlorine.jpg", category: "summer" },
  { id: "smell_027", name: "BBQ smoke drifting over the yard", image: "img/bbq-smoke.jpg", category: "summer" },
  { id: "smell_028", name: "Campfire + toasted marshmallow", image: "img/campfire.jpg", category: "summer" },
  { id: "smell_029", name: "Fresh basil crushed in your hands", image: "img/basil.jpg", category: "nature" },
  { id: "smell_030", name: "Pine forest after sun warms it", image: "img/pine-forest.jpg", category: "nature" },

  { id: "smell_031", name: "Wet soil after the first spring rain", image: "img/petrichor.jpg", category: "nature" },
  { id: "smell_032", name: "Cutting fresh cucumber", image: "img/cucumber.jpg", category: "fresh" },
  { id: "smell_033", name: "Lemon zest on a cutting board", image: "img/lemon-zest.jpg", category: "fresh" },
  { id: "smell_034", name: "Freshly mowed lawn at sunset", image: "img/mowed-lawn-sunset.jpg", category: "nature" },
  { id: "smell_035", name: "Flowers at a market stall", image: "img/flower-market.jpg", category: "nature" },

  { id: "smell_036", name: "Gas station coffee at 6 AM", image: "img/gas-station-coffee.jpg", category: "nostalgia" },
  { id: "smell_037", name: "Pencil shavings in a classroom", image: "img/pencil-shavings.jpg", category: "nostalgia" },
  { id: "smell_038", name: "Fresh marker on poster paper", image: "img/marker.jpg", category: "nostalgia" },
  { id: "smell_039", name: "New sneakers out of the box", image: "img/new-sneakers.jpg", category: "nostalgia" },
  { id: "smell_040", name: "Old vinyl record sleeve", image: "img/vinyl-sleeve.jpg", category: "nostalgia" },

  { id: "smell_041", name: "Fresh paint in a new room", image: "img/fresh-paint.jpg", category: "nostalgia" },
  { id: "smell_042", name: "Wood workshop (sawdust)", image: "img/sawdust.jpg", category: "nostalgia" },
  { id: "smell_043", name: "Leather jacket in a closet", image: "img/leather.jpg", category: "nostalgia" },
  { id: "smell_044", name: "Christmas tree brought inside", image: "img/christmas-tree.jpg", category: "seasonal" },
  { id: "smell_045", name: "Gingerbread spices in December", image: "img/gingerbread.jpg", category: "seasonal" },

  { id: "smell_046", name: "Hot chocolate + marshmallows", image: "img/hot-chocolate.jpg", category: "seasonal" },
  { id: "smell_047", name: "Pumpkin spice in a café", image: "img/pumpkin-spice.jpg", category: "seasonal" },
  { id: "smell_048", name: "Fresh rain on hot pavement (city)", image: "img/rain-pavement-city.jpg", category: "nature" },
  { id: "smell_049", name: "Sea air + sunscreen combo", image: "img/sea-sunscreen.jpg", category: "summer" },
  { id: "smell_050", name: "A bouquet unwrapped at home", image: "img/bouquet.jpg", category: "nature" },

  { id: "smell_051", name: "Bread from a bakery door", image: "img/bakery-bread.jpg", category: "food" },
  { id: "smell_052", name: "Street waffle stand", image: "img/waffle-stand.jpg", category: "food" },
  { id: "smell_053", name: "Hot fries in a paper bag", image: "img/fries.jpg", category: "food" },
  { id: "smell_054", name: "Fresh pizza box opened", image: "img/pizza-box.jpg", category: "food" },
  { id: "smell_055", name: "Strawberry jam on warm toast", image: "img/jam-toast.jpg", category: "food" }
  // --- END: Smellable Batch 01 ---

];

