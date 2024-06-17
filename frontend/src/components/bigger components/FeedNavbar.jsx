import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWhichDivIsActive } from '../../redux/tweetSlice';

const FeedNavbar = () => {
    
    const dispatch = useDispatch(); 
    const whichDivIsActive = useSelector( store => store?.tweets?.whichDivIsActive); 

    const handleForYouDiv = () => {
        dispatch(setWhichDivIsActive('for-you-div-is-active')); 
    }
        
    const handleFollowingDiv = () => {        
        dispatch(setWhichDivIsActive('following-div-is-active')); 
    }

    return (
        <div className='sticky top-0 w-full min-h-[50px] flex items-center justify-center border-b-[1px] border-gray-500 select-none backdrop-blur-lg z-30'> 
            <div onClick={handleForYouDiv} className='relative w-[50%] h-full flex items-center justify-center cursor-pointer hover:bg-[#323333]/60'>
                <h1 className={`${ (whichDivIsActive === 'for-you-div-is-active') ? 'text-white font-bold' : 'text-gray-500 font-semibold'}`}> 
                    For You 
                </h1>
                {
                    (whichDivIsActive === 'for-you-div-is-active') && 
                    <div className='absolute bottom-0 bg-blue-500 pt-1 w-[56px] rounded-full'></div>
                }
            </div>
            <div onClick={handleFollowingDiv} className='w-[50%] h-full flex items-center justify-center cursor-pointer hover:bg-[#323333]/60'>
                <h1 className={`${ (whichDivIsActive === 'following-div-is-active') ? 'text-white font-bold' : 'text-gray-500 font-semibold'}`}> 
                    Following 
                </h1>
                {
                    (whichDivIsActive === 'following-div-is-active') && 
                    <div className='absolute bottom-0 bg-blue-500 pt-1 w-[70px] rounded-full'></div>
                }
            </div>
        </div>
    )
}

export default FeedNavbar