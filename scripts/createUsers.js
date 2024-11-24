import axios from 'axios';
import { Role } from '@prisma/client';

const users = [
  { name: 'faizan', email: 'faizan@example.com', password: '12345', role: Role.ADMIN },
  { name: 'zaid', email: 'zaid@example.com', password: '12345', role: Role.SELLER },
  { name: 'hamail', email: 'hamail@example.com', password: '12345', role: Role.SELLER },
  { name: 'aadil', email: 'aadil@example.com', password: '12345', role: Role.SELLER },
  { name: 'jaswant', email: 'jaswant@example.com', password: '12345', role: Role.BUYER },
  { name: 'huzaifa', email: 'huzaifa@example.com', password: '12345', role: Role.BUYER },
  { name: 'usman', email: 'usman@example.com', password: '12345', role: Role.BUYER },
];

const createUsers = async () => {
  const url = 'http://localhost:3000/users';

  for (const user of users) {
    try {
      const response = await axios.post(url, user);
      console.log(`User ${user.name} created successfully.`);
    } catch (error) {
      console.error(`Failed to create user ${user.name}:`, error.response?.data || error.message);
    }
  }
};

createUsers();
