export const signUp = async (req, res) => {
    try{
        res.send({
            "Testing" : "Successfull" 
        })
    }
    catch(err){
        console.log(`An error occured in authController while signing up the user: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true
        }); 
    }
}