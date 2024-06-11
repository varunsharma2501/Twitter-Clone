import React, { useState, useEffect } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom' 
import axios from 'axios' 
import toast from 'react-hot-toast' 

import { FiEye, FiEyeOff } from 'react-icons/fi' 

import validateInputFields from '../input field validation helpers/validateInputFields' 
import LoadingSpinner from '../small components/LoadingSpinner' 


const EnterUsernameAndPassword = () => {
    
    const navigate = useNavigate(); 

    const location = useLocation(); 
    const {name, email} = location.state; 

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
 
    const [isUsernameErrorTextInvisible, setIsUsernameErrorTextInvisible] = useState(true);  
    const [usernameErrorText, setUsernameErrorText] = useState('Display Username Error Text'); 
    
    const [isPasswordErrorTextInvisible, setIsPasswordErrorTextInvisible] = useState(true);  
    const [passwordErrorText, setPasswordErrorText] = useState('Display Password Error Text'); 

    const handleChange = (e) => {
        const value = e.target.value; 
        if(e.target.name === 'username'){
            validateInputFields('username', value, {
                setIsUsernameErrorTextInvisible,
                setUsernameErrorText
            }); 
            setUsername(value); 
        }
        if(e.target.name === 'password'){
            validateInputFields('password', value, {
                setIsPasswordErrorTextInvisible,
                setPasswordErrorText
            }); 
            setPassword(value); 
        }
    }

    const [isProceedButtonDisabled, setIsProceedButtonDisabled] = useState(true); 

    useEffect( () => {
        if(isUsernameErrorTextInvisible && isPasswordErrorTextInvisible){
            setIsProceedButtonDisabled(false); 
        }
        else{
            setIsProceedButtonDisabled(true); 
        }
    }, [isUsernameErrorTextInvisible, isPasswordErrorTextInvisible]); 


    const [formSubmissionLoading, setFormSubmissionLoading] = useState(false); 

    const handleFormSubmission = (e) => {

        e.preventDefault(); 
        e.stopPropagation(); 

        setFormSubmissionLoading(true); 

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/validate-non-existence-of-username-in-db`, {
            username
        })
        .then( (res) => {
            toast.success(res?.data?.message); 
            setFormSubmissionLoading(false); 
            navigate('/upload-profile-pic-and-create-account', {
                state : {
                    name,
                    email,
                    username,
                    password
                }
            }); 
        })
        .catch( (err) => {
            if(err?.response?.status === 400){
                console.log(err); 
                setFormSubmissionLoading(false); 
                toast.error(err?.response?.data?.message);
            } 
            else if(err?.response?.status === 500){
                console.log(err); 
                setFormSubmissionLoading(false); 
                toast.error(err?.response?.data?.message);
                navigate('/'); 
            }
        })
    }
    
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const eyeIcon = passwordVisible ? <FiEye /> : <FiEyeOff />; 
    const passwordInputFieldType = passwordVisible ? 'text' : 'password'; 

    const toggleEye = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true); 
    }

    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div className='w-full h-auto flex justify-center items-center'>
                <h1 className='mt-6 mb-8 h-[60px] w-[500px] text-3xl sm:text-4xl font-semibold text-white px-5'>
                    Decide username and set password <span className='text-[#1d9bf0]'> {name} </span>
                </h1>
            </div>
            <form onSubmit={handleFormSubmission} className='flex flex-col items-center w-full'>
                <div className='w-full flex justify-center items-center'>
                    <label htmlFor='name' className='mt-10 pl-4 w-[500px] text-white h-10 text-2xl pr-6 flex items-center'>
                        Username
                    </label>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className='relative mx-5 mt-2 w-[500px] h-[50px] flex justify-center items-center'>
                        <span className='text-white absolute left-4 top-[12px]'> @ </span>
                        <input 
                            disabled={formSubmissionLoading}
                            name='username' 
                            type='text' 
                            id='username' 
                            value={username} 
                            onChange={handleChange} 
                            className={`h-[50px] w-full pl-10 pr-4 py-2 rounded-md border-2 border-gray-500 bg-black outline-none text-white text-lg focus:border-[#1d9bf0] focus:border-[3px] ${isUsernameErrorTextInvisible ? '' : 'focus:border-red-500 border-red-500'}`}
                            placeholder='Enter your username here' 
                            required 
                        />
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className={`text-[15px] text-red-500 pl-2 pr-1 mx-5 font-mono rounded-md mt-2 w-[490px] ${isUsernameErrorTextInvisible && 'invisible'}`}>
                        {usernameErrorText}
                    </div> 
                </div>
                <div className='w-full flex justify-center items-center'>
                    <label htmlFor='email' className='mt-5 pl-5 w-[500px] text-white h-10 text-2xl pr-6 flex items-center select-none'>
                        Password 
                    </label>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className='relative mx-5 mt-2 w-[500px] h-[50px] flex justify-center items-center'>
                        <input 
                            disabled={formSubmissionLoading}
                            name='password' 
                            type={passwordInputFieldType}
                            id='password' 
                            value={password} 
                            onChange={handleChange} 
                            className={`h-[50px] w-full px-4 pl-2 pr-12 rounded-md border-2 border-gray-500 bg-black outline-none focus:border-[#1d9bf0] focus:border-[3px] text-white text-lg ${isPasswordErrorTextInvisible ? '' : 'focus:border-red-500 border-red-500'}`}
                            placeholder='Enter your password here' 
                            required 
                        />
                        <span onClick={toggleEye} className='absolute top-[14px] right-4 cursor-pointer p-1 rounded-full text-white'> 
                            {eyeIcon} 
                        </span>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className={`text-[15px] text-red-500 pl-2 pr-1 mx-5 font-mono rounded-md mt-2 w-[490px] ${isPasswordErrorTextInvisible && 'invisible'}`}>
                        {passwordErrorText}
                    </div>
                </div> 
                <div className='w-full flex justify-center items-center'>
                    <button disabled={isProceedButtonDisabled || formSubmissionLoading} className={`mt-8 w-[280px] h-[50px] text-xl font-semibold rounded-full flex items-center justify-center ${isProceedButtonDisabled || formSubmissionLoading ? 'bg-gray-600' : 'bg-white hover:bg-[#1d9bf0] hover:text-white select-none'}`}>
                        {
                            formSubmissionLoading ? 
                                <LoadingSpinner /> 
                            :
                                'Proceed'  
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EnterUsernameAndPassword