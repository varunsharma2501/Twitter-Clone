import React, { useState } from 'react'

import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
{/* <FcLike /> */}

import Dummy1 from '../assets/logo.png'
import MiniAvatar from './MiniAvatar';


const DisplayTweet = () => {

    const [likeCount, setLikeCount] = useState(0); 

    return (
        <div className='flex px-4 py-3 h-auto w-full border-b-[1px] border-gray-500'>
            <div>
                <MiniAvatar />
            </div>
            <div className='ml-2 flex flex-col w-full h-auto rounded-lg overflow-hidden'>
                <div> 
                    <span className='text-white font-semibold py-2'> Elon Musk </span>
                    <span className='text-gray-500 font-regular text-sm'> @elonmusk </span>
                    <span className='text-gray-500'>  &#183; </span>
                    <span className='text-gray-500 text-sm'> 1m </span>
                </div>
                <div className='py-1 text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores soluta magni sunt illo provident dolorum blanditiis obcaecati natus nam eius. Animi blanditiis quasi laboriosam aliquid praesentium deserunt dolor itaque velit!
                </div>
                <div className='w-full flex items-center justify-center border-[1px] border-gray-500 rounded-xl overflow-hidden mt-1'>
                    <img 
                        src={Dummy1}
                    />
                </div>
                <div className='h-[28px] flex items-center justify-start'>
                    <CiHeart className='inline text-lg text-white mx-2 cursor-pointer hover:bg-red-500/100 rounded-full'/>    
                    <span className='text-white'> {likeCount} </span> 
                </div>
            </div>
        </div>
    )
}

export default DisplayTweet