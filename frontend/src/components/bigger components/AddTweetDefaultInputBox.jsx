import React, { useEffect, useState } from 'react'
import { axiosTokenInstance } from '../../axios/axiosTokenIntsance'
import { useSelector, useDispatch } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// import { FaRegImage } from 'react-icons/fa6' 

import { logoutCleanUp } from '../../helpers/logoutCleanUp'
import { getTweetSliceRefresh } from '../../redux/tweetSlice'
import { increaseTweetsCount } from '../../redux/userSlice'

import MiniAvatar from '../small components/MiniAvatar' 
import LoadingSpinner from '../small components/LoadingSpinner' 
import { navigateToProfilePage } from '../../helpers/navigationUtils' 
import validateInputFields from '../../helpers/validateInputFields'


const AddTweetDefaultInputBox = () => {
  
    const loggedInUserDetails = useSelector(state => state?.user?.loggedInUserDetails); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const [tweetContent, setTweetContent] = useState(''); 
    const [charCount, setCharCount] = useState(0); 

    const [tweetErrorText, setTweetErrorText] = useState('Display tweet error text'); 
    const [isTweetErrorTextInvisible, setIsTweetErrorTextInvisible] = useState(true); 

    const [isPostTweetButtonDisabled, setIsPostTweetButtonDisabled] = useState(true); 

    const handleTweetInput = (e) => {

        const tweet = e.target.value; 
        setCharCount(tweet.length);
        
        if(tweet.length === 0 || tweet.length === 280){
            setIsPostTweetButtonDisabled(true); 
        }
        else{
            setIsPostTweetButtonDisabled(false); 
        }
        
        console.log(tweet);
        validateInputFields('tweet', tweet, {
            setTweetErrorText, 
            setIsTweetErrorTextInvisible 
        }); 

        setTweetContent(tweet); 
    }

    useEffect( () => {
        const autoResize = (event) => {
            const textarea = document.querySelector("#tweetPost"); 
            if(event.target.value === ''){
                textarea.style.height = '45px';
            }
            else{
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        }
        
        const textarea = document.querySelector("#tweetPost");
        textarea.addEventListener('input', autoResize, false);
 
        return () => {
            textarea.removeEventListener('input', autoResize, false);
        }; 
    }, [tweetContent]); 

    const [tweetCreationLoading, setTweetCreationLoading] = useState(false); 

    const createTweet = async (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        setTweetCreationLoading(true); 

        try{
            const res = await axiosTokenInstance().post(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/create`, {
                description : tweetContent 
            })
            setTweetContent(''); 
            toast.success(res?.data?.message); 
            setCharCount(0); 
            setTweetCreationLoading(false); 
            dispatch(increaseTweetsCount()); 
            dispatch(getTweetSliceRefresh()); 
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            setTweetCreationLoading(false); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        }
    }

    return (
        <div className='flex p-4 h-auto w-full border-b-[1px] border-gray-500'>
            
            <div  onClick={ (e) => navigateToProfilePage(e, dispatch, navigate, loggedInUserDetails?._id) } className='cursor-pointer hidden min-[500px]:block'>
                <MiniAvatar 
                    userId={loggedInUserDetails?._id}
                    name={loggedInUserDetails?.name}
                    secureImageURL={loggedInUserDetails?.profile_pic}
                    height={48}
                    width={48}
                /> 
            </div>

            <div className='ml-2 w-full h-auto rounded-lg'>
                <form onSubmit={createTweet} className='h-auto w-full'>
                    
                    <textarea
                        maxLength={280} 
                        required 
                        name='tweetPost' 
                        id='tweetPost' 
                        value={tweetContent}
                        onChange={handleTweetInput}
                        className='resize-none h-[45px] w-full pt-2 pb-3 pl-1 pr-1 rounded-lg bg-transparent text-xl text-white outline-none caret-white overflow-hidden'
                        placeholder='What is happening?!' 
                    >
                    </textarea>

                    <div className='flex justify-center items-center'>
                        <div className='pt-[1px] w-[100%] rounded-full bg-gray-500'></div>
                    </div>

                    <h1 className={`${isTweetErrorTextInvisible ? 'hidden' : 'flex'} m-1 select-none text-red-500 text-sm w-full text-center`}>
                        {tweetErrorText}
                    </h1>

                    <div className='flex justify-end items-center'>
                    {/* <div className='flex justify-between items-center'> */}
                        {/* 
                        <button className='h-[35px] w-[35px] flex items-center rounded-full hover:bg-[#323333]/60 justify-center bg-transparent cursor-pointer'>
                            <FaRegImage className='text-xl text-[#1d9bf0]' />
                        </button> 
                        */}
                        <div className='flex'>
                            <div className='text-white m-1 select-none min-w-[78px] flex items-center justify-center'>
                                <span className={`${charCount === 280 ? 'text-red-500 text-lg' : 'tex-white'} m-1`}>
                                    {charCount} 
                                </span>
                                <span className='text-[#1d9bf0]'>
                                    / 280
                                </span>
                            </div>
                            {
                                !tweetCreationLoading && 
                                    <button disabled={isPostTweetButtonDisabled || !isTweetErrorTextInvisible || tweetCreationLoading} type='submit' className={'h-[32px] min-w-[60px] m-[6px] rounded-full flex items-center justify-center ' + `${ (isPostTweetButtonDisabled || !isTweetErrorTextInvisible || tweetCreationLoading) ? 'bg-[#323333]/60' : 'bg-[#1d9bf0] cursor-pointer hover:bg-blue-500' }`}> 
                                        <p className='text-white px-2'>
                                            Post 
                                        </p>
                                    </button>
                            }
                            {   
                                tweetCreationLoading &&     
                                    <div className='h-[32px] min-w-[60px] m-[6px] flex justify-center items-center'>
                                        <LoadingSpinner />
                                    </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTweetDefaultInputBox