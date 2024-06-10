import express from 'express' 

import { validateNonExistenceOfEmailInDB, sendOTP, validateNonExistenceOfUsernameInDB, signUp, checkEmailForLogin, checkPasswordAndLogin } from '../controllers/authControllers.js' 


const router = express.Router(); 


router.post('/validate-non-existence-of-email-in-db', validateNonExistenceOfEmailInDB); 
router.post('/send-otp', sendOTP); 
router.post('/validate-non-existence-of-username-in-db', validateNonExistenceOfUsernameInDB); 

router.post('/sign-up', signUp); 

router.post('/login/checkemail', checkEmailForLogin); 
router.post('/login/checkpassword', checkPasswordAndLogin); 


export default router; 