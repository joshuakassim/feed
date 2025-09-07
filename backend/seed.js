// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from './models/User.js';
import Donation from './models/Donation.js';
import Match from './models/Match.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    await User.deleteMany();
    await Donation.deleteMany();
    await Match.deleteMany();
    console.log('🧹 Cleared old data');

    // Hash password
    const password = await bcrypt.hash('test123', 10);

    // Create mock users
    const donor = await User.create({
      name: 'Alice Farmer',
      email: 'alice@example.com',
      password,
      role: 'donor',
    });

    const recipient = await User.create({
      name: 'Helping Hands Charity',
      email: 'charity@example.com',
      password,
      role: 'recipient',
    });

    console.log('👤 Created mock users');

    // Create mock donation
    const donation = await Donation.create({
      donor: donor._id,
      title: '50kg Tomatoes',
      quantity: '50kg',
      location: {
        address: 'Farm Road, Harare',
        lat: -17.8292,
        lng: 31.0522,
      },
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    });

    console.log('🥕 Created mock donation');

    // Create mock match
    await Match.create({
      donation: donation._id,
      recipient: recipient._id,
      route: {
        distance: '12 km',
        duration: '25 min',
      },
    });

    console.log('🔗 Created mock match');

    console.log('🌱 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
