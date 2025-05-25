import express from 'express';
import { explainCode } from '../controllers/explainerController.js';

const router = express.Router();

router.post('/explain', explainCode);

export default router;