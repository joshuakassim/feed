import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending_pickup', 'picked_up', 'delivered'],
      default: 'pending_pickup',
    },
    route: {
      distance_km: Number,
      duration_min: Number,
      polyline: String, // encoded polyline from OpenRouteService
    },
  },
  { timestamps: true }
);

export default mongoose.model('Match', matchSchema);
