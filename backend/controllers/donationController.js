import Donation from '../models/Donation.js';

export const createDonation = async (req, res) => {
  try {
    const { title, description, imageUrl, quantity, location, expiryDate } =
      req.body;

    const donation = new Donation({
      donor: req.user.id, // comes from auth middleware
      title,
      description,
      imageUrl,
      quantity,
      location,
      expiryDate,
    });

    await donation.save();

    res.json({ message: 'Donation created successfully', donation });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAvailableDonations = async (req, res) => {
  try {
    // Only return donations that are still available & not expired
    const now = new Date();
    const donations = await Donation.find({
      status: 'available',
      expiryDate: { $gt: now },
    }).populate('donor', 'name email');

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
