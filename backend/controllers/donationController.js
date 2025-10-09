import Donation from '../models/Donation.js';

/**
 * Creates a new donation listing.
 *
 * Expects the following fields in req.body:
 * - title: String, title of the donation
 * - imageUrl: String, image URL for the donation
 * - quantity: String, quantity of the donation
 * - location: String, location of the donation
 * - expiryDate: Date, expiration date of the donation
 *
 * The donor's ID is taken from req.user.id (set by authentication middleware).
 *
 * Responds with the created donation object.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createDonation = async (req, res) => {
  try {
    const { title, imageUrl, quantity, location, expiryDate } = req.body;

    const donation = new Donation({
      donor: req.user.id,
      title,
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

/**
 * Retrieves all available (not claimed or expired) donations.
 *
 * Only donations with status 'available' and expiryDate in the future are returned.
 * Populates donor field with donor's name and email.
 *
 * Responds with an array of donation objects.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
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

/**
 * Retrieves all donations created by the authenticated donor.
 *
 * The donor's ID is taken from req.user.id.
 *
 * Responds with an array of donation objects.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDonorDonations = async (req, res) => {
  try {
    const id = req.user.id;
    const donations = await Donation.find({ donor: id });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Claims an available donation.
 *
 * Expects donationId in req.params.
 * Only donations with status 'available' can be claimed.
 * Updates the donation's status to 'claimed'.
 *
 * Responds with the updated donation object.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const claimDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation already claimed' });
    }
    donation.status = 'claimed';
    await donation.save();
    res.json({ message: 'Donation claimed successfully', donation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Deletes a donation listing.
 *
 * Expects donationId in req.params.
 * Only the donor who created the donation can delete it.
 *
 * Responds with a success message if deletion is successful.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    if (donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Donation.findByIdAndDelete(donationId);
    res.json({ message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
