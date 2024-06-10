import express from 'express' 

import { signUpController, sendOTPController, checkUserNameValidityController } from '../controllers/authControllers.js' 


const router = express.Router(); 


router.post('/sign-up', signUpController); 
router.post('/send-otp', sendOTPController); 
router.post('/check-username-validity', checkUserNameValidityController); 


export default router; 