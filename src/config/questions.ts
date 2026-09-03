export const MEN_CATEGORIES = {
  'Top Wear': [
    'T-Shirts', 'Polo T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Checked Shirts',
    'Printed Shirts', 'Plain Shirts', 'Linen Shirts', 'Denim Shirts', 'Oversized T-Shirts',
    'Full Sleeve T-Shirts', 'Half Sleeve T-Shirts', 'Sweatshirts', 'Hoodies', 'Sweaters',
    'Cardigans', 'Jackets', 'Blazers', 'Coats', 'Waistcoats/Vests', 'Thermals'
  ],
  'Bottom Wear': [
    'Jeans', 'Casual Trousers', 'Formal Trousers', 'Chinos', 'Cargo Pants', 'Joggers',
    'Track Pants', 'Shorts', 'Three-Fourth/Capri', 'Cotton Pants', 'Linen Pants'
  ],
  'Ethnic': [
    'Kurta', 'Kurta Pajama', 'Pathani', 'Nehru Jacket', 'Sherwani', 'Dhoti', 'Ethnic Set', 'Festive Wear'
  ],
  'Sports': ['Track Suit', 'Sports T-Shirt', 'Sports Shorts', 'Gym Wear', 'Activewear'],
  'Basics': ['Innerwear', 'Vests', 'Socks', 'Handkerchiefs'],
  'Footwear': ['Shoes', 'Sneakers', 'Sandals', 'Slippers', 'Other Footwear'],
  'Accessories': ['Belts', 'Wallets', 'Caps', 'Bags', 'Watches', 'Sunglasses', 'Other Accessories'],
  'Other': ['Other']
};

export const WOMEN_CATEGORIES = {
  'Tops': ['Tops', 'T-Shirts', 'Shirts', 'Crop Tops', 'Tank Tops', 'Tunics', 'Blouses', 'Sweatshirts', 'Hoodies'],
  'Bottoms': ['Jeans', 'Trousers', 'Pants', 'Cargo', 'Joggers', 'Leggings', 'Palazzos', 'Shorts', 'Skirts', 'Culottes'],
  'Dresses': ['Casual Dress', 'Party Dress', 'Maxi Dress', 'Midi Dress', 'Mini Dress', 'Gown', 'Jumpsuit', 'Co-ord Set'],
  'Ethnic': ['Kurti', 'Kurta Set', 'Salwar Suit', 'Anarkali', 'Saree', 'Lehenga', 'Dupatta', 'Ethnic Set'],
  'Winter': ['Jacket', 'Cardigan', 'Sweater', 'Sweatshirt', 'Hoodie', 'Coat', 'Shawl'],
  'Active': ['Gym Wear', 'Track Pants', 'Sports T-Shirt', 'Activewear'],
  'Footwear': ['Shoes', 'Sneakers', 'Sandals', 'Slippers', 'Flats', 'Heels'],
  'Accessories': ['Handbag', 'Sling Bag', 'Wallet', 'Belt', 'Scarf', 'Jewellery', 'Hair Accessories', 'Sunglasses', 'Cap'],
  'Other': ['Other']
};

export const KIDS_AGE_GROUPS = ['0–2 years', '3–5 years', '6–10 years', '11–14 years', '15–18 years'];

export const KIDS_PRODUCTS = [
  'T-Shirt', 'Shirt', 'Jeans', 'Pants', 'Shorts', 'Dress', 'Frock', 'Kurta', 'Ethnic Wear',
  'Hoodie', 'Jacket', 'Sweater', 'School/Active Wear', 'Nightwear', 'Innerwear', 'Shoes',
  'Sandals', 'Slippers', 'Accessories', 'Other'
];

export const COMMON_COLOURS = [
  'Blue', 'Dark Blue', 'Light Blue', 'Black', 'White', 'Grey', 'Red', 'Green', 'Yellow',
  'Pink', 'Purple', 'Orange', 'Brown', 'Beige', 'Maroon', 'Multicolor', 'Other'
];

export const QUALITY_OPTIONS = [
  { label: 'Fitting achhi', icon: '👌', value: 'Fitting achhi' },
  { label: 'Quality achhi', icon: '✨', value: 'Quality achhi' },
  { label: 'Comfortable', icon: '😌', value: 'Comfortable' },
  { label: 'Design pasand aaya', icon: '🔥', value: 'Design pasand aaya' },
  { label: 'Variety achhi', icon: '🛍️', value: 'Variety achhi' },
  { label: 'Average', icon: '🙂', value: 'Average' },
  { label: 'Expected jaisa nahi', icon: '👎', value: 'Expected jaisa nahi' }
];

export const FABRIC_OPTIONS = [
  { label: 'Fabric achha', icon: '🧵', value: 'Fabric achha' },
  { label: 'Soft', icon: '☁️', value: 'Soft' },
  { label: 'Light', icon: '🍃', value: 'Light' },
  { label: 'Comfortable', icon: '😌', value: 'Comfortable' },
  { label: 'Good quality', icon: '✨', value: 'Good quality' }
];

export const PRICE_OPTIONS = [
  { label: 'Paisa Vasool', icon: '💰', value: 'Paisa Vasool', positive: true },
  { label: 'Reasonable', icon: '👍', value: 'Reasonable', positive: true },
  { label: 'Offer/Discount achha', icon: '🏷️', value: 'Offer/Discount achha', positive: true },
  { label: 'Theek hai', icon: '🙂', value: 'Theek hai', positive: true },
  { label: 'Thoda expensive', icon: '💸', value: 'Thoda expensive', positive: false },
  { label: 'Expensive', icon: '😕', value: 'Expensive', positive: false }
];

export const STAFF_OPTIONS = [
  { label: 'Friendly', icon: '😊', value: 'Friendly' },
  { label: 'Helpful', icon: '🤝', value: 'Helpful' },
  { label: 'Quick', icon: '⚡', value: 'Quick' },
  { label: 'Professional', icon: '👌', value: 'Professional' },
  { label: 'Product samjhaya', icon: '💬', value: 'Product samjhaya' },
  { label: 'Normal', icon: '🙂', value: 'Normal' },
  { label: 'Help nahi mili', icon: '😕', value: 'Help nahi mili' },
  { label: 'No interaction hua', icon: '😶', value: 'No interaction hua' }
];

export const STORE_EXPERIENCE_OPTIONS = [
  { label: 'Ambience achha', icon: '✨', value: 'Ambience achha' },
  { label: 'Clean & organised', icon: '🧼', value: 'Clean & organised' },
  { label: 'Products easily mile', icon: '🛍️', value: 'Products easily mile' },
  { label: 'Variety achhi', icon: '👕', value: 'Variety achhi' },
  { label: 'Easy shopping', icon: '🚶', value: 'Easy shopping' },
  { label: 'Normal', icon: '🙂', value: 'Normal' },
  { label: 'Crowded', icon: '😕', value: 'Crowded' }
];

export const OVERALL_EXPERIENCE_OPTIONS = [
  { label: 'Excellent', icon: '😍', value: 'Excellent' },
  { label: 'Very Good', icon: '😊', value: 'Very Good' },
  { label: 'Good', icon: '🙂', value: 'Good' },
  { label: 'Average', icon: '😐', value: 'Average' },
  { label: 'Not good', icon: '😕', value: 'Not good' }
];

export const IMPROVEMENT_OPTIONS = [
  'Product Quality', 'Fit', 'Collection', 'Price', 'Staff', 'Service', 'Store Experience', 'Waiting Time', 'Other'
];
