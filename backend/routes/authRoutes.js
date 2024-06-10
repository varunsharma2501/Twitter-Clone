import express from 'express' 

import { validateNonExistenceOfEmailInDB, sendOTP, validateNonExistenceOfUsernameInDB, signUp } from '../controllers/authControllers.js' 


const router = express.Router(); 


router.post('/validate-non-existence-of-email-in-db', validateNonExistenceOfEmailInDB); 
router.post('/send-otp', sendOTP); 
router.post('/check-username-validity', validateNonExistenceOfUsernameInDB); 

router.post('/sign-up', signUp); 


export default router; 