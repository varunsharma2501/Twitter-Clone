import tweetModel from "../models/tweetSchema.js";


export const createTweet = async (req, res) => {
    try{
        const {description} = req.body; 
        const user = req.body.user; 

        if(!description){
            return res.status(400).json({
                message : 'Bad backend call, details field is required', 
                success : false 
            })
        }

        const tweetPayload = {
            description,
            userId : user._id
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
        console.log(`Error occured while creating tweet in tweetControllers ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const deleteTweet = async (req, res) => {
    try{
        const {tweet_id} = req.params; 
        await tweetModel.findByIdAndDelete(tweet_id); 
        return res.status(200).json({
            message : 'Tweet deleted successfully', 
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while deleting tweet in tweetControllers ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}