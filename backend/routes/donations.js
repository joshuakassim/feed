import express from 'express';
import {
  claimDonation,
  createDonation,
  deleteDonation,
  getAvailableDonations,
  getDonorDonations,
} from '../controllers/donationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/donations
router.post('/', authMiddleware, createDonation);

// GET /api/donations
router.get('/', authMiddleware, getAvailableDonations);

// GET /api/donations/donor
router.get('/donor', authMiddleware, getDonorDonations);

// PUT /api/donations/:donationID/claim
router.put('/:donationId/claim', authMiddleware, claimDonation);

// DELETE /api/donations/:donationId/delete
router.delete('/:donationId/delete', authMiddleware, deleteDonation);

export default router;
