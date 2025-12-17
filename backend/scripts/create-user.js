const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createUser = async () => {
  try {
    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'admin123';

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-notes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User '${username}' already exists.`);
      process.exit(0);
    }

    // Create user
    const user = new User({ username, password });
    await user.save();

    console.log(`User '${username}' created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating user:', error);
    process.exit(1);
  }
};

createUser();

