import express from 'express';
import {
  acceptDonation,
  getRecipientMatches,
  updateMatchStatus,
} from '../controllers/matchController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/matches/:donationId/accept
router.post('/:donationId/accept', authMiddleware, acceptDonation);

// GET /api/matches
router.get('/', authMiddleware, getRecipientMatches);

// PATCH /api/matches/:matchId
router.patch('/:matchId', authMiddleware, updateMatchStatus);

export default router;
