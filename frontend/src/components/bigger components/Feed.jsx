import React, { useState, useRef } from 'react'

import FeedNavbar from './FeedNavbar'
import AddTweetDefaultInputBox from './AddTweetDefaultInputBox'
import DisplayTweet from '../small components/DisplayTweet'
import { useSelector } from 'react-redux'
import AddTweetHoveringInputBox from './AddTweetHoveringInputBox'


const Feed = () => {

	const allExisitingTweets = useSelector(store => store.tweets.allExistingTweets); 
	const [editATweet, setEditATweet] = useState(false); 
	
	const [editTweetContent, setEditTweetContent] = useState(''); 
	const [oldTweetContent, setOldTweetContent] = useState(''); 
	const [toBeEditedTweetId, setToBeEditedTweetId] = useState(''); 

  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
			<FeedNavbar />
			<AddTweetDefaultInputBox />
			{
				editATweet && 
				<AddTweetHoveringInputBox closeEditATweet={ () => setEditATweet(false) } editTweetContent={editTweetContent} setEditTweetContent={setEditTweetContent} oldTweetContent={oldTweetContent} toBeEditedTweetId={toBeEditedTweetId} />
			}
			{
				!editATweet && allExisitingTweets.map( (currTweet) => {
					return <DisplayTweet key={currTweet._id} currTweet={currTweet} openEditATweet={ () => setEditATweet(true) } setEditTweetContent={setEditTweetContent} setOldTweetContent={setOldTweetContent} setToBeEditedTweetId={setToBeEditedTweetId} /> 
				})
			}
    	</div>
  	)
}

export default Feed