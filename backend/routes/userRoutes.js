import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { getUserDetails } from '../controllers/userController.js'; 

const router = express.Router(); 


router.get('/details', protectRoute, getUserDetails); 


export default router; 