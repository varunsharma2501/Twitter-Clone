import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { createTweet, deleteTweet, editLoggedInUserTweet, getAllExistingTweets, getAllTweetsOfLoggedInUser, getAllTweetsOfOtherUser, getAllTweetsOfUsersWhoAreFollowedByLoggedInUser, likeOrDislike } from '../controllers/tweetController.js';

const router = express.Router(); 


router.post('/create', protectRoute, createTweet); 
router.delete('/:tweet_id', protectRoute, deleteTweet);
router.patch('/edit-logged-in-user-tweet/:tweet_id', protectRoute, editLoggedInUserTweet); 

router.patch('/like-or-dislike/:tweet_id', protectRoute, likeOrDislike); 

router.get('/all-tweets-of-logged-in-user', protectRoute, getAllTweetsOfLoggedInUser); 
router.get('/all-tweets-of-other-user/:user_id', protectRoute, getAllTweetsOfOtherUser); 

router.get('/of-users-who-are-followed-by-logged-in-user', protectRoute, getAllTweetsOfUsersWhoAreFollowedByLoggedInUser); 
router.get('/all-existing-tweets', protectRoute, getAllExistingTweets); 


export default router; 