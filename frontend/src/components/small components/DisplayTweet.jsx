import React, { useState } from 'react'

import { CiHeart } from 'react-icons/ci'
import MiniAvatar from './MiniAvatar'


const DisplayTweet = ({currTweet}) => {

    const [likeCount, setLikeCount] = useState(0); 

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
                    <CiHeart className='inline text-lg text-white mx-2 cursor-pointer hover:bg-red-500/100 rounded-full'/>    
                    <span className='text-white'> {currTweet?.likes?.length} </span> 
                </div>
            </div>
        </div>
    )
}

export default DisplayTweet