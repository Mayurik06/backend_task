import express from 'express'
import { SignUp } from '../controller/signUp.js';
import { login } from '../controller/login.js';

const router= express.Router();

router.post('/signup',SignUp);
router.post('/login',login)

export default router;