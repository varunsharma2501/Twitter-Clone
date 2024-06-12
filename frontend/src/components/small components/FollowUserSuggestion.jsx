import React from 'react'

import MiniAvatar from './MiniAvatar'
import { Link } from 'react-router-dom'


const FollowUserSuggestion = ({currUser}) => {

    return (
        <Link to={`profile/${currUser._id}`}>
            <div className='relative flex py-2  hover:bg-[#323333]/60 cursor-pointer'>
                <div className='ml-3'>
                    <MiniAvatar 
                        userId={currUser?._id}
                        name={currUser?.name}
                        secureImageURL={currUser?.profile_pic}
                        height={45}
                        width={45}
                    /> 
                </div>
                <div className='flex flex-col ml-2'>
                    <span className='text-white font-semibold'> {currUser?.name} </span> 
                    <span className='text-gray-500 text-sm' > @{currUser?.username} </span> 
                </div>
                <button className='absolute right-4 top-4 text-black bg-white text-md rounded-full h-[30px] w-[80px] font-semibold'> 
                    Follow 
                </button> 
            </div>
        </Link>
    )
}

export default FollowUserSuggestion