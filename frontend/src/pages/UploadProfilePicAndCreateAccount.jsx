import React, { useState, useEffect, useRef } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom' 
import axios from 'axios' 
import toast from 'react-hot-toast' 

import { IoClose } from 'react-icons/io5' 
import { FaRegImage } from 'react-icons/fa6' 
import { RxCross2 } from 'react-icons/rx' 

import TwitterLogo from '../assets/logo.png' 
import Avatar from '../components/small components/Avatar' 
import LoadingSpinner from '../components/small components/LoadingSpinner' 
import uploadProfilePicToCloudinary from '../cloudinary/uploadProfilePicToCloudinary' 


const UploadProfilePicAndCreateAccount = () => {

    const navigate = useNavigate(); 

    const location = useLocation(); 
    const {name, email, username, password} = location.state; 
    const splittedName = name.split(' ');

    const [data, setData] = useState({ 
        name, 
        email, 
        username, 
        password, 
        profile_pic : '', 
        cloudinary_img_public_id : '' 
    }); 

    const imageInputRef = useRef(); 

    const [uploadPic, setUploadPic] = useState({}); 
    const [cloudinaryImgPublicID, setCloudinaryImgPublicID] = useState(''); 

    const [imageUploadOrDeleteLoading, setImageUploadOrDeleteLoading] = useState(false); 

    
    const handleUploadPic = async (e) => {
        
        e.preventDefault(); 
        e.stopPropagation(); 

        setImageUploadOrDeleteLoading(true); 
        const pic = e.target.files[0]; 

        setUploadPic(pic); 
        
        try{
            const uploadedPic = await uploadProfilePicToCloudinary(pic); 

            if(uploadedPic?.error?.message){
                imageInputRef.current.value = ''; 
                setUploadPic({}); 
                setData({
                    ...data,
                    profile_pic : '',
                    cloudinary_img_public_id : ''
                })
                setImageUploadOrDeleteLoading(false); 
                return; 
            }

            setCloudinaryImgPublicID(uploadedPic?.public_id); 

            setData({
                ...data, 
                profile_pic : uploadedPic?.secure_url, 
                cloudinary_img_public_id : uploadedPic?.public_id 
            })

            setImageUploadOrDeleteLoading(false); 
        }
        catch(err){
            if(err?.response?.data?.message){
                toast.error(err?.response?.data?.message); 
            }
            else{
                toast.error('Something went wrong'); 
            }
            setImageUploadOrDeleteLoading(false); 
            navigate('/');
            console.log(err); 
        }
    }

    const removePic = async (e) => {

        e.preventDefault();
        e.stopPropagation(); 
        
        setImageUploadOrDeleteLoading(true);

        if(data.profile_pic !== ''){
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                ...data,
                profile_pic : '',
                cloudinary_img_public_id : ''
            })
        }

        try{
            if(cloudinaryImgPublicID !== ''){
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cloudinary/asset/${cloudinaryImgPublicID}`)
                toast.success(response?.data?.message); 
            }
            setCloudinaryImgPublicID(''); 
            setImageUploadOrDeleteLoading(false);
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            setImageUploadOrDeleteLoading(false);
            console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
        }
    }


    const [accountCreationLoading, setAccountCreationLoading] = useState(false); 

    const handleAccountCreation = (e) => {

        e.preventDefault();
        e.stopPropagation(); 
        
        setAccountCreationLoading(true); 
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`, data)
        .then( (response) => {
            
            toast.success(response?.data?.message); 

            imageInputRef.current.value = ''; 
            setUploadPic({});
            setCloudinaryImgPublicID(''); 
            setData({ 
                name, 
                email, 
                username, 
                password, 
                profile_pic : '', 
                cloudinary_img_public_id : '' 
            });    
            
            navigate('/login-email'); 
        })
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            setAccountCreationLoading(false); 
            console.log(`Error occured while calling api for signing up user: ${err}`); 
        }) 
    }
    
    const cleanUpFunction = async (e) => {
        
        if(imageUploadOrDeleteLoading){
            e.preventDefault();
            toast.error('You cannot navigate away from Sign Up page when profile pic is getting uploaded or deleted'); 
            return;
        }
        
        if(data.profile_pic !== ''){
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({ 
                name, 
                email, 
                username, 
                password, 
                profile_pic, 
                cloudinary_img_public_id : cloudinaryImgPublicID  
            });  
        }

        try{
            if(cloudinaryImgPublicID !== ''){
                navigate('/'); 
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cloudinary/asset/${cloudinaryImgPublicID}`)
                setCloudinaryImgPublicID(''); 
            }
            else{
                navigate('/'); 
            }
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
        }
    }
    
    const [isCreateAccountButtonDisabled, setIsCreateAccountButtonDisabled] = useState(true); 

    useEffect( () => {
        if(!imageUploadOrDeleteLoading){
            setIsCreateAccountButtonDisabled(false); 
        }
        else{
            setIsCreateAccountButtonDisabled(true); 
        }
    }, [imageUploadOrDeleteLoading]); 


    return (
        <section className='relative h-screen w-screen bg-[#242d34]'> 
            <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-screen w-screen sm:h-[600px] sm:rounded-2xl sm:w-[600px] bg-black overflow-hidden'>
                <div className='relative flex h-[50px]'>
                    {
                        !accountCreationLoading && 
                        <button onClick={cleanUpFunction} className='absolute h-8 w-8 top-2 left-2 rounded-full flex justify-center items-center hover:bg-[#323333]/60 cursor-pointer'>
                            <RxCross2 className='text-xl text-white'/>
                        </button>
                    }
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
                            <h1 className='mt-8 mb-8 h-[60px] w-[500px] text-3xl sm:text-4xl font-semibold text-white px-5'>
                                Upload Profile Pic if you want one <span className='text-[#1d9bf0]'> {splittedName[0]} </span>
                            </h1> 
                        </div>
                        <div className='w-full h-auto flex justify-center items-center'>
                            <Avatar 
                                name = {name}
                                secureImageURL = {data?.profile_pic}
                                height = {240}
                                width = {240}
                            />
                        </div>
                        <form onSubmit={handleAccountCreation} className='flex flex-col items-center w-full'>
                            <div className='flex flex-col'>
                                <label htmlFor='profile_pic' id='img-upload-label' className='mt-4 file-upload-label h-14 w-72 max-w-72 bg-slate-600 rounded-xl border-2 border-slate-600 hover:border-blue-400 flex justify-center items-center cursor-pointer mx-2'>
                                    {
                                        imageUploadOrDeleteLoading && 
                                        <LoadingSpinner /> 
                                    }
                                    {
                                        !imageUploadOrDeleteLoading &&
                                        <>
                                            <p className='text-sm text-white font-sans max-width-[260] pl-3 overflow-hidden flex gap-2 justify-center items-center'> 
                                                {uploadPic?.name ? uploadPic.name : 'Click Here to Upload'} 
                                                {uploadPic?.name ? '' : <FaRegImage />}
                                            </p>
                                            {uploadPic?.name && 
                                                <span disabled={accountCreationLoading || imageUploadOrDeleteLoading} className={`ml-2 mr-2 ${accountCreationLoading ? 'invisible' : 'visible'}`} onClick={removePic}>
                                                    <IoClose className='rounded-xl hover:bg-red-500 text-white' /> 
                                                </span>
                                            }       
                                        </>
                                    }
                                </label>
                            
                                <input
                                    disabled={imageUploadOrDeleteLoading || data.profile_pic !== ''}
                                    ref={imageInputRef}
                                    type='file' 
                                    id='profile_pic'
                                    name='profile_pic'
                                    className='hidden'
                                    onChange={handleUploadPic}
                                />
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <button disabled={isCreateAccountButtonDisabled || accountCreationLoading} className={`mt-5 w-[280px] h-[50px] text-xl font-semibold rounded-full flex items-center justify-center ${isCreateAccountButtonDisabled || accountCreationLoading ? 'bg-gray-600' : 'bg-white hover:bg-[#1d9bf0] hover:text-white select-none'}`}>
                                    {
                                        accountCreationLoading ? 
                                            <LoadingSpinner /> 
                                        :
                                            'Proceed'  
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

export default UploadProfilePicAndCreateAccount