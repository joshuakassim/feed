import mongoose from 'mongoose';

/**
 * Mongoose schema for a Donation listing.
 *
 * Fields:
 * - donor: ObjectId reference to the User who created the donation (required)
 * - title: Title of the donation listing (required, trimmed)
 * - imageUrl: Optional image URL for the donation
 * - quantity: Quantity of the donation (required, stored as string for flexibility)
 * - location: Object containing address (string), latitude (number, required), and longitude (number, required)
 * - expiryDate: Date when the donation expires (required)
 * - status: Current status of the donation ('available' or 'claimed', defaults to 'available')
 * - claimCode: Unique code for claiming the donation (auto-generated, 6 uppercase alphanumeric characters)
 * - timestamps: Automatically managed createdAt and updatedAt fields
 */
const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: String,
    quantity: {
      type: String,
      required: true,
    },
    location: {
      address: String,
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'claimed'],
      default: 'available',
    },
    claimCode: {
      type: String,
      default: function () {
        // Generates a random 6-character uppercase alphanumeric code
        return Math.random().toString(36).substring(2, 8).toUpperCase();
      },
    },
  },
  { timestamps: true }
);

/**
 * Donation model for MongoDB.
 * Represents a food donation listing created by a donor.
 */
export default mongoose.model('Donation', donationSchema);
