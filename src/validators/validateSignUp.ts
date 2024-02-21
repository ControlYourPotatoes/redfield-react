// userRoutes.ts
import express from 'express';
import { validateSignUp } from '../middleware/validateSignUp';

const router = express.Router();

// Assuming you have a controller function for handling sign up
import { signUp } from '../controllers/userController';

// Apply the validation middleware to your signup route
router.post('/signup', validateSignUp, signUp);

export default router;
