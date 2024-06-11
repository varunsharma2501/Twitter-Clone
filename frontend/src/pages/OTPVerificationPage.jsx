import React, { useState, useEffect } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom' 
import toast from 'react-hot-toast' 

import validateInputFields from '../input field validation helpers/validateInputFields' 
import LoadingSpinner from '../small components/LoadingSpinner' 



const OTPVerificationPage = () => {
  
    const navigate = useNavigate(); 

    const location = useLocation(); 
    const {name, email, otp} = location.state; 

    const [inputOtp, setInputOtp] = useState(''); 

    const [isOtpErrorTextInvisible, setIsOtpErrorTextInvisible] = useState(true);  
    const [otpErrorText, setOtpErrorText] = useState('Display Otp Error Text'); 

    const handleChange = (e) => {
        const value = e.target.value; 
        validateInputFields('otp', value, {
            setIsOtpErrorTextInvisible,
            setOtpErrorText
        })
        setInputOtp(value); 
    }

    const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(true); 

    useEffect( () => {
        if(isOtpErrorTextInvisible){
            setIsVerifyButtonDisabled(false); 
        }
        else{
            setIsVerifyButtonDisabled(true); 
        }
    }, [isOtpErrorTextInvisible]); 


    const [verifyingOtpLoading, setVerifyingOtpLoading] = useState(false); 

    const verifyEmail = (e) => {

        e.preventDefault(); 
        e.stopPropagation(); 

        setVerifyingOtpLoading(true); 
        
        if(otp === inputOtp){
            toast.success('Email verified successfully'); 
            setVerifyingOtpLoading(false); 
            navigate('/enter-username-and-password', {
                state : {
                    name,
                    email 
                }
            }); 
        }
        else{
            setVerifyingOtpLoading(false); 
            toast.error("Please try again, you've entered wrong OTP"); 
        }
    }

    const [minutes, setMinutes] = useState(1); 
    const [seconds, setSeconds] = useState(59); 

    useEffect( () => {
        const intervalId = setInterval( () => {
            if(seconds > 0){
                setSeconds(seconds-1);
            }
            else if(seconds === 0){
                if(minutes === 0){
                    toast.error("You were unable to enter OTP under 2 mins. That's why session expired, please try again"); 
                    navigate('/'); 
                    clearInterval(intervalId); 
                }
                else{
                    setSeconds(59); 
                    setMinutes(minutes-1); 
                }
            }
        }, 1000)

        return () => {
            clearInterval(intervalId); 
        }
    }, [seconds])

    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div className='w-full flex justify-center items-center'>
                <h1 className='mt-10 h-[60px] w-[500px] text-3xl sm:text-4xl font-semibold text-white px-5 flex justify-start items-center'>
                    We sent you a code  
                </h1>
            </div>
            <div className='w-full flex justify-center items-center'>
               <h3 className='mt-2 h-[20px] w-[500px] text-sm sm:text-md text-gray-500 px-5 flex justify-start items-center'> Enter it below to verify {email} </h3>
            </div>
            <form onSubmit={verifyEmail} className='flex flex-col items-center w-full'>
                <div className='w-full flex justify-center items-center'>
                    <label htmlFor='name' className='mt-10 pl-5 w-[500px] text-white h-10 text-2xl pr-6 flex items-center'>
                        Verification Code 
                    </label>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <input 
                        disabled={verifyingOtpLoading}
                        name='name' 
                        type='text' 
                        id='name' 
                        value={inputOtp} 
                        onChange={handleChange} 
                        maxLength={"6"}
                        className={`mt-2 h-[50px] w-[500px] px-4 py-2 mx-5 rounded-md border-2 border-gray-500 bg-black outline-none text-white text-lg focus:border-[#1d9bf0] focus:border-[3px] ${isOtpErrorTextInvisible ? '' : 'focus:border-red-500 border-red-500'}`}
                        placeholder='Enter you verification code here' 
                        required 
                    />
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className={`text-[15px] text-red-500 pl-2 pr-1 mx-5 font-mono rounded-md mt-2 w-[490px] ${isOtpErrorTextInvisible && 'invisible'}`}>
                        {otpErrorText}
                    </div> 
                </div>
                <div className='mt-7 w-full flex justify-center items-center'>
                    <div className='h-[45px] w-[125px] bg-zinc-800 rounded-2xl flex justify-center items-center'>
                        <span className='text-white text-3xl'> {`0${minutes} :`} {seconds < 10 ? `0${seconds}` : `${seconds}`} </span> 
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <button disabled={isVerifyButtonDisabled || verifyingOtpLoading} className={`mt-10 w-[280px] h-[50px] text-xl font-semibold rounded-full flex items-center justify-center ${isVerifyButtonDisabled || verifyingOtpLoading ? 'bg-gray-600' : 'bg-white hover:bg-[#1d9bf0] hover:text-white'}`}>
                        {
                            verifyingOtpLoading ? 
                                <LoadingSpinner /> 
                            :
                                'Verify Email'  
                        }
                    </button>
                </div>
            </form>
      </div>
    )
}

export default OTPVerificationPage