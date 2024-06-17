import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import FeedNavbar from './FeedNavbar'
import AddTweetDefaultInputBox from './AddTweetDefaultInputBox'
import DisplayTweet from './DisplayTweet'
import EditTweetInputBox from './EditTweetInputBox'
import { EditTweetContext } from '../../pages/Home'
import { useGetTweets } from '../../hooks/useGetTweets'


const Feed = () => {

	useGetTweets(); 

	const allDisplayTweets = useSelector(store => store?.tweets?.allDisplayTweets); 
	const whichDivIsActive = useSelector(store => store.tweets.whichDivIsActive); 
	
	const {
		editATweet, 
        setEditATweet, 
        editTweetContent, 
        setEditTweetContent, 
        oldTweetContent, 
        setOldTweetContent, 
        toBeEditedTweetId, 
        setToBeEditedTweetId 
	} = useContext(EditTweetContext); 

	const editTweetInputBoxProps = {
		closeEditATweet : () => setEditATweet(false),
		editTweetContent,
		setEditTweetContent, 
		oldTweetContent,
		toBeEditedTweetId 
	}

	const displayTweetProps = {
		openEditATweet : () => setEditATweet(true), 
		setEditTweetContent, 
		setOldTweetContent, 
		setToBeEditedTweetId 
	}

	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
			<FeedNavbar /> 
			{
				(whichDivIsActive === 'for-you-div-is-active') && <AddTweetDefaultInputBox /> 
			}
			{
				editATweet && 
				<EditTweetInputBox editTweetInputBoxProps={editTweetInputBoxProps} />
			}
			{
				!editATweet && allDisplayTweets?.map( (currTweet) => {
					return <DisplayTweet key={currTweet?._id} currTweet={currTweet} displayTweetProps={displayTweetProps} /> 
				}) 
			}
    	</div>
  	)
}

export default Feed