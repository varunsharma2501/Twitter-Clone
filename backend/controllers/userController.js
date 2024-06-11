import userModel from "../models/userModel.js";


export const getLoggedInUserDetails = (req, res) => {
    try{
        const userDetails = req.body.user; 
        return res.status(200).json({
            data : userDetails,
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while getting user details ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}

export const getOtherUserDetails = async (req, res) => {
    try{
        const {user_id} = req.params; 
        const userDetails = await userModel.findById(user_id); 
        return res.status(200).json({
            data : userDetails,
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while getting user details ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}
    
    
export const getAllOtherUserDetails = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        
        const allUsersExceptCurrentLoggedInUsers = await userModel.find({
            _id : {
                $ne : loggedInUser._id 
            }
        }).select('-password'); 

        return res.status(200).json({ 
            message : "Retrieved data of all other users successfully", 
            data : allUsersExceptCurrentLoggedInUsers, 
            success : true 
        }) 
    }
    catch(err){
        console.log(`Error occured while getting other user details ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
    
}
    
    
export const addOrRemoveTweetFromBookmarks = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        const tweet_id = req.params.tweet_id; 
        if(loggedInUser.bookmarks.includes(tweet_id)){
            await userModel.findByIdAndUpdate(loggedInUser._id, {
                $pull : {
                    bookmarks : tweet_id
                }
            })
            return res.status(200).json({
                message : "Tweet removed from bookmarks successfully" 
            })
        }
        else{
            await userModel.findByIdAndUpdate(loggedInUser._id, {
                $push : {
                    bookmarks : tweet_id
                }
            })
            return res.status(200).json({
                message : "Tweet added to bookmarks successfully" 
            })
        }
    }
    catch(err){
        console.log(`Error occured while adding or removing tweet from bookmarks in userController ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const followOrUnfollowUser = async (req, res) => {
    try{
        const loggedInUser = req.body.user; 
        const toBeFollowedOrUnfollowedUserId = req.params.user_id; 
        const toBeFollowedOrUnfollowedUser = await userModel.findById(toBeFollowedOrUnfollowedUserId); 
        if(!toBeFollowedOrUnfollowedUser.followers.includes(loggedInUser._id)){
            await toBeFollowedOrUnfollowedUser.updateOne({
                $push : {
                    followers : loggedInUser._id
                }
            }); 
            await loggedInUser.updateOne({
                $push : {
                    following : toBeFollowedOrUnfollowedUser._id 
                }
            });
            return res.status(200).json({
                message : `${loggedInUser.name} just started following ${toBeFollowedOrUnfollowedUser.name}`,
                success : true
            })
        }
        else{
            await toBeFollowedOrUnfollowedUser.updateOne({
                $pull : {
                    followers : loggedInUser._id
                }
            }); 
            await loggedInUser.updateOne({
                $pull : {
                    following : toBeFollowedOrUnfollowedUser._id 
                }
            })
            return res.status(200).json({
                message : `${loggedInUser.name} just unfollowed ${toBeFollowedOrUnfollowedUser.name}`, 
                success : true 
            })
        }
    }
    catch(err){
        console.log(`Error occured while following or unfollowing a user in userController ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}