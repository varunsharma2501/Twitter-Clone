import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { CiHeart, CiEdit, CiBookmark } from 'react-icons/ci'
import { FcLike } from 'react-icons/fc'
import { MdDelete } from 'react-icons/md';
import { IoBookmark } from 'react-icons/io5'

import { axiosTokenInstance } from '../../axios/axiosTokenIntsance'
import { logoutCleanUp } from '../../helpers/logoutCleanUp'
import { getRefresh } from '../../redux/tweetSlice'
import { useDispatch, useSelector } from 'react-redux'

import MiniAvatar from './MiniAvatar'


const DisplayTweet = ({currTweet, openEditATweet, setEditTweetContent, setOldTweetContent, setToBeEditedTweetId}) => {

    const user = useSelector(store => store.user); 
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(currTweet?.likes?.includes(user?._id)); 
    const [likeCount, setLikeCount] = useState(currTweet?.likes?.length); 

    const handleLikeOrDislike = async (tweet_id) => {
        try{
            if(liked) setLikeCount(likeCount-1); 
            else setLikeCount(likeCount+1); 
            
            setLiked(!liked); 

            const res = await axiosTokenInstance().patch(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/like-or-dislike/${tweet_id}`); 

            toast.success(res?.data?.message); 
            dispatch(getRefresh()); 
        }
        catch(err){
            console.log(err); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        }
    }

    const editTweet = async (currTweet) => {
        openEditATweet();
        setToBeEditedTweetId(currTweet?._id); 
        setEditTweetContent(currTweet?.description);
        setOldTweetContent(currTweet?.description);
    }

    const deleteTweetHandler = async (tweet_id) => {
        try{
            const res = await axiosTokenInstance().delete(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/${tweet_id}`); 
            toast.success(res?.data?.message); 
            dispatch(getRefresh()); 
        }
        catch(err){
            console.log(err); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        }
    }

    const isLoggedInUserTweet = (user._id === currTweet?.userId); 
    const [isBookmarkedByUser, setIsBookMarkedByUser] = useState(user?.bookmarks?.includes(currTweet?._id)); 

    return (
        <div className='flex px-4 py-3 h-auto w-full border-b-[1px] border-gray-500'>
            <div>
                <MiniAvatar 
                    userId={currTweet?.userDetails[0]?._id}
                    name={currTweet?.userDetails[0]?.name}
                    secureImageURL={currTweet?.userDetails[0]?.profile_pic}
                    height={45}
                    width={45}
                />
            </div>
            <div className='ml-2 flex flex-col w-full h-auto rounded-lg overflow-hidden'>
                <div> 
                    <span className='text-white font-semibold py-2'> { currTweet?.userDetails[0]?.name } </span>
                    <span className='text-gray-500 font-regular text-sm'> { `@${currTweet?.userDetails[0]?.username}` } </span>
                    <span className='text-gray-500'>  &#183; </span>
                    <span className='text-gray-500 text-sm'> 1m </span>
                </div>
                <div className='py-1 text-white'>
                    {currTweet?.description} 
                </div>
                {   
                    currTweet?.image && 
                    <div className='w-full flex items-center justify-center border-[1px] border-gray-500 rounded-xl overflow-hidden mt-1'>
                        <img 
                            src={currTweet?.image}
                        />
                    </div>
                }
                <div className='h-[28px] flex items-center justify-start gap-2'>
                    <div className='w-[60px] flex justify-center'>
                        <button onClick={() => handleLikeOrDislike(currTweet?._id)} className='rounded-full h-[20px] w-[20px] mx-2 mt-[2px] flex items-center justify-center'>
                            {
                                liked && 
                                <FcLike />
                            }
                            {
                                !liked && 
                                <CiHeart className='inline text-lg mt-[2px] text-white cursor-pointer hover:text-red-500 rounded-full'/>    
                            }
                        </button>
                        <span className='text-white'> {likeCount} </span> 
                    </div>
                    <div className={`w-[40px] flex justify-center cursor-pointer ${!isLoggedInUserTweet && 'hidden'}`}>
                        <button onClick={ () => editTweet(currTweet) } className='rounded-full h-[24px] w-[24px] hover:bg-[#323333]/60'>
                            <CiEdit className='text-white text-lg rounded-full w-[22px] h-[24px] p-[2px]' />
                        </button>
                    </div>
                    <div className='w-[40px] flex justify-center cursor-pointer'>
                        <button className='rounded-full h-[24px] w-[24px] pl-[0.5px] hover:bg-[#323333]/60'>
                            {   
                                !isBookmarkedByUser && 
                                <CiBookmark className='text-white text-lg rounded-full w-[22px] h-[22px] px-[2px]' />
                            }
                            {
                                isBookmarkedByUser &&
                                <IoBookmark className='text-white text-lg rounded-full w-[22px] h-[22px] px-[2px]' />
                            }
                        </button>
                    </div>
                    <div className={`w-[40px] flex justify-center cursor-pointer ${!isLoggedInUserTweet && 'hidden'}`}>
                        <button onClick={() => deleteTweetHandler(currTweet._id)} className='hover:bg-[#323333]/60 rounded-full h-[24px] w-[24px] pl-[1px]'>
                            <MdDelete className='text-white text-lg mt-[0px] rounded-full w-[22px] h-[24px] px-[2px]' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTweet