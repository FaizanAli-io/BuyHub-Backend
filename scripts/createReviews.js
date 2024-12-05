import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const productIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
];

const userIds = [4, 5];

const reviewContent = [
  { text: 'This product exceeded my expectations!', rating: [4, 5] }, // Positive
  { text: 'Quality is great, I am happy with my purchase.', rating: [4, 5] }, // Positive
  { text: 'Not bad, but I expected more.', rating: [3] }, // Neutral
  { text: 'Good value for the price.', rating: [3, 4] }, // Neutral to Positive
  { text: 'I would not recommend this product.', rating: [1, 2] }, // Negative
  { text: 'The product broke after a few uses.', rating: [1, 2] }, // Negative
  { text: 'Amazing quality and fast delivery.', rating: [4, 5] }, // Positive
  { text: 'Very comfortable and works well.', rating: [4, 5] }, // Positive
  { text: 'The product was different from the description.', rating: [2, 3] }, // Neutral to Negative
  { text: 'I am very satisfied with the product!', rating: [4, 5] }, // Positive
];

const generateRandomReview = (productId) => {
  const userId = userIds[Math.floor(Math.random() * userIds.length)];
  const randomReview =
    reviewContent[Math.floor(Math.random() * reviewContent.length)];

  const rating =
    randomReview.rating[Math.floor(Math.random() * randomReview.rating.length)];

  return {
    userId,
    productId,
    rating,
    content: randomReview.text,
  };
};

const reviews = [];
for (let i = 0; i < 256; i++) {
  const productId = productIds[Math.floor(Math.random() * productIds.length)];
  reviews.push(generateRandomReview(productId));
}

const postReviews = async () => {
  try {
    for (let review of reviews) {
      await axios.post(`${BASE_URL}/reviews`, review);
      console.log(
        `Review added for Product ID ${review.productId} by User ID ${review.userId}`,
      );
    }
  } catch (error) {
    console.error('Error posting reviews:', error);
  }
};

postReviews();
