import nodemailer from 'nodemailer' 


export const signUpController = async (req, res) => {
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


export const sendOTPController = async (req, res) => {
    try{
        const {email, name} = req.body; 
        const otp = `${Math.floor(100000 + Math.random() * 900000)}` 

        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: `${process.env.SENDER_EMAIL}`,
                pass: `${process.env.SENDER_EMAIL_APP_PASSWORD}`
            }
        });

        const mailDetails = {
            from: `${process.env.SENDER_EMAIL}`,
            to: email,
            subject: 'Twitter Clone OTP Verification',
            html: 
                `   
                     <div style="background-color: black; border-radius: 10px; width: 290px; height:290px;">
                        <div>
                            <h1 style="color: white; text-align: center; margin-bottom: 10px; padding-top: 38px;"> Suppp!!! </h1>
                            <h1 style="color: white; margin-bottom: 30px; margin-top: 0px; padding: 0px; text-align: center; font-family: sans; color: #23c560;"> ${name} </h1>
                            <h2 style="color: white; text-align: center; margin-bottom: 10px;"> Here's your OTP for verifying your G-mail </h2>
                            <h1 style="color: #1d9bf0; text-align: center; margin-top: 10px;"> ${otp} </h1>
                        </div>
                    <div>
                `
        };

        mailTransporter.sendMail(mailDetails, (err, data) => {
            if(err){
                console.log(err);
                res.status(500).json({
                    message : 'OTP sending process failed due to internal server error',
                    success : false 
                });
            }
            else{
                res.status(200).json({
                    message : 'OTP sent successfully on given G-mail',
                    success : true,
                    otp
                })
            }
        });
    }
    catch(err){
        console.log(`Error occured while sending email: ${err.message}`); 
        res.status(500).json({
            message : 'Internal server error',
            error : true 
        })
    }
}