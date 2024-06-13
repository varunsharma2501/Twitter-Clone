import tweetModel from "../models/tweetModel.js";
import userModel from "../models/userModel.js";


export const createTweet = async (req, res) => {
    try{
        const {description} = req.body; 
        const loggedInUser = req.body.user; 

        if(!description){
            return res.status(400).json({
                message : 'Bad backend call, description field is required', 
                success : false 
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(loggedInUser._id, {
                $inc : { tweetsCount : 1} 
            },
            { new: true }   // returns the updated document because of this option 
        ); 

        if(!updatedUser){
            return res.status(500).json({
                message : "User not found", 
                error : true 
            }) 
        }

        const tweetPayload = {
            description, 
            userId : loggedInUser._id, 
        }

        const tweet = new tweetModel(tweetPayload); 
        const savedTweet = await tweet.save(); 

        return res.status(201).json({
            message : 'Tweet created successfully',
            data : savedTweet, 
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while creating tweet in tweetController ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const deleteTweet = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        const {tweet_id} = req.params; 

        if(!tweet_id || tweet_id === ':tweet_id'){
            return res.status(400).json({
                messsage : 'Bad backend call, tweet_id params cannot be empty', 
                error : true 
            })
        }

        const tweet = await tweetModel.findById(tweet_id); 

        if(tweet.userId.toString() !== loggedInUser._id.toString()){
            return res.status(400).json({
                message : "You cannot delete someone else's tweet",
                success : false 
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(loggedInUser._id, {
                $inc : { tweetsCount : -1} 
            },
            { new: true } 
        )

        if(!updatedUser){
            return res.status(500).json({
                message : "User not found", 
                error : true 
            }) 
        }

        await tweetModel.findByIdAndDelete(tweet_id); 

        return res.status(200).json({
            message : 'Tweet deleted successfully', 
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while deleting tweet in tweetController ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const editLoggedInUserTweet = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        const {tweet_id} = req.params; 
        
        if(!tweet_id || tweet_id === ':tweet_id'){
            return res.status(400).json({
                messsage : 'Bad backend call, tweet_id params cannot be empty', 
                error : true 
            })
        }

        const tweet = await tweetModel.findById(tweet_id); 
        if(tweet.userId.toString() !== loggedInUser._id.toString()){
            return res.status(400).json({
                message : "You're trying to edit a tweet which doesn't belong to the logged in user",
                success : false 
            })
        }

        const newDescription = req.body.new_description; 
        await tweetModel.findByIdAndUpdate(tweet_id, {
            description : newDescription 
        })

        return res.status(200).json({
            message : 'Tweet edited successfully',
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while editing tweet in tweetController ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const likeOrDislike = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        const tweet_id = req.params.tweet_id; 

        if(!tweet_id || tweet_id === ':tweet_id'){
            return res.status(400).json({
                messsage : 'Bad backend call, tweet_id params cannot be empty', 
                error : true 
            })
        }

        const tweet = await tweetModel.findById(tweet_id); 
        if(tweet.likes.includes(loggedInUser._id)){
            await tweetModel.findByIdAndUpdate(tweet_id, {
                $pull : {
                    likes : loggedInUser._id
                }
            })
            return res.status(200).json({
                message : "Tweet disliked successfully" 
            })
        }
        else{
            await tweetModel.findByIdAndUpdate(tweet_id, {
                $push : {
                    likes : loggedInUser._id
                }
            })
            return res.status(200).json({
                message : "Tweet liked successfully" 
            })
        }
    }
    catch(err){
        console.log(`Error occured while liking or disliking tweet in tweetController ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const getAllTweetsOfUser = async (req, res) => {
    try{ 
        const {user_id} = req.params; 

        if(!user_id || user_id === ':user_id'){
            return res.status(400).json({
                messsage : 'Bad backend call, tweet_id params cannot be empty', 
                error : true 
            })
        }

        const allTweetsOfUser = await tweetModel.find({
            userId : user_id 
        }).populate('userId', '-password').sort({ createdAt: -1 }); 

        return res.status(200).json({
            message : "Retrieved all tweets of requested user successfully", 
            data : allTweetsOfUser, 
            success : true 
        }); 
    }
    catch(err){
        console.log(`Error occured in tweetController while getting all tweets of requested particular user: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const getAllTweetsOfUsersWhoAreFollowedByLoggedInUser = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        const followingUsers = loggedInUser.following; 
        
        const tweetsOfAllUsersWhoAreFollowedByLoggedInUser =  await tweetModel.find({
            userId: { $in: followingUsers }
        }).populate('userId', '-password').sort({ createdAt: -1 });    
        
        return res.status(200).json({
            message : 'Successfully retrieved tweets of all users who are followed by logged in user', 
            data : tweetsOfAllUsersWhoAreFollowedByLoggedInUser, 
            success : true, 
        })
    }
    catch(err){
        console.log(`Error occured in tweetController while getting all tweets of users which are followed by logged in user: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const getAllExistingTweets = async (req, res) => { 
    try{
        const allTweetsExceptLoggedInUserTweets = await tweetModel.find().populate('userId', '-password').sort({ createdAt: -1 }); 
        return res.status(200).json({
            message : 'Retrieved all existing tweets successfully', 
            data : allTweetsExceptLoggedInUserTweets, 
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured in tweetController while getting all existing tweets of users excpet logged in user tweets: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}