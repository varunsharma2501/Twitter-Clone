import express from 'express' 
import { awakenTheServer } from '../controllers/awakenTheServerController.js' 


const router = express.Router(); 


router.get('/awaken-the-server', awakenTheServer); 


export default router; 