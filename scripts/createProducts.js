import axios from 'axios';

const products = [
  {
    categoryId: 1,
    userId: 2,
    name: 'Wooden Luxury Sofa',
    description:
      'A handcrafted wooden sofa with luxurious velvet cushions. Perfect for your living room.',
    price: 600,
    quantity: 101,
  },
  {
    categoryId: 2,
    userId: 2,
    name: 'Smart LED TV 55"',
    description:
      'A high-definition smart TV with built-in streaming apps and a sleek design.',
    price: 700,
    quantity: 102,
  },
  {
    categoryId: 1,
    userId: 2,
    name: 'Classic Oak Coffee Table',
    description:
      'A sturdy oak wood coffee table with a classic design to complement any modern living room.',
    price: 150,
    quantity: 103,
  },
  {
    categoryId: 2,
    userId: 2,
    name: 'Wireless Bluetooth Speaker',
    description:
      'A portable Bluetooth speaker with exceptional sound quality and a sleek modern look.',
    price: 120,
    quantity: 104,
  },
  {
    categoryId: 1,
    userId: 2,
    name: 'Luxury Leather Recliner',
    description:
      'A luxurious leather recliner with adjustable headrests and footrests for ultimate comfort.',
    price: 800,
    quantity: 105,
  },
  {
    categoryId: 2,
    userId: 2,
    name: '4K UHD Smart Projector',
    description:
      'A 4K UHD projector with advanced features for a cinematic experience in your home.',
    price: 950,
    quantity: 106,
  },
  {
    categoryId: 1,
    userId: 2,
    name: 'Modern Glass Bookshelf',
    description:
      'A contemporary glass bookshelf designed to showcase your collection in style.',
    price: 200,
    quantity: 107,
  },
  {
    categoryId: 2,
    userId: 2,
    name: 'Soundbar with Subwoofer',
    description:
      'Enhance your movie nights with a high-quality soundbar and subwoofer combo.',
    price: 250,
    quantity: 108,
  },
  {
    categoryId: 1,
    userId: 2,
    name: 'Industrial Steel Bar Stool',
    description:
      'An industrial-style steel bar stool with adjustable height and sturdy footrest.',
    price: 80,
    quantity: 109,
  },
  {
    categoryId: 2,
    userId: 2,
    name: 'Smart Thermostat',
    description:
      'Control your home temperature with this energy-efficient smart thermostat.',
    price: 120,
    quantity: 110,
  },
  {
    categoryId: 1,
    userId: 2,
    name: 'Rustic Wooden Dining Table',
    description:
      'A large, rustic dining table crafted from reclaimed wood, perfect for family gatherings.',
    price: 950,
    quantity: 111,
  },
  {
    categoryId: 2,
    userId: 2,
    name: 'Smart Home Assistant',
    description:
      'A voice-controlled smart home assistant to manage your household devices with ease.',
    price: 130,
    quantity: 112,
  },
  {
    categoryId: 3,
    userId: 3,
    name: 'Stylish Denim Jacket',
    description:
      'A trendy denim jacket with a modern fit, perfect for casual outings.',
    price: 80,
    quantity: 113,
  },
  {
    categoryId: 4,
    userId: 3,
    name: 'Sports Running Shoes',
    description:
      'High-performance running shoes designed for comfort and speed.',
    price: 120,
    quantity: 114,
  },
  {
    categoryId: 3,
    userId: 3,
    name: 'Leather Bomber Jacket',
    description:
      'A premium leather bomber jacket, designed for a bold, confident look.',
    price: 250,
    quantity: 115,
  },
  {
    categoryId: 4,
    userId: 3,
    name: 'Casual Slip-On Sneakers',
    description:
      'Comfortable slip-on sneakers with a casual look for everyday wear.',
    price: 60,
    quantity: 116,
  },
  {
    categoryId: 3,
    userId: 3,
    name: 'Vintage Plaid Shirt',
    description:
      'A stylish plaid shirt with a vintage look, perfect for layering or wearing alone.',
    price: 50,
    quantity: 117,
  },
  {
    categoryId: 4,
    userId: 3,
    name: 'Waterproof Hiking Boots',
    description:
      'Durable hiking boots with waterproof technology and great ankle support.',
    price: 180,
    quantity: 118,
  },
  {
    categoryId: 3,
    userId: 3,
    name: 'Cashmere Wool Sweater',
    description:
      'A soft and luxurious cashmere wool sweater, perfect for chilly days.',
    price: 220,
    quantity: 119,
  },
  {
    categoryId: 4,
    userId: 3,
    name: 'Comfort Fit Joggers',
    description: 'Comfortable and stylish joggers for lounging or working out.',
    price: 40,
    quantity: 120,
  },
  {
    categoryId: 3,
    userId: 3,
    name: 'Faux Fur Winter Coat',
    description:
      'Stay warm and stylish with this luxurious faux fur winter coat.',
    price: 300,
    quantity: 121,
  },
  {
    categoryId: 4,
    userId: 3,
    name: 'Performance Running Shorts',
    description:
      'Breathable running shorts designed for maximum comfort and performance.',
    price: 30,
    quantity: 122,
  },
  {
    categoryId: 3,
    userId: 3,
    name: 'Flannel Lounge Pants',
    description:
      'Soft, flannel lounge pants designed for maximum comfort on lazy days.',
    price: 45,
    quantity: 123,
  },
  {
    categoryId: 4,
    userId: 3,
    name: 'Casual Wear Loafers',
    description:
      'Comfortable and stylish loafers for casual and semi-casual wear.',
    price: 35,
    quantity: 123,
  },
  {
    categoryId: 5,
    userId: 2,
    name: 'Luxury Oud Perfume',
    description:
      'An exotic, long-lasting oud perfume with warm, woody undertones.',
    price: 120,
    quantity: 124,
  },
  {
    categoryId: 6,
    userId: 3,
    name: 'Rosewater Face Cream',
    description:
      'A refreshing face cream made with natural rosewater for smooth and glowing skin.',
    price: 40,
    quantity: 125,
  },
  {
    categoryId: 5,
    userId: 2,
    name: 'Jasmine Scented Candles',
    description:
      'Hand-poured candles with a calming jasmine fragrance for a relaxing atmosphere.',
    price: 25,
    quantity: 126,
  },
  {
    categoryId: 6,
    userId: 3,
    name: 'Lavender Essential Oil',
    description:
      'A pure lavender essential oil that promotes relaxation and stress relief.',
    price: 35,
    quantity: 127,
  },
  {
    categoryId: 5,
    userId: 2,
    name: 'Amber & Musk Perfume',
    description:
      'A sophisticated blend of amber and musk, perfect for evening wear.',
    price: 150,
    quantity: 128,
  },
  {
    categoryId: 6,
    userId: 3,
    name: 'Aloe Vera Body Lotion',
    description:
      'A soothing aloe vera lotion that hydrates and softens dry skin.',
    price: 20,
    quantity: 129,
  },
  {
    categoryId: 5,
    userId: 2,
    name: 'Vanilla Spice Fragrance Oil',
    description:
      'A warm and inviting vanilla spice fragrance oil for home use.',
    price: 15,
    quantity: 130,
  },
  {
    categoryId: 6,
    userId: 3,
    name: 'Charcoal Face Mask',
    description:
      'A detoxifying charcoal face mask that clears pores and revitalizes skin.',
    price: 50,
    quantity: 131,
  },
  {
    categoryId: 5,
    userId: 2,
    name: 'Citrus Blossom Perfume',
    description: 'A refreshing citrus fragrance with a zesty and floral twist.',
    price: 90,
    quantity: 132,
  },
  {
    categoryId: 6,
    userId: 3,
    name: 'Vitamin C Serum',
    description:
      'A potent vitamin C serum that brightens and rejuvenates your skin.',
    price: 70,
    quantity: 133,
  },
  {
    categoryId: 5,
    userId: 2,
    name: 'Sandalwood & Musk Eau De Parfum',
    description:
      'A deep and earthy sandalwood fragrance, perfect for sophisticated evenings.',
    price: 160,
    quantity: 134,
  },
  {
    categoryId: 6,
    userId: 3,
    name: 'Green Tea Face Scrub',
    description:
      'A refreshing green tea face scrub that exfoliates and rejuvenates the skin.',
    price: 25,
    quantity: 135,
  },
];

const url = 'http://localhost:3000/products';

const createProducts = async () => {
  for (const product of products) {
    try {
      const response = await axios.post(url, product);
      console.log(`Product "${product.name}" created successfully.`);
    } catch (error) {
      console.error(
        `Failed to create product "${product.name}":`,
        error.message,
      );
    }
  }
};

createProducts();
