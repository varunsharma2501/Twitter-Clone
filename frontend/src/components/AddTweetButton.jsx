import React from 'react'

import AddTweet from '../assets/addTweet.png'


const AddTweetButton = ({CSS}) => {
    return (
        <button className={CSS}>
            <img 
                src={AddTweet} 
                alt='Add Tweet' 
            />
        </button>
    )
}

export default AddTweetButton