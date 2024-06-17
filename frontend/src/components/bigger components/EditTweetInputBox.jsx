import React, { useState } from 'react'
import { axiosTokenInstance } from '../../axios/axiosTokenIntsance'
import { useSelector, useDispatch } from 'react-redux' 
import toast from 'react-hot-toast'

import { FaRegImage } from 'react-icons/fa6' 

import { logoutCleanUp } from '../../helpers/logoutCleanUp'
import MiniAvatar from '../small components/MiniAvatar' 
import LoadingSpinner from '../small components/LoadingSpinner' 

import validateInputFields from '../../helpers/validateInputFields'
import { editTweetInRedux } from '../../redux/tweetSlice'

import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'


const EditTweetInputBox = ({editTweetInputBoxProps}) => {
    
    const {
        closeEditATweet, 
        editTweetContent, 
        setEditTweetContent, 
        oldTweetContent, 
        toBeEditedTweetId
    } = editTweetInputBoxProps; 

    const loggedInUserDetails = useSelector(state => state?.user?.loggedInUserDetails); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

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

        validateInputFields('tweet', tweet, {
            setTweetErrorText, 
            setIsTweetErrorTextInvisible 
        }); 

        setEditTweetContent(tweet); 
    }

    const [tweetUpdationLoading, setTweetUpdationLoading] = useState(false); 

    const updateTweet = async (e) => {
        e.preventDefault();
        e.stopPropagation(); 
    
        if(editTweetContent === oldTweetContent){
            toast.error('You have to add something new to input field for editing the tweet, current data is same as existing tweet.')
            return;
        }

        setTweetUpdationLoading(true); 
            
        try{
            dispatch(editTweetInRedux({toBeEditedTweetId, editTweetContent})); 
            closeEditATweet();
            setTweetUpdationLoading(false); 
            const res = await axiosTokenInstance().patch(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/edit-logged-in-user-tweet/${toBeEditedTweetId}`, {
                new_description : editTweetContent
            }); 
            toast.success(res?.data?.message); 
        }
        catch(err){
            console.log(err); 
            setTweetUpdationLoading(false); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        }
    }

    return (
        <div className='absolute bg-black h-full w-full z-30 flex items-center'>
            <div onClick={closeEditATweet} className='absolute top-0 mt-3 cursor-pointer ml-3 mr-4 hover:bg-[#323333]/60 h-[40px] w-[40px] flex items-center justify-center rounded-full'>
                <IoMdArrowBack className='text-white text-2xl rounded-full' />
            </div>
            <div className='flex p-4 h-[280px] w-full border-b-[1px] border-t-[1px] border-gray-500'>
                
                <div className='hidden min-[500px]:block'>
                    <MiniAvatar 
                        userId={loggedInUserDetails?._id}
                        name={loggedInUserDetails?.name}
                        secureImageURL={loggedInUserDetails?.profile_pic}
                        height={48}
                        width={48}
                    /> 
                </div>

                <div className='ml-2 w-full h-full rounded-lg'>
                    <form onSubmit={updateTweet} className='h-full w-full'>
                        
                        <textarea
                            maxLength={280} 
                            required 
                            name='tweetPost' 
                            id='tweetEditPost' 
                            value={editTweetContent}
                            onChange={handleTweetInput}
                            className='resize-none h-[170px] w-full pt-2 pb-3 pl-1 pr-1 rounded-lg bg-transparent text-xl text-white outline-none caret-white overflow-y-auto scrollbar'
                            placeholder='What is happening?!' 
                        >
                        </textarea>

                        <div className='flex justify-center items-center'>
                            <div className='pt-[1px] w-[100%] rounded-full bg-gray-500'></div>
                        </div>

                        <h1 className={`${isTweetErrorTextInvisible ? 'hidden' : 'flex'} m-1 select-none text-red-500 text-sm w-full text-center`}>
                            {tweetErrorText}
                        </h1>

                        {/* <div className='flex justify-between items-center'> */}
                        <div className='flex justify-end items-center'>
                            {/* <button className='h-[35px] w-[35px] flex items-center rounded-full hover:bg-[#323333]/60 justify-center bg-transparent cursor-pointer'>
                            <FaRegImage className='text-xl text-[#1d9bf0]' />
                            </button> */}
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
                                    !tweetUpdationLoading && 
                                        <button disabled={isPostTweetButtonDisabled || !isTweetErrorTextInvisible || tweetUpdationLoading} type='submit' className={'h-[32px] min-w-[60px] m-[6px] rounded-full flex items-center justify-center ' + `${ (isPostTweetButtonDisabled || !isTweetErrorTextInvisible || tweetUpdationLoading) ? 'bg-[#323333]/60' : 'bg-[#1d9bf0] cursor-pointer hover:bg-blue-500' }`}> 
                                            <p className='text-white px-2'>
                                                Post 
                                            </p>
                                        </button>
                                }
                                {   
                                    tweetUpdationLoading &&     
                                        <div className='h-[32px] min-w-[60px] m-[6px] flex justify-center items-center'>
                                            <LoadingSpinner />
                                        </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTweetInputBox