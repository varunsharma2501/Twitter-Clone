import mongoose from 'mongoose' 


const tweetSchema = new mongoose.Schema({
    description : {
        type : String, 
        required : true 
    },
    like : {
        type : Array, 
        default : []
    },
    userId : {
        type : mongoose.Schema.ObjectId, 
        ref : 'user'
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