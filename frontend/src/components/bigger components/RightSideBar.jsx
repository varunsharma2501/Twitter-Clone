import React from 'react'

import SearchUser from './SearchUser'
import FollowUserSuggestion from '../small components/FollowUserSuggestion'
import { useGetAllOtherUsersDetails } from '../../hooks/useGetAllOtherUsersDetails';
import { useSelector } from 'react-redux';


const RightSideBar = () => {
    
    const allOtherUsersDetails = useSelector(store => store.user.allOtherUsersDetails); 
    useGetAllOtherUsersDetails(); 

    return (
        <div className='hidden lg:flex flex-col items-center w-[390px] min-w-[290px] max-w-[390px]'> 
            <SearchUser /> 
            <div className='relative w-[80%] h-auto max-h-[347px] scrollbar overflow-y-auto rounded-xl flex flex-col bg-black mt-6 border-[1px] border-gray-500'> 
                <div className='sticky top-0 w-[100%] text-white h-10 rounded-t-lg pl-5 pt-2 flex items-center justify-start text-lg font-bold bg-black z-10'>
                    Who to follow 
                </div>
                <div className='mt-1 h-auto w-full flex flex-col' >
                    {
                        allOtherUsersDetails.map( (currUser) => {
                            return(
                                <FollowUserSuggestion key={currUser._id} currUser={currUser} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
   )
}

export default RightSideBar