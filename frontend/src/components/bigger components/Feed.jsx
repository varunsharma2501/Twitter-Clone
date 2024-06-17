import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import FeedNavbar from './FeedNavbar'
import AddTweetDefaultInputBox from './AddTweetDefaultInputBox'
import DisplayTweet from './DisplayTweet'
import { EditTweetContext, PostTweetUsingHoveringTabContext } from '../../pages/Home'
import { useGetTweets } from '../../hooks/useGetTweets'


const Feed = () => {

	useGetTweets(); 

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
		
	const {
		isPostATweetHoveringTabOpen 
	} = useContext(PostTweetUsingHoveringTabContext); 
	
	return (
		<>
			<FeedNavbar /> 
			{
				(whichDivIsActive === 'for-you-div-is-active') && <AddTweetDefaultInputBox /> 
			}
			{
				!isPostATweetHoveringTabOpen && !isEditATweetActive && allDisplayTweets?.map( (currTweet) => {
					return <DisplayTweet key={currTweet?._id} currTweet={currTweet} displayTweetProps={displayTweetProps} /> 
				}) 
			}
    	</>
  	)
}

export default Feed