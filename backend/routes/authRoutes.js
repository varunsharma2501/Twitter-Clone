import express from 'express' 

import { signUpController, sendOTPController } from '../controllers/authControllers.js' 


const router = express.Router(); 


router.post('/sign-up', signUpController); 
router.post('/send-otp', sendOTPController); 


export default router; 