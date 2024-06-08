import express from 'express' 

import { signUp } from '../controllers/authControllers.js' 


const router = express.Router(); 


router.get('/sign-up', signUp);



export default router; 