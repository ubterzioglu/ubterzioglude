// Germany Cities Data
// Add your city data here following this structure

const citiesData = [
    {
        id: "berlin",
        name: "Berlin",
        region: "Berlin",
        population: "3.7 million",
        image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
        shortDescription: "Germany's vibrant capital, a hub of art, culture, and history with iconic landmarks like the Brandenburg Gate.",
        bestTime: "May to September",
        
        history: "Berlin has a rich and complex history spanning over 800 years. Founded in the 13th century, it became the capital of Prussia and later the German Empire. The city played a central role in World War II and was subsequently divided by the Berlin Wall from 1961 to 1989, symbolizing the Cold War's division of East and West. After reunification in 1990, Berlin emerged as a dynamic, multicultural metropolis and has become one of Europe's most important political, cultural, and technological centers.",
        
        climate: "Berlin has a temperate seasonal climate with warm summers and cold winters. Summer temperatures average 20-25°C (68-77°F), while winter temperatures can drop to -2 to 3°C (28-37°F). The best time to visit is from May to September when the weather is pleasant and outdoor activities are abundant. Spring brings beautiful blooming parks, while autumn offers colorful foliage and cultural events.",
        
        transportation: "Berlin has an excellent public transportation system including U-Bahn (underground), S-Bahn (suburban trains), trams, and buses. The integrated network makes it easy to travel throughout the city with a single ticket. Berlin Brandenburg Airport (BER) connects the city to international destinations. The city is also very bike-friendly with dedicated cycling lanes. A day pass for public transport costs around €8-9, making it affordable to explore the entire city.",
        
        attractions: [
            {
                name: "Brandenburg Gate",
                description: "The iconic 18th-century neoclassical monument that once divided East and West Berlin, now a symbol of German reunification.",
                image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600"
            },
            {
                name: "Berlin Wall Memorial",
                description: "Historic site preserving the memory of the division of Berlin, featuring remnants of the wall and an open-air exhibition.",
                image: "https://images.unsplash.com/photo-1584981557441-86b0c6c0e871?w=600"
            },
            {
                name: "Museum Island",
                description: "UNESCO World Heritage site housing five world-renowned museums including the Pergamon Museum and Neues Museum.",
                image: "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=600"
            },
            {
                name: "Reichstag Building",
                description: "The historic parliament building with its stunning glass dome offering panoramic views of the city.",
                image: "https://images.unsplash.com/photo-1587330979470-3595ac045ab7?w=600"
            }
        ],
        
        restaurants: [
            {
                name: "Restaurant Tim Raue",
                cuisine: "Asian Fusion",
                description: "Two Michelin-starred restaurant offering innovative Asian-inspired cuisine in an elegant setting.",
                priceRange: "€€€€"
            },
            {
                name: "Curry 36",
                cuisine: "Street Food",
                description: "Famous for authentic Berlin currywurst, a must-try local street food experience.",
                priceRange: "€"
            },
            {
                name: "Nobelhart & Schmutzig",
                cuisine: "Modern German",
                description: "One Michelin star restaurant focusing on locally sourced ingredients and innovative German cuisine.",
                priceRange: "€€€"
            },
            {
                name: "Mustafa's Gemüse Kebap",
                cuisine: "Turkish",
                description: "Legendary döner kebab spot with fresh vegetables and homemade sauces, worth the queue.",
                priceRange: "€"
            }
        ],
        
        hotels: [
            {
                name: "Hotel Adlon Kempinski",
                type: "Luxury Hotel",
                description: "Iconic 5-star luxury hotel next to Brandenburg Gate with world-class service and amenities.",
                priceRange: "€€€€"
            },
            {
                name: "25hours Hotel Bikini Berlin",
                type: "Design Hotel",
                description: "Trendy hotel with urban jungle theme, rooftop bar, and views of Berlin Zoo.",
                priceRange: "€€"
            },
            {
                name: "Hotel Hackescher Markt",
                type: "Boutique Hotel",
                description: "Charming boutique hotel in the heart of the vibrant Mitte district.",
                priceRange: "€€"
            },
            {
                name: "Generator Berlin Mitte",
                type: "Hostel",
                description: "Modern, stylish hostel offering both private rooms and dorms with great social atmosphere.",
                priceRange: "€"
            }
        ],
        
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1546726747-421c6d69c929?w=500",
                caption: "Berlin TV Tower at Alexanderplatz"
            },
            {
                url: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=500",
                caption: "Brandenburg Gate illuminated at night"
            },
            {
                url: "https://images.unsplash.com/photo-1587330979470-3595ac045ab7?w=500",
                caption: "Reichstag dome interior"
            },
            {
                url: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=500",
                caption: "East Side Gallery street art"
            },
            {
                url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=500",
                caption: "Oberbaum Bridge over Spree River"
            },
            {
                url: "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=500",
                caption: "Museum Island from above"
            }
        ]
    },
    {
        id: "munich",
        name: "Munich",
        region: "Bavaria",
        population: "1.5 million",
        image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800",
        shortDescription: "Bavaria's capital, famous for Oktoberfest, stunning architecture, and proximity to the Alps.",
        bestTime: "May to October",
        
        history: "Munich was founded by monks in the 12th century and grew to become the capital of Bavaria. The city flourished under the Wittelsbach dynasty, who ruled Bavaria for over 700 years. Munich played a significant role in the rise of the Nazi party in the 1920s and 1930s, and suffered extensive damage during World War II. Post-war reconstruction preserved much of the city's historic character while modernizing infrastructure. Today, Munich is known for its rich cultural heritage, economic prosperity, and high quality of life.",
        
        climate: "Munich has a continental climate with distinct seasons. Summers are warm with temperatures around 23-25°C (73-77°F), perfect for beer gardens and outdoor activities. Winters can be cold with temperatures dropping to -3 to 3°C (27-37°F), often with snow. The city experiences the Föhn wind from the Alps, which can cause sudden weather changes. Spring and autumn are mild and pleasant, making May to October ideal for visiting.",
        
        transportation: "Munich has an efficient public transportation system operated by MVG, including U-Bahn (subway), S-Bahn (suburban trains), trams, and buses. The city is compact and very walkable, with most attractions within easy reach. Munich Airport (MUC) is connected to the city center by S-Bahn in about 40 minutes. The city is also extremely bike-friendly with extensive cycling paths. A day pass costs around €7-13 depending on zones covered.",
        
        attractions: [
            {
                name: "Marienplatz",
                description: "Central square featuring the New Town Hall with its famous Glockenspiel that performs daily.",
                image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600"
            },
            {
                name: "Englischer Garten",
                description: "One of the world's largest urban parks, featuring beer gardens, streams, and the famous Eisbach wave for surfing.",
                image: "https://images.unsplash.com/photo-1603321544554-b37b46f9e001?w=600"
            },
            {
                name: "Nymphenburg Palace",
                description: "Baroque palace with magnificent gardens, former summer residence of Bavarian monarchs.",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"
            },
            {
                name: "BMW Museum",
                description: "State-of-the-art museum showcasing BMW's automotive history and innovation.",
                image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600"
            }
        ],
        
        restaurants: [
            {
                name: "Tantris",
                cuisine: "Fine Dining",
                description: "Two Michelin-starred restaurant offering exceptional modern European cuisine.",
                priceRange: "€€€€"
            },
            {
                name: "Hofbräuhaus",
                cuisine: "Traditional Bavarian",
                description: "World-famous beer hall serving traditional Bavarian dishes and beer since 1589.",
                priceRange: "€€"
            },
            {
                name: "Augustiner Bräustuben",
                cuisine: "Bavarian",
                description: "Authentic beer hall with excellent traditional food and Munich's oldest brewery beer.",
                priceRange: "€€"
            },
            {
                name: "Viktualienmarkt",
                cuisine: "Market Food",
                description: "Famous outdoor market with food stalls offering everything from sausages to international cuisine.",
                priceRange: "€"
            }
        ],
        
        hotels: [
            {
                name: "Bayerischer Hof",
                type: "Luxury Hotel",
                description: "Historic 5-star hotel in the heart of Munich with rooftop pool and Michelin-starred dining.",
                priceRange: "€€€€"
            },
            {
                name: "Hotel Vier Jahreszeiten Kempinski",
                type: "Luxury Hotel",
                description: "Elegant luxury hotel on Maximilianstrasse, Munich's most prestigious shopping street.",
                priceRange: "€€€€"
            },
            {
                name: "Hotel Metropol",
                type: "Boutique Hotel",
                description: "Modern boutique hotel near the central station with comfortable rooms and good breakfast.",
                priceRange: "€€"
            },
            {
                name: "Wombat's City Hostel",
                type: "Hostel",
                description: "Clean, modern hostel in a great location with friendly atmosphere and social events.",
                priceRange: "€"
            }
        ],
        
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=500",
                caption: "New Town Hall at Marienplatz"
            },
            {
                url: "https://images.unsplash.com/photo-1603321544554-b37b46f9e001?w=500",
                caption: "Englischer Garten in autumn"
            },
            {
                url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
                caption: "Nymphenburg Palace"
            },
            {
                url: "https://images.unsplash.com/photo-1590415892959-de9cb3b7e7f3?w=500",
                caption: "Oktoberfest celebrations"
            },
            {
                url: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=500",
                caption: "BMW Headquarters"
            },
            {
                url: "https://images.unsplash.com/photo-1577894947058-41c264ecf377?w=500",
                caption: "Frauenkirche church towers"
            }
        ]
    },
    {
        id: "hamburg",
        name: "Hamburg",
        region: "Hamburg",
        population: "1.9 million",
        image: "https://images.unsplash.com/photo-1558461220-878a7a92db7e?w=800",
        shortDescription: "Germany's maritime gateway, featuring stunning harbor views, modern architecture, and vibrant nightlife.",
        bestTime: "May to September",
        
        history: "Hamburg's history dates back to the 9th century when Charlemagne ordered the construction of a castle on the site. It became a major port city and a founding member of the Hanseatic League in the medieval period. The city's maritime trade brought great wealth and cultural diversity. Hamburg was heavily bombed during World War II, destroying much of the historic center. Post-war reconstruction transformed Hamburg into a modern metropolis while maintaining its maritime heritage and free spirit as a city-state.",
        
        climate: "Hamburg has a temperate oceanic climate influenced by the North Sea. Summers are mild with temperatures around 20-22°C (68-72°F), while winters are relatively mild but often rainy with temperatures of 0-5°C (32-41°F). Rain is frequent throughout the year, so bring an umbrella. The best weather is typically from May to September, though Hamburg's maritime charm is appealing year-round. The city rarely experiences extreme temperatures.",
        
        transportation: "Hamburg has an extensive public transportation network including U-Bahn, S-Bahn, buses, and ferries. The harbor ferries are part of the public transport system and offer scenic routes across the Elbe River. Hamburg Airport (HAM) is well-connected to the city center by S-Bahn. The city is very bike-friendly with dedicated lanes. A HamburgCARD offers unlimited public transport and discounts at attractions. Walking along the harbor and through neighborhoods is also a great way to explore.",
        
        attractions: [
            {
                name: "Miniatur Wunderland",
                description: "World's largest model railway exhibition, featuring incredibly detailed miniature worlds.",
                image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600"
            },
            {
                name: "Elbphilharmonie",
                description: "Stunning concert hall with wave-like glass architecture and a public viewing platform.",
                image: "https://images.unsplash.com/photo-1558461220-878a7a92db7e?w=600"
            },
            {
                name: "Speicherstadt",
                description: "UNESCO World Heritage warehouse district with red-brick buildings and canals.",
                image: "https://images.unsplash.com/photo-1564669781-03f8cfc72277?w=600"
            },
            {
                name: "St. Pauli and Reeperbahn",
                description: "Famous entertainment district known for nightlife, music venues, and the Beatles' history.",
                image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600"
            }
        ],
        
        restaurants: [
            {
                name: "The Table Kevin Fehling",
                cuisine: "Fine Dining",
                description: "Three Michelin-starred restaurant offering innovative haute cuisine in HafenCity.",
                priceRange: "€€€€"
            },
            {
                name: "Fischereihafen Restaurant",
                cuisine: "Seafood",
                description: "Traditional fish restaurant serving fresh catches from the North Sea and Baltic.",
                priceRange: "€€€"
            },
            {
                name: "Bullerei",
                cuisine: "Modern German",
                description: "Trendy restaurant by celebrity chef Tim Mälzer in a former slaughterhouse.",
                priceRange: "€€"
            },
            {
                name: "Brücke 10",
                cuisine: "Seafood",
                description: "Popular fish sandwich stand at the harbor, perfect for a quick authentic meal.",
                priceRange: "€"
            }
        ],
        
        hotels: [
            {
                name: "The Fontenay",
                type: "Luxury Hotel",
                description: "Ultra-modern 5-star hotel overlooking Alster Lake with rooftop spa and Michelin dining.",
                priceRange: "€€€€"
            },
            {
                name: "Hotel Atlantic Kempinski",
                type: "Luxury Hotel",
                description: "Historic grand hotel on the Alster with elegant rooms and traditional service.",
                priceRange: "€€€€"
            },
            {
                name: "25hours Hotel HafenCity",
                type: "Design Hotel",
                description: "Stylish nautical-themed hotel in the modern HafenCity district.",
                priceRange: "€€"
            },
            {
                name: "Superbude St. Pauli",
                type: "Budget Hotel",
                description: "Hip budget hotel with creative design in the heart of St. Pauli.",
                priceRange: "€"
            }
        ],
        
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1558461220-878a7a92db7e?w=500",
                caption: "Elbphilharmonie at sunset"
            },
            {
                url: "https://images.unsplash.com/photo-1564669781-03f8cfc72277?w=500",
                caption: "Speicherstadt warehouse district"
            },
            {
                url: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=500",
                caption: "Hamburg Harbor view"
            },
            {
                url: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500",
                caption: "St. Pauli district at night"
            },
            {
                url: "https://images.unsplash.com/photo-1595139120010-5b1b8aecfe40?w=500",
                caption: "Alster Lake with sailing boats"
            },
            {
                url: "https://images.unsplash.com/photo-1565530953881-316ca66c553e?w=500",
                caption: "Historic Rathaus building"
            }
        ]
    },
    {
        id: "cologne",
        name: "Cologne",
        region: "North Rhine-Westphalia",
        population: "1.1 million",
        image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800",
        shortDescription: "Ancient Roman city famous for its towering Gothic cathedral, vibrant carnival, and renowned cologne perfume.",
        bestTime: "April to October",
        
        history: "Cologne is one of Germany's oldest cities, founded by the Romans in 50 AD as Colonia Claudia Ara Agrippinensium. It became a major medieval trading center and religious hub. The city's iconic cathedral took over 600 years to complete and survived World War II bombing virtually intact while the surrounding city was destroyed. Cologne has always been known for its liberal and tolerant atmosphere. Today, it's a major cultural and economic center on the Rhine River, blending 2,000 years of history with modern urban life.",
        
        climate: "Cologne has a temperate oceanic climate with mild winters and warm summers. Summer temperatures average 23-25°C (73-77°F), perfect for enjoying beer gardens along the Rhine. Winters are relatively mild at 2-6°C (36-43°F), though the famous Cologne Carnival in February brings festive cheer regardless of weather. The city experiences moderate rainfall throughout the year. The best time to visit is from April to October when outdoor activities and river cruises are most enjoyable.",
        
        transportation: "Cologne has an efficient public transportation system with U-Bahn, S-Bahn, trams, and buses operated by KVB. The compact city center is easily walkable, with most major attractions within 15-20 minutes of each other. Cologne Bonn Airport (CGN) is connected to the city by S-Bahn in about 15 minutes. The city is also a major railway hub with excellent connections throughout Europe. Cycling is popular along the Rhine promenade. Day passes cost around €9 and are valid throughout the city network.",
        
        attractions: [
            {
                name: "Cologne Cathedral",
                description: "UNESCO World Heritage Gothic masterpiece and Germany's most visited landmark with twin spires reaching 157 meters.",
                image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600"
            },
            {
                name: "Rhine River Promenade",
                description: "Scenic walkway along the Rhine with cafes, beer gardens, and beautiful views of the old town.",
                image: "https://images.unsplash.com/photo-1559564484-e48bf1cf8a9e?w=600"
            },
            {
                name: "Museum Ludwig",
                description: "World-class modern art museum featuring works by Picasso, Warhol, and contemporary artists.",
                image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600"
            },
            {
                name: "Old Town & Chocolate Museum",
                description: "Historic district with colorful buildings and interactive museum showcasing chocolate-making history.",
                image: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2d?w=600"
            }
        ],
        
        restaurants: [
            {
                name: "Ox & Klee",
                cuisine: "Fine Dining",
                description: "Two Michelin-starred restaurant offering creative seasonal cuisine with regional ingredients.",
                priceRange: "€€€€"
            },
            {
                name: "Früh am Dom",
                cuisine: "Traditional German",
                description: "Historic brewery serving authentic Cologne cuisine and fresh Kölsch beer since 1904.",
                priceRange: "€€"
            },
            {
                name: "Gaffel am Dom",
                cuisine: "German Brewery",
                description: "Traditional beer hall near the cathedral with hearty regional dishes and Kölsch beer.",
                priceRange: "€€"
            },
            {
                name: "Feynsinn",
                cuisine: "Modern German",
                description: "Contemporary restaurant offering innovative takes on traditional Rhineland cuisine.",
                priceRange: "€€€"
            }
        ],
        
        hotels: [
            {
                name: "Excelsior Hotel Ernst",
                type: "Luxury Hotel",
                description: "Historic 5-star hotel directly opposite the cathedral with elegant rooms and fine dining.",
                priceRange: "€€€€"
            },
            {
                name: "Hyatt Regency Köln",
                type: "Luxury Hotel",
                description: "Modern hotel on the Rhine with stunning river views and rooftop bar.",
                priceRange: "€€€"
            },
            {
                name: "Lint Hotel",
                type: "Design Hotel",
                description: "Boutique hotel in the Belgian Quarter with stylish rooms and excellent breakfast.",
                priceRange: "€€"
            },
            {
                name: "Station Hostel",
                type: "Hostel",
                description: "Clean, friendly hostel near the main station with private rooms and dorms.",
                priceRange: "€"
            }
        ],
        
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=500",
                caption: "Cologne Cathedral and Hohenzollern Bridge"
            },
            {
                url: "https://images.unsplash.com/photo-1559564484-e48bf1cf8a9e?w=500",
                caption: "Rhine promenade at sunset"
            },
            {
                url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500",
                caption: "Museum Ludwig modern art"
            },
            {
                url: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2d?w=500",
                caption: "Old Town colorful houses"
            },
            {
                url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500",
                caption: "Cologne Cathedral interior"
            },
            {
                url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=500",
                caption: "Chocolate Museum exterior"
            }
        ]
    },
    {
        id: "frankfurt",
        name: "Frankfurt",
        region: "Hesse",
        population: "770,000",
        image: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=800",
        shortDescription: "Germany's financial capital with stunning skyscrapers, medieval Römerberg square, and world-class museums.",
        bestTime: "April to October",
        
        history: "Frankfurt am Main has been an important city since Roman times. It was the site where Holy Roman Emperors were elected and crowned from the 16th century. The city was a major center of trade and finance in medieval times, a tradition that continues today. Frankfurt was heavily damaged in World War II, with its old town almost completely destroyed. Post-war reconstruction created a unique blend of modern skyscrapers and reconstructed historic buildings. Today, Frankfurt is the financial heart of Germany and home to the European Central Bank.",
        
        climate: "Frankfurt has a temperate oceanic climate with four distinct seasons. Summers are warm with temperatures averaging 24-26°C (75-79°F), ideal for exploring outdoor areas and museums. Winters are cold with temperatures around 1-5°C (34-41°F). Rain is distributed throughout the year. Spring and autumn are particularly pleasant with mild temperatures. The best visiting period is April to October when outdoor festivals and events are common. The city's location in the Rhine-Main region provides protection from extreme weather.",
        
        transportation: "Frankfurt has excellent public transportation with U-Bahn, S-Bahn, trams, and buses operated by RMV. Frankfurt Airport (FRA) is one of Europe's largest hubs and is connected to the city center by S-Bahn in 11 minutes. The city is also a major railway hub with high-speed connections throughout Europe. The compact center is walkable, and the city offers bike-sharing schemes. A Frankfurt Card provides unlimited transport and discounts to attractions. The public transport system is efficient and runs frequently, even late at night.",
        
        attractions: [
            {
                name: "Römerberg",
                description: "Historic medieval square with reconstructed half-timbered houses and the iconic Römer city hall.",
                image: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=600"
            },
            {
                name: "Main Tower",
                description: "200-meter skyscraper with an observation deck offering panoramic views of the city and skyline.",
                image: "https://images.unsplash.com/photo-1559564484-e48bf1cf8a9e?w=600"
            },
            {
                name: "Museumsufer",
                description: "Museum embankment featuring 13 museums along the Main River, covering art, culture, and history.",
                image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600"
            },
            {
                name: "Palmengarten",
                description: "Botanical garden with greenhouses featuring tropical and subtropical plants from around the world.",
                image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600"
            }
        ],
        
        restaurants: [
            {
                name: "Restaurant Français",
                cuisine: "Fine Dining",
                description: "Two Michelin-starred restaurant in the Steigenberger Hotel offering French haute cuisine.",
                priceRange: "€€€€"
            },
            {
                name: "Adolf Wagner",
                cuisine: "Traditional German",
                description: "Historic tavern serving traditional Frankfurt specialties like Grüne Soße and apple wine.",
                priceRange: "€€"
            },
            {
                name: "Apfelwein Wagner",
                cuisine: "Apple Wine Tavern",
                description: "Traditional apple wine tavern in Sachsenhausen district with authentic local cuisine.",
                priceRange: "€€"
            },
            {
                name: "Kleinmarkthalle",
                cuisine: "Market Food",
                description: "Indoor market with food stalls offering fresh produce, snacks, and international cuisine.",
                priceRange: "€"
            }
        ],
        
        hotels: [
            {
                name: "Jumeirah Frankfurt",
                type: "Luxury Hotel",
                description: "Ultra-modern 5-star hotel with skyline views, rooftop bar, and Michelin-starred dining.",
                priceRange: "€€€€"
            },
            {
                name: "Sofitel Frankfurt Opera",
                type: "Luxury Hotel",
                description: "Elegant hotel near the opera house with French flair and excellent service.",
                priceRange: "€€€"
            },
            {
                name: "Hotel Schopenhauer Hof",
                type: "Boutique Hotel",
                description: "Charming family-run hotel in a quiet residential area near the center.",
                priceRange: "€€"
            },
            {
                name: "Five Elements Hostel",
                type: "Hostel",
                description: "Modern hostel in Sachsenhausen with clean facilities and friendly atmosphere.",
                priceRange: "€"
            }
        ],
        
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=500",
                caption: "Frankfurt skyline at dusk"
            },
            {
                url: "https://images.unsplash.com/photo-1559564484-e48bf1cf8a9e?w=500",
                caption: "Römerberg historic square"
            },
            {
                url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500",
                caption: "Modern architecture in banking district"
            },
            {
                url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500",
                caption: "Palmengarten botanical gardens"
            },
            {
                url: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=500",
                caption: "Eiserner Steg pedestrian bridge"
            },
            {
                url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500",
                caption: "Main Tower observation deck"
            }
        ]
    }
];