import React from 'react'

import LeftSideBar from '../components/bigger components/LeftSideBar'
import RightSideBar from '../components/bigger components/RightSideBar'
import MobileBottomNavBar from '../components/bigger components/MobileBottomNavBar'
import MobileTopNavBar from '../components/bigger components/MobileTopNavBar'
import AddTweetButton from '../components/small components/AddTweetButton'

import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetLoggedInUserDetails } from '../hooks/useGetLoggedInUserDetails'
import { useGetAllExistingTweets } from '../hooks/useGetAllExistingTweets'


const Home = () => {

    const user = useSelector(store => store.user); 
    
    useGetLoggedInUserDetails(); 
    useGetAllExistingTweets(); 

    return (
        <div className='w-full h-screen flex justify-center bg-black'> 
            <div className='relative flex justify-center w-[100%]'> 
                
                <LeftSideBar /> 
                <Outlet />
                <RightSideBar /> 

                <MobileTopNavBar />
                <MobileBottomNavBar />
                
                <AddTweetButton CSS={'absolute bottom-[72px] right-[20px] min-[500px]:hidden h-[40px] w-[40px] bg-blue-500 rounded-full shadow-[0px_0px_5px_1px_rgba(247,247,247,1)] overflow-hidden flex items-center justify-center'} />
            </div>
        </div>
    )
}

export default Home