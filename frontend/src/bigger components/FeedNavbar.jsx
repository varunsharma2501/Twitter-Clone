import React from 'react'

const FeedNavbar = () => {
    return (
        <div className='sticky top-0 w-full min-h-[50px] flex items-center justify-center border-b-[1px] border-gray-500 select-none backdrop-blur-lg'> 
            <div className='relative w-[50%] h-full flex items-center justify-center cursor-pointer hover:bg-[#323333]/60'>
                <h1 className='text-white'> 
                    For You 
                </h1>
                <div className='absolute bottom-0 bg-blue-500 pt-1 w-[56px] rounded-full'></div>
            </div>
            <div className='w-[50%] h-full flex items-center justify-center cursor-pointer hover:bg-[#323333]/60'>
                <h1 className='text-white'> 
                    Following 
                </h1>
                <div className='hidden absolute bottom-0 bg-blue-500 pt-1 w-[70px] rounded-full'></div>
            </div>
        </div>
    )
}

export default FeedNavbar