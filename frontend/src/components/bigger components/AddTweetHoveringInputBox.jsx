import React, { useState } from 'react'
import { axiosTokenInstance } from '../../axios/axiosTokenIntsance'
import { useSelector, useDispatch } from 'react-redux' 
import toast from 'react-hot-toast'

import { FaRegImage } from 'react-icons/fa6' 
import { Link } from 'react-router-dom'

import { logoutCleanUp } from '../../helpers/logoutCleanUp'
import MiniAvatar from '../small components/MiniAvatar' 
import { getRefresh } from '../../redux/tweetSlice'

import { IoMdArrowBack } from 'react-icons/io'


const AddTweetHoveringInputBox = ({closeEditATweet, editTweetContent, setEditTweetContent, oldTweetContent, toBeEditedTweetId}) => {
    
    const loggedInUserDetails = useSelector(state => state.user.loggedInUserDetails); 
    const dispatch = useDispatch(); 

    const [charCount, setCharCount] = useState(0); 

    const [errorTextForCharLimitExceeded, setErrortTextForCharLimitExceeded] = useState('No error, Limit Not Excedded'); 

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

        if(tweet.length === 280){
            setErrortTextForCharLimitExceeded('Character limit exceeded'); 
        }
        else{
            setErrortTextForCharLimitExceeded('Limit not exceeded'); 
        }
        setEditTweetContent(tweet); 
    }


    const updateTweet = async (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        if(editTweetContent === oldTweetContent){
            toast.error('You have to add something new to input field for editing the tweet, current data is same as existing tweet.')
            return;
        }

        try{
            const res = await axiosTokenInstance().patch(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/edit-logged-in-user-tweet/${toBeEditedTweetId}`, {
                new_description : editTweetContent
            }); 
            toast.success(res?.data?.message); 
            dispatch(getRefresh()); 
            closeEditATweet();
        }
        catch(err){
            console.log(err); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        }
    }

    return (
        <div className='absolute bg-black h-full w-full z-30 flex items-center'>
            <Link to={'/home'} onClick={closeEditATweet} className='absolute top-0 cursor-pointer ml-3 mr-4 hover:bg-[#323333]/60 h-[40px] w-[40px] flex items-center justify-center rounded-full'>
                <IoMdArrowBack className='text-white text-2xl rounded-full' />
            </Link>
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

                        <h1 className={`m-1 select-none text-red-500 text-sm w-full ${charCount === 280 ? 'flex' : 'hidden'} text-center`}>
                            {errorTextForCharLimitExceeded}
                        </h1>

                        <div className='flex justify-between items-center'>
                            <button className='h-[35px] w-[35px] flex items-center rounded-full hover:bg-[#323333]/60 justify-center bg-transparent cursor-pointer'>
                            <FaRegImage className='text-xl text-[#1d9bf0]' />
                            </button>
                            <div className='flex'>
                                <div className='text-white m-1 select-none min-w-[78px] flex items-center justify-center'>
                                    <span className={`${charCount === 280 ? 'text-red-500 text-lg' : 'tex-white'} m-1`}>
                                        {charCount} 
                                    </span>
                                    <span className='text-[#1d9bf0]'>
                                        / 280
                                    </span>
                                </div>
                                <button disabled={isPostTweetButtonDisabled} type='submit' className={'h-[32px] min-w-[60px] m-[6px] rounded-full ' + `${isPostTweetButtonDisabled ? 'bg-[#323333]/60' : 'bg-[#1d9bf0] cursor-pointer hover:bg-blue-500' }`}> 
                                    <p className='text-white px-2'>
                                        Post 
                                    </p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTweetHoveringInputBox