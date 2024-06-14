import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MiniAvatar from './MiniAvatar'
import handleFollowOrUnfollow from '../../helpers/handleFollowOrUnfollow'


const FollowUserSuggestion = ({currUser}) => {

    const dispatch = useDispatch(); 

    const loggedInUserDetails = useSelector(store => store?.user?.loggedInUserDetails); 
    const [doesLoggedInUserFollowsThisUser, setDoesLoggedInUserFollowsThisUser] = useState(loggedInUserDetails?.following?.includes(currUser?._id)); 

    const doFollowOrUnfollow = (e) => {
        handleFollowOrUnfollow(e, currUser._id, doesLoggedInUserFollowsThisUser, setDoesLoggedInUserFollowsThisUser, dispatch); 
    }

    useEffect( () => {
        setDoesLoggedInUserFollowsThisUser(loggedInUserDetails?.following?.includes(currUser._id)); 
    }, [loggedInUserDetails])

    return (
        <Link to={`profile/${currUser._id}`}>
            <div className='relative flex py-2 hover:bg-[#323333]/60 cursor-pointer'>
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
                    <div className='absolute right-5 top-[12px] w-[96px] h-[36px] bg-blue-500 rounded-full overflow-hidden'>
                        <button  
                            onClick={ doFollowOrUnfollow } 
                            className={`absolute top-0 h-full w-full rounded-full font-semibold cursor-pointer select-none ${doesLoggedInUserFollowsThisUser ? 'bg-black border-[1px] text-white border-white' : 'bg-white border-[1px] text-black border-black'} `} 
                        > 
                                { doesLoggedInUserFollowsThisUser ? 'Unfollow' : 'Follow' } 
                        </button>
                    </div> 
                }
            </div>
        </Link>
    )
}

export default FollowUserSuggestion