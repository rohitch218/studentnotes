const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const registerUser = async () => {
  try {
    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'admin123';

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-notes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`\nUser '${username}' already exists.`);
      console.log('You can login with these credentials.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create user
    console.log(`Creating user '${username}'...`);
    const user = new User({ username, password });
    await user.save();

    console.log(`\n✅ User '${username}' created successfully!`);
    console.log(`\nYou can now login with:`);
    console.log(`  Username: ${username}`);
    console.log(`  Password: ${password}`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating user:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n⚠️  MongoDB is not running!');
      console.error('Please start MongoDB first. See MONGODB-SETUP.md for instructions.');
    }
    process.exit(1);
  }
};

registerUser();

