import express from 'express' 

import { validateNonExistenceOfEmailInDB, sendOTP, validateNonExistenceOfUsernameInDB, signUp, checkEmailForLogin, checkPasswordAndLogin } from '../controllers/authController.js' 


const router = express.Router(); 


router.post('/validate-non-existence-of-email-in-db', validateNonExistenceOfEmailInDB); 
router.put('/send-otp', sendOTP); 
router.post('/validate-non-existence-of-username-in-db', validateNonExistenceOfUsernameInDB); 

router.post('/sign-up', signUp); 

router.put('/login/checkemail', checkEmailForLogin); 
router.put('/login/checkpassword', checkPasswordAndLogin); 


export default router; 