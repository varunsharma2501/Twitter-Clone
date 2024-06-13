import mongoose from 'mongoose' 


const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true 
    },
    email : {
        type : String, 
        required : true, 
        unique : true 
    },
    username : {
        type : String, 
        required : true, 
        unique : true 
    },
    password : {
        type : String, 
        required : true
    },
    profile_pic : {
        type : String, 
        default : ""
    },
    cloudinary_img_public_id : {
        type : String,
        default : ""
    },
    banner_img : {
        type : String, 
        default : "https://res.cloudinary.com/djdcjkgvc/image/upload/v1718051183/Twitter%20Banner%20Image/pyct9iecnvbvpenzodoa.jpg"
    },
    bio : {
        type : String,
        default : "Heyy!! I am a new user on Twitter"
    },
    tweetsCount : {
        type : Number,
        default : 0
    }, 
    followers : {
        type : Array,
        default : []
    },
    following : {
        type : Array, 
        default : [] 
    },
    bookmarks : {
        type : Array,
        default : []
    }
}, {
    timestamps : true 
}); 


const userModel = mongoose.model('users', userSchema); 

export default userModel; 