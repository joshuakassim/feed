import Match from '../models/Match.js';
import Donation from '../models/Donation.js';

export const acceptDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const recipientId = req.user.id;

    const donation = await Donation.findById(donationId);
    if (!donation || donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation not available' });
    }

    // Create match
    const match = new Match({
      donation: donation._id,
      recipient: recipientId,
      status: 'pending_pickup',
    });

    await match.save();

    // Update donation status
    donation.status = 'accepted';
    await donation.save();

    res.json({ message: 'Donation accepted successfully', match });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getRecipientMatches = async (req, res) => {
  try {
    const recipientId = req.user.id;
    const matches = await Match.find({ recipient: recipientId })
      .populate('donation')
      .populate('recipient', 'name email');

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateMatchStatus = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    match.status = status;
    await match.save();

    res.json({ message: 'Status updated', match });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
