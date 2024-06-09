import React from 'react'

import SearchUser from './SearchUser'
import FollowUserSuggestion from '../small components/FollowUserSuggestion'


const RightSideBar = () => {
    return (
        
        <div className='hidden lg:flex flex-col items-center w-[390px] min-w-[290px] max-w-[390px]'> 
            <SearchUser /> 
            <div className='w-[80%] h-auto rounded-xl flex flex-col py-3 bg-black mt-6 border-[1px] border-gray-500'> 
                <div className='w-[80%] text-white h-10 rounded-lg ml-5 flex items-center justify-start text-lg font-bold'>
                    Who to follow
                </div>
                <div className='h-auto w-full flex flex-col' >
                    <FollowUserSuggestion />
                    <FollowUserSuggestion />
                    <FollowUserSuggestion />
                    <FollowUserSuggestion />
                    <FollowUserSuggestion />
                </div>
            </div>
        </div>
   )
}

export default RightSideBar