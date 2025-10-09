import mongoose from 'mongoose';

/**
 * Mongoose schema for a User.
 *
 * Fields:
 * - name: User's full name (required, trimmed)
 * - email: User's email address (required, unique, stored in lowercase)
 * - password: User's hashed password (required)
 * - role: User's role in the system ('donor' or 'recipient', required)
 * - location: Object containing latitude and longitude (both required)
 * - timestamps: Automatically managed createdAt and updatedAt fields
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['donor', 'recipient'],
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

/**
 * User model for MongoDB.
 * Represents a registered user in the system.
 */
export default mongoose.model('User', userSchema);
