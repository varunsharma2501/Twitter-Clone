import express from 'express'; 
import { deleteCloudinaryAsset } from '../controllers/cloudinaryController.js';

const router = express.Router(); 

router.delete('/asset/:upload_preset/:asset_name', deleteCloudinaryAsset); 

export default router;