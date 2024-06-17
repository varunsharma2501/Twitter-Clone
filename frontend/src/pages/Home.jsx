import React, { useState } from 'react'
import { createContext } from 'react'

import LeftSideBar from '../components/bigger components/LeftSideBar'
import RightSideBar from '../components/bigger components/RightSideBar'
import MobileBottomNavBar from '../components/bigger components/MobileBottomNavBar'
import MobileTopNavBar from '../components/bigger components/MobileTopNavBar'
import AddTweetButton from '../components/small components/AddTweetButton'
import EditTweetInputBox from '../components/bigger components/EditTweetInputBox'
import AddTweetHoveringInputBox from '../components/bigger components/AddTweetHoveringInputBox'

import { Outlet } from 'react-router-dom'
import { useGetLoggedInUserDetails } from '../hooks/useGetLoggedInUserDetails'

export const EditTweetContext = createContext(null); 
export const PostTweetUsingHoveringTabContext = createContext(null); 


const Home = () => {

    useGetLoggedInUserDetails(); 

    const [isEditATweetActive, setIsEditATweetActive] = useState(false); 

	const [editTweetContent, setEditTweetContent] = useState(''); 
	const [oldTweetContent, setOldTweetContent] = useState(''); 
	const [toBeEditedTweetId, setToBeEditedTweetId] = useState(''); 

    const objectOfAllStatesAndTheirSettersForEditingATweet = {
        isEditATweetActive, 
        setIsEditATweetActive, 
        setEditTweetContent, 
        setOldTweetContent, 
        setToBeEditedTweetId 
    }

    const editTweetInputBoxProps = {
		closeEditATweet : () => setIsEditATweetActive(false),
		editTweetContent,
		setEditTweetContent, 
		oldTweetContent,
		toBeEditedTweetId 
	}
    
    const [isAddTweetHoveringTabOpen, setIsAddTweetHoveringTabOpen] = useState(false); 

    const objectOfAllStatesAndTheirSettersForPostingATweetUsingHoveringTab = {
        isAddTweetHoveringTabOpen,
		openAddTweetHoveringTab : () => setIsAddTweetHoveringTabOpen(true) 
    }

    return (
        <div className='w-full h-screen flex justify-center bg-black'> 
            <div className='relative flex justify-center w-[100%]'> 
                
                <PostTweetUsingHoveringTabContext.Provider value={objectOfAllStatesAndTheirSettersForPostingATweetUsingHoveringTab}>
                    
                    <LeftSideBar /> 

                    <EditTweetContext.Provider value={objectOfAllStatesAndTheirSettersForEditingATweet}>
                        <div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto' >
   
                            <Outlet /> 

                            {
                                isEditATweetActive && 
                                <EditTweetInputBox editTweetInputBoxProps={editTweetInputBoxProps} /> 
                            }

                            {
                                isAddTweetHoveringTabOpen && 
                                <AddTweetHoveringInputBox closeAddTweetHoveringTab={ () => setIsAddTweetHoveringTabOpen(false) }  /> 
                            }

                        </div>
                    </EditTweetContext.Provider>

                
                    <RightSideBar /> 

                    <MobileTopNavBar />
                    <MobileBottomNavBar />

                    <AddTweetButton CSS={'absolute bottom-[72px] right-[20px] min-[500px]:hidden h-[40px] w-[40px] bg-blue-500 rounded-full shadow-[0px_0px_5px_1px_rgba(247,247,247,1)] overflow-hidden flex items-center justify-center'} />

                </PostTweetUsingHoveringTabContext.Provider>
                
            </div>
        </div>
    )
}

export default Home