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
    followers : {
        type : Array,
        default : []
    },
    following : {
        type : Array, 
        default : [] 
    }
}, {
    timestamps : true
}); 


const userModel = mongoose.model('user', userSchema); 

export default userModel; 