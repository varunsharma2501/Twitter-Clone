import React, { useContext } from 'react'

// import SearchUser from './SearchUser'
import FollowUserSuggestion from '../small components/FollowUserSuggestion'
import { useGetAllOtherUsersDetails } from '../../hooks/useGetAllOtherUsersDetails';
import { useSelector } from 'react-redux';
import { GlobalProfileAndDisplayTweetLoadingContext } from '../../pages/Home';
import LoadingSpinner from '../small components/LoadingSpinner';


const RightSideBar = () => {
    
    const allOtherUsersDetails = useSelector(store => store?.user?.allOtherUsersDetails); 

    const { allOtherUserDetailsLoading, setAllOtherUserDetailsLoading } = useContext(GlobalProfileAndDisplayTweetLoadingContext); 
    
    useGetAllOtherUsersDetails(setAllOtherUserDetailsLoading); 

    return (
        <div className='hidden lg:flex flex-col items-center w-[390px] min-w-[290px] max-w-[390px]'> 
            {/* <SearchUser />  */}
            <div className='relative w-[80%] h-auto max-h-[360px] rounded-xl flex flex-col bg-black mt-6 border-[1px] border-gray-500 overflow-hidden'> 
                <div className='sticky top-0 w-[100%] text-white h-[60px] rounded-t-lg pl-5 pt-2 flex items-center justify-start text-lg font-bold z-10 select-none bg-black border-b-[1px] border-gray-500'>
                    Who to follow 
                </div>
                <div className='relative h-[305px] min-h-[305px] w-full flex flex-col scrollbar overflow-y-auto'>
                    <div className='absolute w-full h-auto mt-[10px] flex items-center justify-center'>
                        {
                            allOtherUserDetailsLoading && 
                            <LoadingSpinner />
                        }
                    </div>
                    {
                        !allOtherUserDetailsLoading  && allOtherUsersDetails.length === 0 && 
                        <div className='h-full w-full flex justify-center flex-col items-center gap-3'>
                            <p className='h-auto w-full font-semibold text-red-500 flex justify-center items-center text-xl'>
                                No user to display!! 
                            </p>
                            <p className='text-center text-md text-white h-auto w-[200px]'>
                                You follow all the users who exit on this platform 
                            </p>
                        </div>
                    }
                    {
                        !allOtherUserDetailsLoading && allOtherUsersDetails.length !== 0 && allOtherUsersDetails.map( (currUser) => {
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