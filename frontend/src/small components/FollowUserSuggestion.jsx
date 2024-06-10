import React from 'react'

import MiniAvatar from './MiniAvatar'


const FollowUserSuggestion = () => {
    return (
        <div className='relative flex py-2  hover:bg-[#323333]/60 cursor-pointer'>
            <div className='ml-3'>
                <MiniAvatar /> 
            </div>
            <div className='flex flex-col ml-2'>
                <span className='text-white font-semibold'> Marvel Studios </span> 
                <span className='text-gray-500 text-sm' > @MarvelStudios </span> 
            </div>
            <button className='absolute right-4 top-4 text-black bg-white text-md rounded-full h-[30px] w-[80px] font-semibold'> 
                Follow 
            </button> 
        </div>
    )
}

export default FollowUserSuggestion