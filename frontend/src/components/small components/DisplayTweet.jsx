import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { CiHeart } from 'react-icons/ci'
import { FcLike } from 'react-icons/fc'

import { axiosTokenInstance } from '../../axios/axiosTokenIntsance'
import { logoutCleanUp } from '../../helpers/logoutCleanUp'
import { getRefresh } from '../../redux/tweetSlice'
import { useDispatch, useSelector } from 'react-redux'

import MiniAvatar from './MiniAvatar'


const DisplayTweet = ({currTweet}) => {

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
                <div className='h-[28px] flex items-center justify-start'>
                    <button onClick={() => handleLikeOrDislike(currTweet?._id)} className='rounded-full h-[20px] w-[20px] mx-2 flex items-center justify-center'>
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
            </div>
        </div>
    )
}

export default DisplayTweet