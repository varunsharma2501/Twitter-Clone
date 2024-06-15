import React, { useState, useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

import validateInputFields from '../helpers/validateInputFields' 
import LoadingSpinner from '../components/small components/LoadingSpinner' 


const CheckEmailLoginPage = () => {

    const navigate = useNavigate(); 

    const [email, setEmail] = useState(''); 

    const [isEmailErrorTextInvisible, setIsEmailErrorTextInvisible] = useState(true);  
    const [emailErrorText, setEmailErrorText] = useState('Display Email Error Text'); 

    const handleChange = (e) => {
        const value = e.target.value; 
        if(e.target.name === 'email'){
            validateInputFields('email', value, {
                setIsEmailErrorTextInvisible,
                setEmailErrorText
            }); 
            setEmail(value); 
        }
    }

    const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(true); 

    useEffect( () => {
        if(isEmailErrorTextInvisible){
            setIsVerifyButtonDisabled(false); 
        }
        else{
            setIsVerifyButtonDisabled(true); 
        }
    }, [isEmailErrorTextInvisible]); 


    const [verifyEmailLoading, setVerifyEmailLoading] = useState(false); 

    const verifyEmail = (e) => {
        
        e.preventDefault(); 
        e.stopPropagation();

        setVerifyEmailLoading(true); 

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/checkemail`, {
            email 
        }) 
        .then( (res) => { 
            if(res.data.success){ 
                toast.success(res?.data?.message); 
                setVerifyEmailLoading(false); 
                navigate('/login-password', {
                    state : res?.data?.data 
                })
            }
        }) 
        .catch( (err) => {
            if(err?.response?.status === 400){
                console.log(err); 
                toast.error(err?.response?.data?.message);  
                setVerifyEmailLoading(false); 
            }
            else if(err?.response?.status === 500){
                console.log(err); 
                toast.error(err?.response?.data?.message); 
                setVerifyEmailLoading(false); 
                navigate('/'); 
            }
        }) 
    }

    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div className='w-full flex justify-center items-center'>
                <h1 className='mt-20 h-[60px] w-[500px] text-3xl sm:text-4xl font-semibold text-white px-5'>
                    Enter your gmail for <span className='text-[#1d9bf0]'> logging in </span> 
                </h1>
            </div>
            <form onSubmit={verifyEmail} className='flex flex-col items-center w-full'>
                <div className='w-full flex justify-center items-center'>
                    <label htmlFor='email' className='mt-20 pl-5 w-[500px] text-white h-10 text-2xl pr-6 flex items-center'>
                        Gmail
                    </label>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <input 
                        disabled={verifyEmailLoading}
                        name='email' 
                        type='text' 
                        id='email' 
                        value={email} 
                        onChange={handleChange} 
                        className={`mt-2 h-[50px] w-[500px] px-4 py-2 mx-5 rounded-md border-2 border-gray-500 bg-black outline-none focus:border-[#1d9bf0] focus:border-[3px] text-white text-lg ${isEmailErrorTextInvisible ? '' : 'focus:border-red-500 border-red-500'}`}
                        placeholder='Enter your gmail here' 
                        required 
                    />
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className={`text-[15px] text-red-500 pl-2 pr-1 mx-5 font-mono rounded-md mt-2 w-[490px] ${isEmailErrorTextInvisible && 'invisible'}`}>
                        {emailErrorText}
                    </div>
                </div> 
                <div className='w-full flex justify-center items-center'>
                    <button disabled={isVerifyButtonDisabled || verifyEmailLoading} className={`mt-10 w-[280px] h-[50px] text-xl font-semibold rounded-full flex items-center justify-center ${isVerifyButtonDisabled || verifyEmailLoading ? 'bg-gray-600' : 'bg-white hover:bg-[#1d9bf0] hover:text-white'}`}> 
                        {
                            verifyEmailLoading ? 
                                <LoadingSpinner /> 
                            :
                                'Next' 
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CheckEmailLoginPage