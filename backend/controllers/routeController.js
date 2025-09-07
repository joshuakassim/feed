import Match from '../models/Match.js';
import Donation from '../models/Donation.js';
import axios from 'axios';

const ORS_API_KEY = process.env.ORS_API_KEY;

export const getRouteForMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findById(matchId).populate('donation recipient');
    if (!match) return res.status(404).json({ message: 'Match not found' });

    const start = [match.donation.location.lng, match.donation.location.lat];
    const end = [match.recipient.location.lng, match.recipient.location.lat];

    const response = await axios.post(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      {
        coordinates: [start, end],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data.routes[0];
    match.route = {
      distance_km: data.summary.distance / 1000,
      duration_min: data.summary.duration / 60,
      polyline: data.geometry,
    };
    await match.save();

    res.json({
      matchId: match._id,
      donationLocation: match.donation.location,
      recipientLocation: match.recipient.location,
      route: match.route,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
