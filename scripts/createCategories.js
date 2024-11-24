import axios from 'axios';

const categories = [
  { name: 'Furniture' },
  { name: 'Electronics' },
  { name: 'Apparel' },
  { name: 'Footwear' },
  { name: 'Perfumes' },
  { name: 'Cosmetics' },
];

const createCategories = async () => {
  const url = 'http://localhost:3000/categories';

  for (const category of categories) {
    try {
      const response = await axios.post(url, category);
      console.log(`Category "${category.name}" created successfully.`);
    } catch (error) {
      console.error(`Failed to create category "${category.name}":`, error.response?.data || error.message);
    }
  }
};

createCategories();
