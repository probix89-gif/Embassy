// ============================================
// The Embassy — Full Menu Data (from research)
// ============================================

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  isVeg: boolean;
  chefSpecial?: boolean;
  mostSelling?: boolean;
  signature?: boolean;
  spicy?: boolean;
  image?: string;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  note?: string;
}

export const CATEGORIES: Category[] = [
  { slug: "early", name: "Early Morning", emoji: "🌅", note: "Fresh start bites & breakfast" },
  { slug: "special", name: "Embassy Special", emoji: "✨", note: "Our most famous creations" },
  { slug: "soups", name: "Soups & Salads", emoji: "🥣" },
  { slug: "starters", name: "Appetizers", emoji: "🍢" },
  { slug: "mains", name: "Main Course", emoji: "🍛" },
  { slug: "breads", name: "Breads", emoji: "🫓" },
  { slug: "rice", name: "Rice & Biryani", emoji: "🍚" },
  { slug: "pasta", name: "Pasta & Entrée", emoji: "🍝" },
  { slug: "beverages", name: "Beverages", emoji: "☕" },
  { slug: "bar", name: "Bar Menu", emoji: "🍾" },
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

export const MENU: MenuItem[] = [
  // 🌅 EARLY MORNING
  { id: "veg-samosa", name: "Vegetable Samosa", desc: "King-size patties stuffed with potatoes, green peas & fresh spices", price: 289, category: "early", isVeg: true, image: img("photo-1601050690597-df0568f70950") },
  { id: "channa-samosa", name: "Channa Samosa", desc: "King-size patties stuffed with chickpeas & fresh spices", price: 429, category: "early", isVeg: true },
  { id: "mutton-samosa", name: "Mutton Samosa", desc: "King-size patties stuffed with minced meat & fresh spices", price: 429, category: "early", isVeg: false, spicy: true },
  { id: "mix-pakora", name: "Mix Pakora", desc: "Assorted vegetables coated with gram flour & deep fried", price: 399, category: "early", isVeg: true },
  { id: "cheese-pakora", name: "Fresh Cheese Pakora", desc: "Finger-shaped fresh cottage cheese in gram flour batter, deep fried", price: 449, category: "early", isVeg: true },
  { id: "embassy-veg-roll", name: "Embassy Veg Roll", desc: "Bread slice stuffed with spiced vegetables & potatoes, deep fried", price: 349, category: "early", isVeg: true, mostSelling: true, image: img("photo-1568901346375-23c9450c58cd") },
  { id: "embassy-chicken-roll", name: "Embassy Chicken Roll", desc: "Bread slice stuffed with spiced chicken, deep fried", price: 399, category: "early", isVeg: false, mostSelling: true },
  { id: "boiled-eggs", name: "Boiled Eggs", desc: "Served with pepper & salt", price: 249, category: "early", isVeg: false },
  { id: "masala-omelette", name: "Masala Omelette", desc: "Fluffy eggs with onions, tomatoes & green chillies", price: 419, category: "early", isVeg: false },
  { id: "cheese-mushroom-omelette", name: "Cheese & Mushroom Omelette", desc: "Loaded with cheese and sautéed mushrooms", price: 439, category: "early", isVeg: false },
  { id: "chicken-jalapeno-omelette", name: "Chicken & Jalapenos Omelette", desc: "Smoked chicken with a spicy jalapeño kick", price: 469, category: "early", isVeg: false, spicy: true },
  { id: "chicken-cheese-omelette", name: "Chicken & Cheese Omelette", desc: "Tender chicken folded with melted cheese", price: 469, category: "early", isVeg: false },

  // ✨ EMBASSY SPECIAL
  { id: "veg-dumplings", name: "Veg Dumplings", desc: "Minced assorted vegetables tossed with spices & fried, served with fries", price: 449, category: "special", isVeg: true },
  { id: "cheese-cutlet", name: "Fresh Cheese Cutlet", desc: "Cottage cheese dumplings deep fried, served with farmhouse chips", price: 469, category: "special", isVeg: true },
  { id: "chicken-garlic-fingers", name: "Chicken Garlic Fingers", desc: "Chicken tossed with garlic & spices, crumbed & deep fried, garlic mayo", price: 499, category: "special", isVeg: false },
  { id: "mutton-croquettes", name: "Mutton Croquettes", desc: "Minced mutton marinated with herbs & spices, crumb fried, farmhouse chips", price: 549, category: "special", isVeg: false },
  { id: "fried-sole", name: "Fried Sole Fillet", desc: "Chef's Special — golden fried sole fillet with French fries", price: 625, category: "special", isVeg: false, chefSpecial: true, image: img("photo-1519708227418-c8fd9a32b7a2") },
  { id: "potato-salad", name: "Potato Salad", desc: "Blanched diced potatoes tossed with onion & spices, served chilled", price: 249, category: "special", isVeg: true },
  { id: "chicken-salad", name: "Chicken Salad", desc: "Diced chicken tossed with mayonnaise & Indian spices", price: 299, category: "special", isVeg: false },

  // 🥣 SOUPS & SALADS
  { id: "mix-veg-salad", name: "Mix Vegetable Salad", desc: "Assorted vegetables with apple & pineapple dressing", price: 299, category: "soups", isVeg: true },
  { id: "cold-chicken-salad", name: "Cold Chicken Salad", desc: "Blanched chicken tossed with vegetables & mayonnaise", price: 349, category: "soups", isVeg: false },
  { id: "chicken-soup", name: "Chicken Soup", desc: "Clear broth with chicken & herbs, served with bread stick", price: 249, category: "soups", isVeg: false },
  { id: "tomato-soup", name: "Cream of Tomato Soup", desc: "Velvety tomato soup with cream, served with bread stick", price: 229, category: "soups", isVeg: true },
  { id: "veg-soup", name: "Veg Hot & Sour Soup", desc: "Spicy-sour broth with garden vegetables", price: 229, category: "soups", isVeg: true, spicy: true },

  // 🍢 APPETIZERS
  { id: "tandoori-chicken", name: "Tandoori Chicken", desc: "Spring chicken marinated with hung curd & aromatic spices, roasted in tandoor", price: 549, category: "starters", isVeg: false, mostSelling: true, spicy: true, image: img("photo-1599487488170-d11ec9c172f0") },
  { id: "malai-tikka", name: "Chicken Malai Tikka", desc: "Boneless chicken in curd cheese, cream & spices, finished in tandoor", price: 575, category: "starters", isVeg: false },
  { id: "chicken-tikka", name: "Chicken Tikka", desc: "Chicken marinated with hung curd & spices, finished in tandoor", price: 549, category: "starters", isVeg: false },
  { id: "chicken-seekh", name: "Chicken Seekh Kebab", desc: "Minced chicken with traditional spices, skewered & cooked in tandoor", price: 569, category: "starters", isVeg: false },
  { id: "shami-kebab", name: "Shami Kebab", desc: "Minced mutton patties with lentils & fresh spices, deep fried", price: 525, category: "starters", isVeg: false },
  { id: "chicken-tikki", name: "Chicken Tikki", desc: "Pan-fried minced chicken patties, mint chutney, onion & tomato", price: 495, category: "starters", isVeg: false },
  { id: "lamb-chops", name: "Lamb Chops", desc: "Minced lamb with herbs, diced vegetables & spices, BBQ'd", price: 695, category: "starters", isVeg: false, spicy: true },
  { id: "mutton-seekh", name: "Mutton Seekh Kebab", desc: "Minced baby lamb with chillies, coriander & ginger, tandoor", price: 649, category: "starters", isVeg: false },
  { id: "fish-tikka", name: "Fish Tikka", desc: "River sole marinated with yoghurt & spices, BBQ in clay oven", price: 625, category: "starters", isVeg: false },
  { id: "amritsari-fish", name: "Amritsari Fish", desc: "Spicy Punjabi style marinated, deep fried", price: 599, category: "starters", isVeg: false, spicy: true },
  { id: "prawn-tikka", name: "Cambay Prawns Tikka", desc: "Prawns with Indian spices & hung curd, finished in clay oven", price: 725, category: "starters", isVeg: false },
  { id: "kebab-platter", name: "Kebab Platter", desc: "Gourmet platter of assorted kebabs", price: 899, category: "starters", isVeg: false, chefSpecial: true },
  { id: "paneer-tikka", name: "Paneer Tikka", desc: "Cottage cheese marinated with yoghurt & Indian spices, charcoal oven", price: 495, category: "starters", isVeg: true, mostSelling: true, image: img("photo-1631452180519-c014fe946bc7") },
  { id: "hariyali-paneer", name: "Hariyali Paneer Tikka", desc: "Cottage cheese with green chilli & herb marinade", price: 495, category: "starters", isVeg: true },
  { id: "mushroom-tikka", name: "Mushroom Tikka", desc: "Button mushrooms marinated in fresh spices, cooked in tandoor", price: 449, category: "starters", isVeg: true },
  { id: "stuffed-potatoes", name: "Stuffed Potatoes", desc: "Potatoes stuffed with minced cottage cheese, cashewnuts & raisins, tandoor", price: 449, category: "starters", isVeg: true },
  { id: "corn-cheese-tikki", name: "Corn & Cheese Tikki", desc: "Sweet corn and cottage cheese, cooked in tandoor", price: 449, category: "starters", isVeg: true },
  { id: "veg-kebab-platter", name: "Veg Kebab Platter", desc: "Delectable combination of assorted vegetarian kebabs", price: 699, category: "starters", isVeg: true },
  { id: "french-fries", name: "French Fries", desc: "Crispy fries with a sprinkle of spices", price: 249, category: "starters", isVeg: true },

  // 🍛 MAIN COURSE
  { id: "mushroom-spring-onion", name: "Mushroom & Spring Onion", desc: "Fresh mushrooms cooked with spring onions, mild spiced gravy", price: 445, category: "mains", isVeg: true },
  { id: "mushroom-mattar", name: "Mushroom Mattar", desc: "Mushrooms cooked with fresh green peas", price: 445, category: "mains", isVeg: true },
  { id: "paneer-cashew", name: "Paneer in Cashewnut Gravy", desc: "Cottage cheese cubes in rich cashewnut gravy", price: 495, category: "mains", isVeg: true },
  { id: "kadai-paneer", name: "Kadai Paneer", desc: "Cottage cheese in special kadai gravy, diced onion & green peppers", price: 495, category: "mains", isVeg: true, spicy: true },
  { id: "achari-paneer", name: "Achari Paneer", desc: "Cottage cheese cubes in pickled spices", price: 495, category: "mains", isVeg: true },
  { id: "palak-paneer", name: "Palak Paneer", desc: "Cottage cheese in baby spinach & Indian spices", price: 475, category: "mains", isVeg: true, image: img("photo-1603890999605-304d463663df") },
  { id: "paneer-butter-masala", name: "Paneer Butter Masala", desc: "Fresh cottage cheese in creamy tomato & onion gravy", price: 495, category: "mains", isVeg: true, mostSelling: true },
  { id: "paneer-bhurji", name: "Paneer Bhurji", desc: "Scrambled cottage cheese cooked in Indian spices", price: 455, category: "mains", isVeg: true },
  { id: "mattar-paneer", name: "Mattar Paneer", desc: "Cottage cheese & green peas in tomato gravy", price: 475, category: "mains", isVeg: true },
  { id: "paneer-kofta", name: "Paneer Kofta", desc: "Cottage cheese dumplings in cashewnut, onion & yoghurt gravy", price: 515, category: "mains", isVeg: true },
  { id: "stuffed-aloo-gravy", name: "Stuffed Aloo in Tomato Gravy", desc: "Spiced cottage cheese stuffed potatoes in tomato gravy", price: 425, category: "mains", isVeg: true },
  { id: "aloo-mattar", name: "Aloo Mattar", desc: "Green peas & potato in onion tomato gravy", price: 395, category: "mains", isVeg: true },
  { id: "jeera-aloo", name: "Jeera Aloo", desc: "Cumin flavoured potatoes tossed with Indian spices", price: 349, category: "mains", isVeg: true },
  { id: "dal-makhani", name: "Dal Makhani", desc: "Chef's Special — black lentils & kidney beans simmered with butter", price: 449, category: "mains", isVeg: true, chefSpecial: true, mostSelling: true, image: img("photo-1546833999-b9f581a1996d") },
  { id: "dal-tadka", name: "Dal Tadka", desc: "Dry preparation of lentils done exceptionally at the Embassy", price: 395, category: "mains", isVeg: true },
  { id: "chole", name: "Embassy Chole", desc: "Chef's Special — signature chickpeas in traditional recipe, try with bhatura", price: 425, category: "mains", isVeg: true, chefSpecial: true },
  { id: "egg-curry", name: "Egg Curry", desc: "Boiled eggs tossed in aromatic herbs, tomato gravy", price: 395, category: "mains", isVeg: false },
  { id: "butter-chicken", name: "Butter Chicken", desc: "Chef's Special — char-grilled spring chicken in rich tomato & butter gravy", price: 595, category: "mains", isVeg: false, chefSpecial: true, mostSelling: true, image: img("photo-1603894584373-5ac82b2ae398") },
  { id: "badam-pasanda", name: "Chicken Badam Pasanda", desc: "Breast of chicken in thick cream & almond gravy", price: 625, category: "mains", isVeg: false },
  { id: "chicken-tikka-masala", name: "Chicken Tikka Masala", desc: "Succulent chicken tikka tossed with garden fresh peas", price: 595, category: "mains", isVeg: false },
  { id: "chicken-masala", name: "Chicken Masala", desc: "Boneless chicken pieces in thick tomato & onion gravy", price: 545, category: "mains", isVeg: false },
  { id: "chicken-korma", name: "Chicken Korma", desc: "Chef's Special — chicken & egg in rich almond & cream sauce", price: 625, category: "mains", isVeg: false, chefSpecial: true },
  { id: "chicken-keema", name: "Chicken Keema", desc: "Shredded chicken with mild spices, chopped onion & tomato", price: 545, category: "mains", isVeg: false },
  { id: "keema-chicken", name: "Keema Chicken", desc: "Chicken & minced chicken tempered with grounded spices & ginger", price: 575, category: "mains", isVeg: false, spicy: true },
  { id: "methi-chicken", name: "Methi Chicken", desc: "Spring chicken with fresh fenugreek leaves", price: 575, category: "mains", isVeg: false },
  { id: "chicken-curry", name: "Chicken Curry", desc: "Traditional — spring chicken in onion & aromatic herb gravy", price: 525, category: "mains", isVeg: false },
  { id: "kadai-chicken", name: "Kadai Chicken", desc: "Chef's Special — kadai gravy, diced onion & green peppers", price: 595, category: "mains", isVeg: false, chefSpecial: true, spicy: true },
  { id: "mutton-kofta", name: "Mutton Kofta", desc: "Marinated minced meat patties in rich almond & cream sauce", price: 695, category: "mains", isVeg: false },
  { id: "dal-gosht", name: "Dal Gosht", desc: "Signature — lamb cooked with lentils in a traditional way", price: 725, category: "mains", isVeg: false, signature: true, image: img("photo-1545247181-516773cae754") },
  { id: "rogan-josh", name: "Rogan Josh", desc: "Braised lamb in delicately spiced onion, ginger & tomato gravy", price: 695, category: "mains", isVeg: false },
  { id: "mutton-curry", name: "Mutton Curry", desc: "Succulent lamb with onion, tomato & spices", price: 675, category: "mains", isVeg: false },
  { id: "keema-mutton", name: "Keema Mutton", desc: "Mutton & minced meat tempered with grounded spices & ginger", price: 695, category: "mains", isVeg: false, spicy: true },
  { id: "saag-lamb", name: "Saag Lamb", desc: "Lamb in baby spinach, mustard & collard leaves gravy", price: 695, category: "mains", isVeg: false },
  { id: "lamb-onion", name: "Lamb Onion Curry", desc: "Lamb with cocktail onions, tomato gravy", price: 695, category: "mains", isVeg: false },
  { id: "keema-mattar", name: "Keema Mattar", desc: "Minced lamb & green peas in aromatic Indian spices", price: 675, category: "mains", isVeg: false },
  { id: "sole-fish-curry", name: "Sole Fish Curry", desc: "Chef's Special — fresh river sole in chef's special spices", price: 725, category: "mains", isVeg: false, chefSpecial: true },
  { id: "sole-embassy", name: "Sole Fillet — Creation of the Embassy", desc: "Chef's Special — sole fillet topped with our own proprietary sauce", price: 795, category: "mains", isVeg: false, chefSpecial: true },
  { id: "fish-curry", name: "Fish Curry", desc: "Fillet of fish, mild spices, diced onion & tomatoes", price: 645, category: "mains", isVeg: false },
  { id: "fish-malabari", name: "Fish Malabari", desc: "Fish in rich coconut gravy, Malabari style", price: 675, category: "mains", isVeg: false },
  { id: "prawn-malabari", name: "Prawns Malabari", desc: "Prawns in rich coconut gravy, Malabari style", price: 795, category: "mains", isVeg: false },

  // 🫓 BREADS
  { id: "tandoori-roti", name: "Tandoori Roti", desc: "Traditional north Indian flatbread, wheat flour, tandoor", price: 60, category: "breads", isVeg: true },
  { id: "butter-naan", name: "Butter Naan", desc: "Soft leavened bread, brushed with butter", price: 90, category: "breads", isVeg: true, mostSelling: true },
  { id: "garlic-naan", name: "Garlic Naan", desc: "Soft & crispy bread with garlic and butter", price: 120, category: "breads", isVeg: true },
  { id: "besan-roti", name: "Besan Roti", desc: "Chickpea & wholewheat flour flatbread", price: 75, category: "breads", isVeg: true },
  { id: "roghni-naan", name: "Roghni Naan", desc: "Soft, fluffy Pakistani-style flatbread", price: 110, category: "breads", isVeg: true },
  { id: "mint-paratha", name: "Mint Paratha", desc: "Flaky whole wheat paratha with a twist of mint", price: 95, category: "breads", isVeg: true },
  { id: "onion-kulcha", name: "Onion Kulcha", desc: "Onion stuffed white flour bread", price: 110, category: "breads", isVeg: true },
  { id: "aloo-kulcha", name: "Aloo Kulcha", desc: "Potato stuffed white flour bread", price: 110, category: "breads", isVeg: true },
  { id: "mutton-kulcha", name: "Mutton Kulcha", desc: "Minced mutton stuffed bread", price: 150, category: "breads", isVeg: false },

  // 🍚 RICE
  { id: "steamed-rice", name: "Steamed Rice", desc: "Plain basmati rice, served hot with basil leaves", price: 199, category: "rice", isVeg: true },
  { id: "jeera-rice", name: "Jeera Rice", desc: "Fluffy basmati rice tempered with roasted cumin", price: 249, category: "rice", isVeg: true },
  { id: "mattar-pulao", name: "Mattar Pulao", desc: "Green peas simmered with basmati rice & spices", price: 299, category: "rice", isVeg: true },
  { id: "veg-pulao", name: "Veg Pulao", desc: "Fresh vegetables simmered with basmati rice & spices", price: 325, category: "rice", isVeg: true },
  { id: "chicken-biryani", name: "Chicken Biryani", desc: "Chicken with finest basmati rice, flavoured with saffron", price: 425, category: "rice", isVeg: false, mostSelling: true, image: img("photo-1589302168068-964664d93dc0") },
  { id: "mutton-biryani", name: "Mutton Biryani", desc: "Mutton with finest basmati rice, flavoured with saffron", price: 495, category: "rice", isVeg: false },

  // 🍝 PASTA & ENTRÉE
  { id: "arrabbiata", name: "Arrabbiata", desc: "Spicy sauce with tomato & chilli flakes, slow cooked", price: 445, category: "pasta", isVeg: true, spicy: true },
  { id: "veg-cream-pasta", name: "Veg Pasta in Parmesan Cream", desc: "Assorted vegetables with parmesan cream sauce", price: 465, category: "pasta", isVeg: true },
  { id: "aglio-olio", name: "Aglio Olio", desc: "Pasta tossed in garlic & chilli flakes, parmesan cheese", price: 445, category: "pasta", isVeg: true, spicy: true },
  { id: "grilled-chicken", name: "Grilled Chicken", desc: "Chicken marinated in spices & grilled", price: 595, category: "pasta", isVeg: false },
  { id: "chicken-supreme", name: "Chicken Supreme", desc: "Marinated spring chicken grilled, creamy mushroom sauce & vegetables", price: 649, category: "pasta", isVeg: false },
  { id: "chicken-supreme-sauce", name: "Chicken in Supreme Sauce", desc: "Grilled chicken in homemade supreme sauce with sliced tomato", price: 625, category: "pasta", isVeg: false },
  { id: "chicken-a-la-king", name: "Chicken A La King", desc: "Chicken, capsicum & onion in creamy sauce, rice & sautéed vegetables", price: 649, category: "pasta", isVeg: false },
  { id: "steamed-sole", name: "Steamed Sole", desc: "Sole fillet steamed, creamy sauce with lemon wedge", price: 675, category: "pasta", isVeg: false },
  { id: "pan-fried-fish", name: "Pan-Fried Fish", desc: "Fish dredged with mixed herb flour, lemon wedge", price: 649, category: "pasta", isVeg: false },
  { id: "fish-chips", name: "Fish & Chips", desc: "Chef's Special — batter fried fish with pickle onion, gherkins & tomato", price: 599, category: "pasta", isVeg: false, chefSpecial: true },
  { id: "veg-au-gratin", name: "Veg Au Gratin", desc: "Assorted vegetables in cheese sauce, baked", price: 495, category: "pasta", isVeg: true },
  { id: "veg-a-la-king", name: "Veg A La King", desc: "Mushroom, capsicum & onion in creamy sauce, rice & grilled vegetables", price: 495, category: "pasta", isVeg: true },
  { id: "steamed-veg", name: "Steamed Vegetables", desc: "Broccoli, carrots & green beans", price: 349, category: "pasta", isVeg: true },
  { id: "garden-veg", name: "Garden Vegetables", desc: "Broccoli, peas, babycorn, zucchini & carrot", price: 375, category: "pasta", isVeg: true },

  // ☕ BEVERAGES
  { id: "espresso", name: "Espresso", desc: "Bold & intense", price: 159, category: "beverages", isVeg: true },
  { id: "americano", name: "Americano", desc: "Espresso with hot water", price: 169, category: "beverages", isVeg: true },
  { id: "cappuccino", name: "Cappuccino", desc: "Espresso with steamed milk & foam", price: 179, category: "beverages", isVeg: true },
  { id: "latte", name: "Latte", desc: "Smooth espresso with creamy milk", price: 179, category: "beverages", isVeg: true },
  { id: "mocha", name: "Mocha", desc: "Espresso with chocolate & milk", price: 199, category: "beverages", isVeg: true },
  { id: "cold-coffee", name: "Cold Coffee with Cream", desc: "Chilled coffee with a swirl of cream", price: 209, category: "beverages", isVeg: true },
  { id: "masala-tea", name: "Masala Tea", desc: "Spiced Indian chai", price: 207, category: "beverages", isVeg: true },
  { id: "green-tea", name: "Green Tea", desc: "Light & refreshing", price: 207, category: "beverages", isVeg: true },
  { id: "assam-tea", name: "Assam Tea", desc: "Full-bodied black tea", price: 209, category: "beverages", isVeg: true },
  { id: "darjeeling-tea", name: "Darjeeling Tea", desc: "Delicate, floral notes", price: 209, category: "beverages", isVeg: true },

  // 🍾 BAR
  { id: "moet", name: "Moët & Chandon", desc: "Champagne — bottle", price: 10999, category: "bar", isVeg: true },
  { id: "prosecco", name: "Martini Prosecco", desc: "Sparkling wine — bottle", price: 5999, category: "bar", isVeg: true },
  { id: "rothschild-sb", name: "Rothschild Sauvignon Blanc", desc: "White wine — bottle", price: 3999, category: "bar", isVeg: true },
  { id: "fratelli-chardonnay", name: "Fratelli Chardonnay", desc: "White wine — bottle", price: 2499, category: "bar", isVeg: true },
  { id: "rothschild-cab", name: "Rothschild Cabernet", desc: "Red wine — bottle", price: 3999, category: "bar", isVeg: true },
  { id: "fratelli-cab", name: "Fratelli Cabernet", desc: "Red wine — bottle", price: 2499, category: "bar", isVeg: true },
  { id: "grey-goose", name: "Grey Goose", desc: "Vodka — 30 ml glass", price: 499, category: "bar", isVeg: true },
  { id: "absolut-blue", name: "Absolut Blue", desc: "Vodka — 30 ml glass", price: 399, category: "bar", isVeg: true },
  { id: "smirnoff", name: "Smirnoff", desc: "Vodka — 30 ml glass", price: 299, category: "bar", isVeg: true },
  { id: "old-monk", name: "Old Monk White / Dark", desc: "Rum — 30 ml glass", price: 249, category: "bar", isVeg: true },
];

export const getMenuByCategory = (slug: string) => MENU.filter(m => m.category === slug);
export const getItem = (id: string) => MENU.find(m => m.id === id);
export const vegOnly = (items: MenuItem[]) => items.filter(i => i.isVeg);
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const CHEF_SPECIALS = MENU.filter(m => m.chefSpecial);
export const MOST_SELLING = MENU.filter(m => m.mostSelling);
