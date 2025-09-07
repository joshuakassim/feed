import express from 'express';
import {
  createDonation,
  getAvailableDonations,
} from '../controllers/donationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/donations
router.post('/', authMiddleware, createDonation);

// GET /api/donations
router.get('/', authMiddleware, getAvailableDonations);

export default router;
