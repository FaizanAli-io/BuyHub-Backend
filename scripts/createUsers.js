import axios from 'axios';
import { Role } from '@prisma/client';

const users = [
  {
    name: 'faizan',
    email: 'faizan@example.com',
    password: '12345',
    role: Role.ADMIN,
    address: '1234 Block 7, Gulshan-e-Iqbal, Karachi, Sindh, Pakistan',
  },
  {
    name: 'zaid',
    email: 'zaid@example.com',
    password: '12345',
    role: Role.SELLER,
    address: '2345 Block 13, Korangi, Karachi, Sindh, Pakistan',
  },
  {
    name: 'hamail',
    email: 'hamail@example.com',
    password: '12345',
    role: Role.SELLER,
    address: '3456 Block 4, Saddar, Karachi, Sindh, Pakistan',
  },
  {
    name: 'aadil',
    email: 'aadil@example.com',
    password: '12345',
    role: Role.SELLER,
    address: '4567 Block 2, Liaquatabad, Karachi, Sindh, Pakistan',
  },
  {
    name: 'jaswant',
    email: 'jaswant@example.com',
    password: '12345',
    role: Role.BUYER,
    address: '5678 Block 9, Malir, Karachi, Sindh, Pakistan',
  },
  {
    name: 'huzaifa',
    email: 'huzaifa@example.com',
    password: '12345',
    role: Role.BUYER,
    address: '6789 Block 8, Gulistan-e-Jauhar, Karachi, Sindh, Pakistan',
  },
  {
    name: 'usman',
    email: 'usman@example.com',
    password: '12345',
    role: Role.BUYER,
    address: '7890 Block 6, Karachi Cantonment, Karachi, Sindh, Pakistan',
  },
];

const createUsers = async () => {
  const url = 'http://localhost:3000/users';

  for (const user of users) {
    try {
      const response = await axios.post(url, user);
      console.log(`User ${user.name} created successfully.`);
    } catch (error) {
      console.error(
        `Failed to create user ${user.name}:`,
        error.response?.data || error.message,
      );
    }
  }
};

createUsers();
