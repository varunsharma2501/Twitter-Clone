import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { createTweet, deleteTweet } from '../controllers/tweetController.js';

const router = express.Router(); 


router.post('/create', protectRoute, createTweet); 
router.delete('/:tweet_id', protectRoute, deleteTweet);


export default router; 