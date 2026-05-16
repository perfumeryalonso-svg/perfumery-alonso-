import express from 'express';
import { getPerfumes, getPerfumeById, getPerfumesByCategory, createPerfume, updatePerfume, deletePerfume } from '../controllers/perfumeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPerfumes);
router.get('/category/:categoria', getPerfumesByCategory);
router.get('/:id', getPerfumeById);

// Protected routes (admin only)
router.post('/', authMiddleware, createPerfume);
router.put('/:id', authMiddleware, updatePerfume);
router.delete('/:id', authMiddleware, deletePerfume);

export default router;
