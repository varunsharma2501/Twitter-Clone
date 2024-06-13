import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import FeedNavbar from './FeedNavbar'
import AddTweetDefaultInputBox from './AddTweetDefaultInputBox'
import DisplayTweet from './DisplayTweet'
import AddTweetHoveringInputBox from './AddTweetHoveringInputBox'
import { EditTweetContext } from '../../pages/Home'


const Feed = () => {

	const allExisitingTweets = useSelector(store => store.tweets.allExistingTweets); 

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

  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
			<FeedNavbar />
			<AddTweetDefaultInputBox />
			{
				editATweet && 
				<AddTweetHoveringInputBox linkBackButtonTo={`/home`}  closeEditATweet={ () => setEditATweet(false) } editTweetContent={editTweetContent} setEditTweetContent={setEditTweetContent} oldTweetContent={oldTweetContent} toBeEditedTweetId={toBeEditedTweetId} />
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