import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MiniAvatar from './MiniAvatar'
import handleFollowOrUnfollow from '../../helpers/handleFollowOrUnfollow'
import { navigateToProfilePage } from '../../helpers/navigationUtils'


const FollowUserSuggestion = ({currUser}) => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const loggedInUserDetails = useSelector(store => store?.user?.loggedInUserDetails); 
    const doesLoggedInUserFollowsThisUser = loggedInUserDetails?.following?.includes(currUser?._id); 

    return (
        <div onClick={ (e) => navigateToProfilePage(e, dispatch, navigate, currUser._id) } className='relative flex py-2 hover:bg-[#323333]/60 cursor-pointer'>
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
            {
                <div onClick={ (e) => handleFollowOrUnfollow(e, dispatch, currUser._id) } className='absolute right-5 top-[12px] w-[96px] h-[36px] bg-blue-500 rounded-full overflow-hidden'>
                    <button   
                        className={`absolute top-0 h-full w-full rounded-full font-semibold cursor-pointer select-none ${doesLoggedInUserFollowsThisUser ? 'bg-black border-[1px] text-white border-white' : 'bg-white border-[1px] text-black border-black'} `} 
                    > 
                        { doesLoggedInUserFollowsThisUser ? 'Unfollow' : 'Follow' } 
                    </button>
                </div> 
            }
        </div>
    )
}

export default FollowUserSuggestion