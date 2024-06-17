import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import FeedNavbar from './FeedNavbar'
import AddTweetDefaultInputBox from './AddTweetDefaultInputBox'
import DisplayTweet from './DisplayTweet'
import { EditTweetContext, PostTweetUsingHoveringTabContext } from '../../pages/Home'
import { useGetTweets } from '../../hooks/useGetTweets'

import { GlobalProfileAndDisplayTweetLoadingContext } from '../../pages/Home'
import LoadingSpinner from '../small components/LoadingSpinner'


const Feed = () => {

	const { setAreDisplayTweetLoading } = useContext(GlobalProfileAndDisplayTweetLoadingContext); 
	useGetTweets(setAreDisplayTweetLoading); 

	const allDisplayTweets = useSelector(store => store?.tweets?.allDisplayTweets); 
	const whichDivIsActive = useSelector(store => store?.tweets?.whichDivIsActive); 
	
	const {
		isEditATweetActive, 
        setIsEditATweetActive, 
        setEditTweetContent, 
        setOldTweetContent, 
        setToBeEditedTweetId 
	} = useContext(EditTweetContext); 

	const displayTweetProps = {
		openEditATweet : () => setIsEditATweetActive(true), 
		setEditTweetContent, 
		setOldTweetContent, 
		setToBeEditedTweetId 
	}
		
	const { isPostATweetHoveringTabOpen } = useContext(PostTweetUsingHoveringTabContext); 
	const { areDisplayTweetsLoading } = useContext(GlobalProfileAndDisplayTweetLoadingContext); 

	return (
		<>
			<FeedNavbar /> 
			{
				(whichDivIsActive === 'for-you-div-is-active') && <AddTweetDefaultInputBox /> 
			}

			<div className='relative'>

				<div className='absolute w-full h-auto mt-[20px] flex items-center justify-center'>
					{
						areDisplayTweetsLoading && 
						<LoadingSpinner />
						}
				</div>

				{
					!areDisplayTweetsLoading && (whichDivIsActive === 'following-div-is-active') && allDisplayTweets?.length === 0 && 
					<div className='w-full h-auto flex items-center justify-center font-semibold mt-10 text-white text-lg px-5 text-center text-wrap'>
						You don't follow any user at this moment 
					</div>
				}	

				{
					!areDisplayTweetsLoading && 
					!isPostATweetHoveringTabOpen && !isEditATweetActive && allDisplayTweets?.map( (currTweet) => {
						return <DisplayTweet key={currTweet?._id} currTweet={currTweet} displayTweetProps={displayTweetProps} /> 
						}) 
				}
			</div>
    	</>
  	)
}

export default Feed