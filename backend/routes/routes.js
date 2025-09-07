import express from 'express';
import { getRouteForMatch } from '../controllers/routeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/routes/:matchId
router.get('/:matchId', authMiddleware, getRouteForMatch);

export default router;
