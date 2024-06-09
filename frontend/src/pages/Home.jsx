import React from 'react'

import LeftSideBar from '../components/LeftSideBar'
import Feed from '../components/Feed'
import RightSideBar from '../components/RightSideBar'
import MobileBottomNavBar from '../components/MobileBottomNavBar'
import MobileTopNavBar from '../components/MobileTopNavBar'
import AddTweetButton from '../components/AddTweetButton'


const Home = () => {
  return (
    <div className='w-full h-screen flex justify-center bg-black'> 
        <div className='relative flex justify-center w-[100%]'> 
            
            <LeftSideBar /> 
            <Feed /> 
            <RightSideBar /> 

            <MobileTopNavBar />
            <MobileBottomNavBar />
            
            <AddTweetButton CSS={'absolute bottom-[72px] right-[20px] min-[500px]:hidden h-[40px] w-[40px] bg-blue-500 rounded-full shadow-[0px_0px_5px_1px_rgba(247,247,247,1)] overflow-hidden flex items-center justify-center'} />
        </div>
    </div>
  )
}

export default Home