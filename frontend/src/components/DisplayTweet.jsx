import React, { useState } from 'react'

import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
{/* <FcLike /> */}

import Avatar from './Avatar'

import Dummy1 from '../assets/logo.png'


const DisplayTweet = () => {

    const [likeCount, setLikeCount] = useState(0); 

    return (
        <div className='flex px-4 py-3 bg-purple-400 h-auto w-full border-b-[1px] border-gray-500'>
            <div>
                <Avatar heightVal={45} widthVal={45}/> 
            </div>
            <div className='ml-2 flex flex-col w-full h-auto bg-green-500 rounded-lg overflow-hidden'>
                <div className='bg-blue-500'> 
                    <span className='text-white font-semibold py-2'> Elon Musk </span>
                    <span className='text-gray-500 font-regular text-sm'> @elonmusk </span>
                    <span className='text-gray-500'>  &#183; </span>
                    <span className='text-gray-500 text-sm'> 1m </span>
                </div>
                <div className='bg-red-500 py-1 text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores soluta magni sunt illo provident dolorum blanditiis obcaecati natus nam eius. Animi blanditiis quasi laboriosam aliquid praesentium deserunt dolor itaque velit!
                </div>
                <div className='w-full flex items-center justify-center border-[1px] border-gray-500 rounded-xl overflow-hidden'>
                    <img 
                        src={Dummy1} 
                        className='bg-blue-600'
                    />
                </div>
                <div className='bg-gray-500 h-[28px] flex items-center justify-start'>
                    <CiHeart className='inline text-lg text-white mx-2 cursor-pointer hover:bg-red-400/80 rounded-full'/>    
                    <span className='text-white'> {likeCount} </span> 
                </div>
            </div>
        </div>
    )
}

export default DisplayTweet