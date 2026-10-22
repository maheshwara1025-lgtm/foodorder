// src/data/restaurants.js
export const INITIAL_RESTAURANTS = [
  {
    id: 101,
    name: 'L’Étoile Bistro',
    tagline: 'Artisanal French Bistro & Wine Cellar',
    cuisine: 'French',
    location: 'Downtown',
    address: '142 Grand Avenue, Suite 100, Downtown',
    rating: 4.9,
    reviewsCount: 382,
    priceRange: '$$$$',
    openingHours: '12:00 PM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse yourself in authentic Parisian culinary artistry. From herb-crusted rack of lamb to delicate soufflés, paired with an exclusive collection of cellar vintages.',
    features: ['Valet Parking', 'Sommelier on site', 'Outdoor Patio', 'Private Dining'],
    availableTimeSlots: [
      '12:30 PM', '01:00 PM', '01:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
    ],
    tables: [
      { id: 'T-101', name: 'Table 1 (Window Alcove)', capacity: 2, type: 'Romantic', status: 'available', location: 'Window' },
      { id: 'T-102', name: 'Table 2 (Garden Terrace)', capacity: 4, type: 'Patio', status: 'available', location: 'Outdoor' },
      { id: 'T-103', name: 'Table 3 (Chef View Booth)', capacity: 4, type: 'Booth', status: 'available', location: 'Main Dining' },
      { id: 'T-104', name: 'Table 4 (Executive Round)', capacity: 6, type: 'Round', status: 'available', location: 'Center' },
      { id: 'T-105', name: 'Table 5 (Cellar VIP Room)', capacity: 8, type: 'Private Room', status: 'available', location: 'VIP Hall' },
      { id: 'T-106', name: 'Table 6 (Bistro High Top)', capacity: 2, type: 'High Top', status: 'available', location: 'Bar Lounge' }
    ]
  },
  {
    id: 102,
    name: 'Sakura Omakase & Bar',
    tagline: 'High-Art Contemporary Japanese Dining',
    cuisine: 'Japanese',
    location: 'Midtown',
    address: '77 Lexington Boulevard, Midtown',
    rating: 4.8,
    reviewsCount: 512,
    priceRange: '$$$$',
    openingHours: '05:00 PM - 11:30 PM',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience refined edomae sushi and modern Japanese gastronomy prepared with fish flown in daily from Tokyo’s Toyosu market.',
    features: ['Omakase Counter', 'Sake Pairing', 'Private Tatami Rooms', 'Michelin Guide Listed'],
    availableTimeSlots: [
      '05:30 PM', '06:00 PM', '06:30 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:30 PM'
    ],
    tables: [
      { id: 'S-201', name: 'Omakase Bar Seat A', capacity: 2, type: 'Chef Counter', status: 'available', location: 'Main Counter' },
      { id: 'S-202', name: 'Omakase Bar Seat B', capacity: 2, type: 'Chef Counter', status: 'available', location: 'Main Counter' },
      { id: 'S-203', name: 'Sakura Tatami Suite', capacity: 4, type: 'Tatami Room', status: 'available', location: 'Private Wing' },
      { id: 'S-204', name: 'Zen Garden Table', capacity: 4, type: 'Terrace', status: 'available', location: 'Garden Courtyard' },
      { id: 'S-205', name: 'Imperial Banquet Table', capacity: 8, type: 'Private Room', status: 'available', location: 'Imperial Salon' }
    ]
  },
  {
    id: 103,
    name: 'Villa Bellini Ristorante',
    tagline: 'Authentic Tuscan Woodfired & Handcrafted Pasta',
    cuisine: 'Italian',
    location: 'West End',
    address: '210 Cypress Hill, West End',
    rating: 4.9,
    reviewsCount: 640,
    priceRange: '$$$',
    openingHours: '11:30 AM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Rustic Italian warmth meets contemporary gourmet flair. House-made truffled pasta, dry-aged steaks, and hearth-fired artisanal focaccia.',
    features: ['Woodfired Oven', 'Scenic Courtyard', 'Extensive Chianti Reserve', 'Live Jazz Weekends'],
    availableTimeSlots: [
      '12:00 PM', '12:30 PM', '01:30 PM', '06:00 PM', '07:00 PM', '07:30 PM', '08:30 PM', '09:00 PM'
    ],
    tables: [
      { id: 'V-301', name: 'Olive Arbor Table', capacity: 2, type: 'Courtyard', status: 'available', location: 'Pergola' },
      { id: 'V-302', name: 'Tuscan Hearth Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Fireplace Room' },
      { id: 'V-303', name: 'Family Veranda 1', capacity: 6, type: 'Veranda', status: 'available', location: 'Veranda' },
      { id: 'V-304', name: 'Family Veranda 2', capacity: 6, type: 'Veranda', status: 'available', location: 'Veranda' },
      { id: 'V-305', name: 'Vintner’s Reserve Suite', capacity: 10, type: 'Private Room', status: 'available', location: 'Wine Cellar' }
    ]
  },
  {
    id: 104,
    name: 'Saffron & Spice Pavilion',
    tagline: 'Modern Royal Indian Cuisine & Tandoor Bar',
    cuisine: 'Indian',
    location: 'Uptown',
    address: '504 Royalty Way, Uptown',
    rating: 4.7,
    reviewsCount: 420,
    priceRange: '$$$',
    openingHours: '12:00 PM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'Regal Awadhi and Mughlai culinary traditions reimagined with modern presentation, rare aromatic spices, and slow-cooked tandoori delicacies.',
    features: ['Copper Tandoor Display', 'Craft Cocktail Bar', 'Spacious Seating', 'Live Sitar Music'],
    availableTimeSlots: [
      '12:30 PM', '01:00 PM', '02:00 PM', '06:30 PM', '07:00 PM', '08:00 PM', '08:30 PM', '09:15 PM'
    ],
    tables: [
      { id: 'SP-401', name: 'Peacock Alcove', capacity: 2, type: 'Intimate Booth', status: 'available', location: 'East Hall' },
      { id: 'SP-402', name: 'Royal Canopy Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Royal Lounge' },
      { id: 'SP-403', name: 'Grand Darbar Table', capacity: 6, type: 'Large Round', status: 'available', location: 'Main Pavilion' },
      { id: 'SP-404', name: 'Maharaja Suite', capacity: 12, type: 'Private Salon', status: 'available', location: 'Private Wing' }
    ]
  },
  {
    id: 105,
    name: 'The Golden Catch Seafood Co.',
    tagline: 'Oceanfront Wild Seafood & Raw Bar',
    cuisine: 'Seafood',
    location: 'Harbor Pier',
    address: '9 Harbor Lighthouse Pier, Harbor Pier',
    rating: 4.8,
    reviewsCount: 580,
    priceRange: '$$$$',
    openingHours: '01:00 PM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct dock-to-table seafood featuring chilled King crab towers, wood-grilled Chilean sea bass, and crisp saline white wines with panoramic ocean views.',
    features: ['Ocean Sunset Views', 'Raw Oyster Bar', 'Terrace Heaters', 'Craft Coastal Cocktails'],
    availableTimeSlots: [
      '01:00 PM', '02:00 PM', '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:00 PM'
    ],
    tables: [
      { id: 'GC-501', name: 'Lighthouse Sunset Deck', capacity: 2, type: 'Deck Terrace', status: 'available', location: 'Ocean Pier' },
      { id: 'GC-502', name: 'Pier Panoramic Booth', capacity: 4, type: 'Window Booth', status: 'available', location: 'Pier Window' },
      { id: 'GC-503', name: 'Captain’s Table', capacity: 8, type: 'Large Board', status: 'available', location: 'Center Hall' }
    ]
  },
  {
    id: 106,
    name: 'Fuego Asador & Tapas',
    tagline: 'Argentine Wood Grill & Spanish Tapas',
    cuisine: 'Steakhouse',
    location: 'Downtown',
    address: '330 Commerce Street, Downtown',
    rating: 4.9,
    reviewsCount: 460,
    priceRange: '$$$$',
    openingHours: '05:00 PM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    description: 'Prime dry-aged Tomahawk steaks grilled over Argentine quebracho charcoal, complemented by exquisite Iberian tapas and bold Malbec wines.',
    features: ['Open Fire Parilla', 'Extensive Malbec Cellar', 'Late Night Tapas', 'Lounge Bar'],
    availableTimeSlots: [
      '05:30 PM', '06:30 PM', '07:00 PM', '08:00 PM', '08:30 PM', '09:30 PM'
    ],
    tables: [
      { id: 'FA-601', name: 'Parilla Hearthside 1', capacity: 2, type: 'High Booth', status: 'available', location: 'Grill Side' },
      { id: 'FA-602', name: 'Parilla Hearthside 2', capacity: 4, type: 'High Booth', status: 'available', location: 'Grill Side' },
      { id: 'FA-603', name: 'Gaucho Lounge Table', capacity: 6, type: 'Lounge Round', status: 'available', location: 'Main Room' },
      { id: 'FA-604', name: 'Bodega Private Room', capacity: 10, type: 'Private Cellar', status: 'available', location: 'Bodega' }
    ]
  },
  {
    id: 107,
    name: 'Casa Oaxaca & Mezcaleria',
    tagline: 'Authentic Ancestral Mexican Mole & Agave Spirits',
    cuisine: 'Mexican',
    location: 'Midtown',
    address: '88 Heritage Square, Midtown',
    rating: 4.8,
    reviewsCount: 395,
    priceRange: '$$$',
    openingHours: '01:00 PM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebrated regional Oaxacan cuisine with 7 house-crafted moles, artisanal heirloom corn tortillas, slow-braised barbacoa, and rare single-village mezcals.',
    features: ['Heirloom Masa Bar', 'Mezcal Tasting Flight', 'Warm Courtyard', 'Live Flamenco'],
    availableTimeSlots: [
      '01:00 PM', '01:30 PM', '06:00 PM', '07:00 PM', '08:00 PM', '08:30 PM', '09:30 PM'
    ],
    tables: [
      { id: 'CO-701', name: 'Agave Garden Patio', capacity: 2, type: 'Patio', status: 'available', location: 'Courtyard' },
      { id: 'CO-702', name: 'Hacienda Booth 1', capacity: 4, type: 'Booth', status: 'available', location: 'Main Dining' },
      { id: 'CO-703', name: 'Hacienda Booth 2', capacity: 4, type: 'Booth', status: 'available', location: 'Main Dining' },
      { id: 'CO-704', name: 'Familia Feast Table', capacity: 8, type: 'Large Round', status: 'available', location: 'Center Hall' }
    ]
  },
  {
    id: 108,
    name: 'Aura Plant Sanctuary & Bakery',
    tagline: 'Organic Garden-to-Table & Botanical Patisserie',
    cuisine: 'Vegetarian',
    location: 'West End',
    address: '410 Greenhouse Boulevard, West End',
    rating: 4.9,
    reviewsCount: 478,
    priceRange: '$$$',
    openingHours: '08:30 AM - 09:30 PM',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    description: 'A serene plant-filled glasshouse dining sanctuary. Serving vibrant farm-fresh seasonal harvests, handmade gluten-free sourdoughs, and cold-pressed botanical tonics.',
    features: ['Indoor Conservatory', '100% Organic Produce', 'Artisanal Gluten-Free Bakery', 'Pet Friendly Terrace'],
    availableTimeSlots: [
      '09:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '06:00 PM', '07:30 PM', '08:30 PM'
    ],
    tables: [
      { id: 'AU-801', name: 'Fern Canopy Table', capacity: 2, type: 'Garden Nook', status: 'available', location: 'Conservatory' },
      { id: 'AU-802', name: 'Solarium Table', capacity: 4, type: 'Window', status: 'available', location: 'Glasshouse' },
      { id: 'AU-803', name: 'Herb Garden Veranda', capacity: 6, type: 'Veranda', status: 'available', location: 'Outdoor Garden' }
    ]
  },
  {
    id: 109,
    name: 'Santorini Blue Mediterranean',
    tagline: 'Aegean Seafood, Wood-Oven Flatbreads & Olive Groves',
    cuisine: 'Mediterranean',
    location: 'Harbor Pier',
    address: '15 Coastline Esplanade, Harbor Pier',
    rating: 4.7,
    reviewsCount: 520,
    priceRange: '$$$',
    openingHours: '12:00 PM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    description: 'Whitewashed Aegean charm overlooking the harbor. Whole grilled branzino drizzled with Kalamata olive oil, charred octopus, and warm feta filo pastries.',
    features: ['Panoramic Sea Terrace', 'Woodfired Hearth', 'Greek Wine Cellar', 'Sunset Seating'],
    availableTimeSlots: [
      '12:30 PM', '01:30 PM', '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:00 PM'
    ],
    tables: [
      { id: 'SB-901', name: 'Aegean Sunset Rail', capacity: 2, type: 'Balcony', status: 'available', location: 'Sea Terrace' },
      { id: 'SB-902', name: 'Olive Pergola 1', capacity: 4, type: 'Pergola', status: 'available', location: 'Harbor Deck' },
      { id: 'SB-903', name: 'Olive Pergola 2', capacity: 4, type: 'Pergola', status: 'available', location: 'Harbor Deck' },
      { id: 'SB-904', name: 'Oia Captain’s Table', capacity: 8, type: 'Round', status: 'available', location: 'Main Villa' }
    ]
  },
  {
    id: 110,
    name: 'Lotus Blossom Dim Sum House',
    tagline: 'Handmade Cantonese Dim Sum & Vintage Pu’er Tea',
    cuisine: 'Chinese',
    location: 'Downtown',
    address: '62 Dragon Gate Arcade, Downtown',
    rating: 4.8,
    reviewsCount: 610,
    priceRange: '$$$',
    openingHours: '10:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    description: 'Master dim sum chefs rolling translucent har gow, crispy Peking duck pancakes, and piping xiao long bao, accompanied by rare Gongfu tea service.',
    features: ['Live Dim Sum Kitchen', 'Gongfu Tea Sommelier', 'Private Teahouse Rooms', 'All-Day Steaming'],
    availableTimeSlots: [
      '11:00 AM', '12:30 PM', '01:30 PM', '06:00 PM', '07:00 PM', '08:00 PM', '08:45 PM'
    ],
    tables: [
      { id: 'LB-1001', name: 'Bamboo Alcove', capacity: 2, type: 'Booth', status: 'available', location: 'Teahouse' },
      { id: 'LB-1002', name: 'Dragon Pavilion Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Main Dining' },
      { id: 'LB-1003', name: 'Lazy Susan Grand Round', capacity: 8, type: 'Round Lazy Susan', status: 'available', location: 'Grand Hall' },
      { id: 'LB-1004', name: 'Imperial Tea Salon', capacity: 10, type: 'Private Room', status: 'available', location: 'Upper Floor' }
    ]
  },
  {
    id: 111,
    name: 'Seoul Hearth Korean BBQ',
    tagline: 'Prime Hanwoo Cuts, Table Smoker & Banchan Bar',
    cuisine: 'Korean',
    location: 'Midtown',
    address: '124 K-Town Row, Midtown',
    rating: 4.9,
    reviewsCount: 560,
    priceRange: '$$$$',
    openingHours: '04:00 PM - 12:00 AM',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    description: 'Smokeless downdraft table grills cooking A5 Wagyu and dry-aged short ribs, accompanied by house-fermented banchan and artisanal makgeolli.',
    features: ['Smokeless Built-in Grills', 'Unlimited Banchan Bar', 'Private K-Dining Suites', 'Craft Soju Flights'],
    availableTimeSlots: [
      '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
    ],
    tables: [
      { id: 'SH-1101', name: 'Hearth Grill Booth A', capacity: 2, type: 'Grill Booth', status: 'available', location: 'Main Hall' },
      { id: 'SH-1102', name: 'Hearth Grill Booth B', capacity: 4, type: 'Grill Booth', status: 'available', location: 'Main Hall' },
      { id: 'SH-1103', name: 'Joseon VIP Suite', capacity: 6, type: 'Private Suite', status: 'available', location: 'Private Wing' }
    ]
  },
  {
    id: 112,
    name: 'The Rustic Truffle Hearth',
    tagline: 'Foraged Forest Mushrooms, Woodfired Steaks & Cellar Ales',
    cuisine: 'Rustic European',
    location: 'Uptown',
    address: '302 Pine Ridge Path, Uptown',
    rating: 4.8,
    reviewsCount: 390,
    priceRange: '$$$',
    openingHours: '12:00 PM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm timber interiors, crackling stone fireplaces, and an earthy menu celebrating foraged black truffles, roasted game meats, and artisanal mountain cheeses.',
    features: ['Stone Fireplace Lounge', 'Foraged Seasonal Menu', 'Local Craft Brewery Selection', 'Heated Veranda'],
    availableTimeSlots: [
      '12:30 PM', '01:30 PM', '06:00 PM', '07:00 PM', '08:00 PM', '08:30 PM', '09:15 PM'
    ],
    tables: [
      { id: 'RT-1201', name: 'Hearthside Fireside 1', capacity: 2, type: 'Fireplace Nook', status: 'available', location: 'Fireplace Room' },
      { id: 'RT-1202', name: 'Timber Beam Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Main Room' },
      { id: 'RT-1203', name: 'Forager’s Round Table', capacity: 6, type: 'Round', status: 'available', location: 'Cedar Room' }
    ]
  },
  {
    id: 113,
    name: 'Le Bistro Provençal',
    tagline: 'Lavender Gardens, Slow-Braised Daube & Sunlit Courtyards',
    cuisine: 'French',
    location: 'West End',
    address: '512 Lavender Court, West End',
    rating: 4.9,
    reviewsCount: 310,
    priceRange: '$$$',
    openingHours: '11:30 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Bask in the quiet sunshine of southern France. Savor tender duck confit, fresh bouillabaisse, wild herb ratatouille, and crisp chilled Côtes de Provence rosé under olive trees.',
    features: ['Sunlit Courtyard', 'Herb Garden Seating', 'Sommelier Selection', 'Pet-Friendly Pergola'],
    availableTimeSlots: [
      '11:30 AM', '12:30 PM', '01:30 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
    ],
    tables: [
      { id: 'BP-1301', name: 'Lavender Pergola 1', capacity: 2, type: 'Garden Nook', status: 'available', location: 'Courtyard' },
      { id: 'BP-1302', name: 'Olive Terrace Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Terrace' },
      { id: 'BP-1303', name: 'Château Banquet Table', capacity: 8, type: 'Private Room', status: 'available', location: 'Salon Privé' }
    ]
  },
  {
    id: 114,
    name: 'Kyoto Bamboo Garden Izakaya',
    tagline: 'Binchotan Charcoal Skewers, Chilled Sake & Zen Garden Patio',
    cuisine: 'Japanese',
    location: 'Downtown',
    address: '89 Kamo River Lane, Downtown',
    rating: 4.8,
    reviewsCount: 445,
    priceRange: '$$$',
    openingHours: '05:00 PM - 12:00 AM',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    description: 'An oasis of calm in the city center. Savor sizzling binchotan charcoal yakitori, handmade gyoza, savory dashi broths, and an exceptional library of small-batch Japanese whiskies.',
    features: ['Binchotan Charcoal Grill', 'Zen Bamboo Garden', 'Craft Sake Flights', 'Late Night Kitchen'],
    availableTimeSlots: [
      '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM', '10:30 PM'
    ],
    tables: [
      { id: 'KB-1401', name: 'Bamboo Garden Bench', capacity: 2, type: 'Garden Patio', status: 'available', location: 'Bamboo Courtyard' },
      { id: 'KB-1402', name: 'Grill Master Booth', capacity: 4, type: 'Wood Booth', status: 'available', location: 'Main Izakaya' },
      { id: 'KB-1403', name: 'Tatami Pavilion', capacity: 6, type: 'Tatami Room', status: 'available', location: 'Private Pavilion' }
    ]
  },
  {
    id: 115,
    name: 'Trattoria & Pizzeria Nostrana',
    tagline: '72-Hour Fermented Dough, Sweet Basil & Burrata Bar',
    cuisine: 'Italian',
    location: 'Midtown',
    address: '404 Vesuvio Way, Midtown',
    rating: 4.9,
    reviewsCount: 575,
    priceRange: '$$$',
    openingHours: '12:00 PM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    description: 'Stepping into Nostrana feels like dining in a sunlit Campania kitchen. Crisp wood-fired Neapolitan pizzas with charred leopard crusts, creamy burrata, and hand-churned pistachio gelato.',
    features: ['Acunto Wood-Fired Oven', 'Open Pasta Lab', 'Burrata Tasting Bar', 'Sunny Lemon Pergola'],
    availableTimeSlots: [
      '12:00 PM', '01:00 PM', '02:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
    ],
    tables: [
      { id: 'TN-1501', name: 'Lemon Pergola Table', capacity: 2, type: 'Pergola', status: 'available', location: 'Lemon Garden' },
      { id: 'TN-1502', name: 'Nonna’s Hearth Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Pizza Hall' },
      { id: 'TN-1503', name: 'Campania Family Board', capacity: 8, type: 'Large Round', status: 'available', location: 'Main Room' }
    ]
  },
  {
    id: 116,
    name: 'El Bohío Caribbean Hearth',
    tagline: 'Pimento-Smoked Cuts, Coconut Rice & Ocean Island Warmth',
    cuisine: 'Caribbean',
    location: 'Harbor Pier',
    address: '28 Island Pier Promenade, Harbor Pier',
    rating: 4.7,
    reviewsCount: 360,
    priceRange: '$$$',
    openingHours: '01:00 PM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    description: 'Feel the island rhythm with slow-smoked jerk pork belly, grilled spiny lobster, crispy golden tostones, and refreshing passionfruit rum cocktails alongside ocean breezes.',
    features: ['Pimento Smoker', 'Harbor Sea Breeze', 'Aged Rum Vault', 'Live Steelpan Fridays'],
    availableTimeSlots: [
      '01:00 PM', '02:30 PM', '06:00 PM', '07:30 PM', '08:30 PM', '09:30 PM'
    ],
    tables: [
      { id: 'EB-1601', name: 'Palm Breeze Table', capacity: 2, type: 'Deck', status: 'available', location: 'Pier Boardwalk' },
      { id: 'EB-1602', name: 'Havana Lounge Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Rum Lounge' },
      { id: 'EB-1603', name: 'Islander Feast Table', capacity: 6, type: 'Round', status: 'available', location: 'Main Deck' }
    ]
  },
  {
    id: 117,
    name: 'Fjord & Pine New Nordic',
    tagline: 'Smoked Juniper Fish, Wild Lingonberries & Hygge Hearth',
    cuisine: 'Nordic',
    location: 'Uptown',
    address: '710 Nordic Fjord Way, Uptown',
    rating: 4.8,
    reviewsCount: 295,
    priceRange: '$$$$',
    openingHours: '05:00 PM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    description: 'An intimate tribute to Scandinavian warmth and simplicity. Light wood interiors, wool throws, and an exquisite tasting menu of alderwood-smoked sea trout, wild forest mushrooms, and fermented cloudberries.',
    features: ['Candlelit Hygge Seating', 'In-House Smokehouse', 'Nordic Aquavit Bar', 'Fireplace Parlor'],
    availableTimeSlots: [
      '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:15 PM'
    ],
    tables: [
      { id: 'FP-1701', name: 'Hygge Fireside Nook', capacity: 2, type: 'Fireside Nook', status: 'available', location: 'Hygge Room' },
      { id: 'FP-1702', name: 'Fjord View Table', capacity: 4, type: 'Window', status: 'available', location: 'North Wing' },
      { id: 'FP-1703', name: 'Valhalla Banquet Table', capacity: 8, type: 'Private Room', status: 'available', location: 'Birch Suite' }
    ]
  },
  {
    id: 118,
    name: 'Byblos Cedar Lebanese Lounge',
    tagline: 'Silk Hummus, Flame-Grilled Mezze & Rosewater Sweets',
    cuisine: 'Middle Eastern',
    location: 'Midtown',
    address: '160 Phoenician Boulevard, Midtown',
    rating: 4.9,
    reviewsCount: 480,
    priceRange: '$$$',
    openingHours: '12:00 PM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    description: 'Generous Levantine hospitality in a tranquil garden setting. Share velvet-smooth spiced hummus, freshly baked za’atar saj flatbreads, tender lamb kofta, and sweet rosewater baklava with fresh mint tea.',
    features: ['Live Saj Flatbread Station', 'Courtyard Water Fountain', 'Mezze Sharing Banquets', 'Cardamom & Mint Tea Ceremony'],
    availableTimeSlots: [
      '12:30 PM', '01:30 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
    ],
    tables: [
      { id: 'BC-1801', name: 'Fountain Alcove Table', capacity: 2, type: 'Courtyard', status: 'available', location: 'Fountain Patio' },
      { id: 'BC-1802', name: 'Cedar Canopy Booth', capacity: 4, type: 'Booth', status: 'available', location: 'Mezze Room' },
      { id: 'BC-1803', name: 'Sultan Sharing Divan', capacity: 6, type: 'Divan Lounge', status: 'available', location: 'Lounge Wing' },
      { id: 'BC-1804', name: 'Grand Levantine Pavilion', capacity: 10, type: 'Private Room', status: 'available', location: 'Royal Cedar Hall' }
    ]
  }
];

export const restaurants = INITIAL_RESTAURANTS;
export default INITIAL_RESTAURANTS;
