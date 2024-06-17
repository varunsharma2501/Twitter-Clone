import userModel from "../models/userModel.js";


export const awakenTheServer = async (req, res) => {
    try{
        const allUsers = await userModel.find(); 
        return res.status(200).json({
            message : 'Server and MongoDB are now totally awake', 
            success :  true 
        })
    }
    catch(err){
        console.log(`Error occured while awakening the server and db: ${err.message}`);
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}