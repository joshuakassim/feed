import mongoose from 'mongoose';

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
    description: String,
    imageUrl: String,
    quantity: {
      type: String, // e.g. "50kg", "20 crates"
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
      enum: [
        'available',
        'accepted',
        'pending_pickup',
        'picked_up',
        'delivered',
      ],
      default: 'available',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);
