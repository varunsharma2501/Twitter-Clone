import React from 'react'

import FeedNavbar from './FeedNavbar'
import AddTweetDefaultInputBox from './AddTweetDefaultInputBox'
import DisplayTweet from '../small components/DisplayTweet'


const Feed = () => {
  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
			<FeedNavbar />
			<AddTweetDefaultInputBox />
			<DisplayTweet />
			<DisplayTweet />
			<DisplayTweet />
    	</div>
  	)
}

export default Feed