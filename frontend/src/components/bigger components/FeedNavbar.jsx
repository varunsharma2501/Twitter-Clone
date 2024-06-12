import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const FeedNavbar = () => {
    
    const location = useLocation();

    const feedNav1stDivActive = (location.pathname === '/home'); 
    
    return (
        <div className='sticky top-0 w-full min-h-[50px] flex items-center justify-center border-b-[1px] border-gray-500 select-none backdrop-blur-lg z-30'> 
            <Link to={'/home'} className='relative w-[50%] h-full flex items-center justify-center cursor-pointer hover:bg-[#323333]/60'>
                <h1 className={`${feedNav1stDivActive ? 'text-white font-bold' : 'text-gray-500 font-semibold'}`}> 
                    For You 
                </h1>
                {
                    feedNav1stDivActive && 
                    <div className='absolute bottom-0 bg-blue-500 pt-1 w-[56px] rounded-full'></div>
                }
            </Link>
            <Link to={'/home/tweets-of-people-followed-by-logged-in-user'} className='w-[50%] h-full flex items-center justify-center cursor-pointer hover:bg-[#323333]/60'>
                <h1 className={`${!feedNav1stDivActive ? 'text-white font-bold' : 'text-gray-500 font-semibold'}`}> 
                    Following 
                </h1>
                {
                    !feedNav1stDivActive && 
                    <div className='absolute bottom-0 bg-blue-500 pt-1 w-[70px] rounded-full'></div>
                }
            </Link>
        </div>
    )
}

export default FeedNavbar