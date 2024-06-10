import React, { useState, useEffect } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import { FiEye, FiEyeOff } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import TwitterLogo from '../assets/logo.png'
import Avatar from '../small components/Avatar';
import validateInputFields from '../helpers/validateInputFields' 
import LoadingSpinner from '../small components/LoadingSpinner'; 


const CheckPasswordLoginPage = () => {

    const navigate = useNavigate(); 

    const location = useLocation(); 
    const {name, profile_pic, _id} = location.state; 
    const splitName = name.split(' '); 

    const [password, setPassword] = useState(''); 

    const [isPasswordErrorTextInvisible, setIsPasswordErrorTextInvisible] = useState(true);  
    const [passwordErrorText, setPasswordErrorText] = useState('Display Password Error Text'); 

    const handleChange = (e) => {
        const value = e.target.value; 
        if(e.target.name === 'password'){
            validateInputFields('password', value, {
                setIsPasswordErrorTextInvisible,
                setPasswordErrorText
            }); 
            setPassword(value); 
        }
    }

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true); 

    useEffect( () => {
        if(isPasswordErrorTextInvisible){
            setIsLoginButtonDisabled(false); 
        }
        else{
            setIsLoginButtonDisabled(true); 
        }
    }, [isPasswordErrorTextInvisible]); 


    const [loginLoading, setLoginLoading] = useState(false); 

    const handleLogin = (e) => {

        e.preventDefault(); 
        e.stopPropagation(); 

        setLoginLoading(true); 

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/checkpassword`, {
            password, 
            _id
        })
        .then( (res) => {
            console.log(res?.data);  
            if(res?.data?.success){
                
                toast.success(res?.data?.message); 

				localStorage.setItem('jwt', res?.data?.token); 
				setPassword(''); 

				setLoginLoading(false); 
				navigate('/home'); 
            } 
        })
        .catch( (err) => {
            if(err?.response?.status === 400){
                console.log(err); 
                setLoginLoading(false); 
                toast.error(err?.response?.data?.message);
            } 
            else if(err?.response?.status === 500){
                console.log(err); 
                setLoginLoading(false); 
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

    const handleCut = () => {
        navigate('/'); 
    }

    return (
        <section className='relative h-screen w-screen bg-[#242d34]'> 
            <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-screen w-screen sm:h-[650px] sm:rounded-2xl sm:w-[600px] bg-black overflow-hidden'>
                <div className='relative flex h-[50px]'>
                    <button onClick={handleCut} className='absolute h-8 w-8 top-2 left-2 rounded-full flex justify-center items-center hover:bg-[#323333]/60 cursor-pointer'>
                        <RxCross2 className='text-xl text-white'/>
                    </button>
                    <div className='flex justify-center items-center w-full h-full'>
                        <img 
                            height={40}
                            width={40}
                            src={TwitterLogo}
                        />
                    </div>
                </div>
                
                <div className='h-[calc(100%-50px)] w-full'>
                    
                    <div className='h-full w-full flex flex-col items-center'>
                        <div className='w-full h-auto flex justify-center items-center'>
                            <h1 className='mt-6 mb-9 h-[60px] w-[500px] text-3xl sm:text-4xl font-semibold text-white px-5'>
                                For logging in, please enter your password <span className='text-[#1d9bf0]'> {splitName[0]} </span> 
                            </h1>
                        </div>
                        <div className='w-full h-auto flex justify-center items-center'>
                            <Avatar 
                                name = {name}
                                secureImageURL = {profile_pic}
                                height = {240}
                                width = {240}
                            />
                        </div>
                        <form onSubmit={handleLogin} className='flex flex-col items-center w-full'>
                            <div className='w-full flex justify-center items-center'>
                                <label htmlFor='email' className='mt-1 pl-5 w-[500px] text-white h-10 text-2xl pr-6 flex items-center select-none'>
                                    Password 
                                </label>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <div className='relative mx-5 mt-2 w-[500px] h-[50px] flex justify-center items-center'>
                                    <input 
                                        disabled={loginLoading}
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
                                <button disabled={isLoginButtonDisabled || loginLoading} className={`mt-5 w-[280px] h-[50px] text-xl font-semibold rounded-full flex items-center justify-center ${isLoginButtonDisabled || loginLoading ? 'bg-gray-600' : 'bg-white hover:bg-[#1d9bf0] hover:text-white select-none'}`}>
                                    {
                                        loginLoading ? 
                                            <LoadingSpinner /> 
                                        :
                                            'Login'  
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </section> 
    )
}

export default CheckPasswordLoginPage