// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Admin = require('./models/adminModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Admin.deleteMany();

    // Sample users
    const users = [
      {
        username: 'Test User',
        email: 'user@example.com',
        password: await bcrypt.hash('123456', 10)
      }
    ];

    const admins = [
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10)
      }
    ];

    await User.insertMany(users);
    await Admin.insertMany(admins);

    console.log('✅ Sample Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

importData();
