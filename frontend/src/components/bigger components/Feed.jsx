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

	const whichDivIsActive = useSelector(store => store.tweets.whichDivIsActive); 

  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
			<FeedNavbar /> 
			{
				(whichDivIsActive === 'for-you-div-is-active') && <AddTweetDefaultInputBox /> 
			}
			{
				editATweet && 
				<EditTweetInputBox linkBackButtonTo={`/home`}  closeEditATweet={ () => setEditATweet(false) } editTweetContent={editTweetContent} setEditTweetContent={setEditTweetContent} oldTweetContent={oldTweetContent} toBeEditedTweetId={toBeEditedTweetId} />
			}
			{
				!editATweet && allDisplayTweets?.map( (currTweet) => {
					return <DisplayTweet key={currTweet._id} currTweet={currTweet} openEditATweet={ () => setEditATweet(true) } setEditTweetContent={setEditTweetContent} setOldTweetContent={setOldTweetContent} setToBeEditedTweetId={setToBeEditedTweetId} /> 
				}) 
			}
    	</div>
  	)
}

export default Feed