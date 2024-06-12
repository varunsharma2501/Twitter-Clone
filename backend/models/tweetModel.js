import mongoose from 'mongoose' 


const tweetSchema = new mongoose.Schema({
    description : {
        type : String, 
        required : true 
    },
    likes : {
        type : Array, 
        default : []
    },
    userId : {
        type : mongoose.Schema.ObjectId, 
        ref : 'user'
    },
    userDetails : {
        type : Array,
        default : []
    },
    image : {
        type : String, 
        default : ""
    }
}, {
    timestamps : true
}); 


const tweetModel = mongoose.model('tweets', tweetSchema); 

export default tweetModel; 