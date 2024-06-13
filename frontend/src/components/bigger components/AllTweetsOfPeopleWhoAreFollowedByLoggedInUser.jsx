import React, { useState, useRef } from 'react'

import FeedNavbar from './FeedNavbar'
import DisplayTweet from './DisplayTweet'
import { useSelector } from 'react-redux'
import { useGetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser } from '../../hooks/useGetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser'


const AllTweetsOfPeopleWhoAreFollowedByLoggedInUser = () => {

	useGetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser(); 
	const allTweetsOfPeopleWhoAreFollowedByLoggedInUser = useSelector(store => store.tweets.allTweetsOfPeopleWhoAreFollowedByLoggedInUser); 
	
  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
			<FeedNavbar />
			{
				allTweetsOfPeopleWhoAreFollowedByLoggedInUser?.map( (currTweet) => {
					return <DisplayTweet key={currTweet._id} currTweet={currTweet} /> 
				})
			}
    	</div>
  )
}

export default AllTweetsOfPeopleWhoAreFollowedByLoggedInUser