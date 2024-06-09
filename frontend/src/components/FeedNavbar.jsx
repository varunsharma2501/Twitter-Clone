import React from 'react'

const FeedNavbar = () => {
    return (
        <div className='sticky top-0 w-full min-h-[50px] flex items-center justify-center bg-red-500 border-b-[1px] border-gray-500 select-none'> 
            <h1 className='text-white w-[50%] bg-blue-500 text-center cursor-pointer'> 
                For You 
            </h1>
            <h1 className='text-white w-[50%] bg-green-500 text-center cursor-pointer'> 
                Following 
            </h1>
        </div>
    )
}

export default FeedNavbar