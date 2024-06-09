import React from 'react'

import FeedNavbar from './FeedNavbar'
import CreatePost from './CreatePost'


const Feed = () => {
  return (
    <div className='relative w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[56px] max-[500px]:mb-[56px] border-gray-500 flex flex-col bg-blue-500 overflow-y-auto'>
        <FeedNavbar />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
        <CreatePost />
    </div>
  )
}

export default Feed