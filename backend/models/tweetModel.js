import mongoose from 'mongoose' 


const tweetSchema = new mongoose.Schema({
    description : {
        type : String, 
        required : true 
    },
    image : {
        type : String, 
        default : ""
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'users'
    },
    likes : {
        type : Array, 
        default : []
    }
}, {
    timestamps : true
}); 


const tweetModel = mongoose.model('tweets', tweetSchema); 

export default tweetModel; 