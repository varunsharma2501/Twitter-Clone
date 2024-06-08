import React from 'react'

import AddTweet from '../assets/addTweet.png'


const AddPostButton = ({CSS}) => {
    return (
        <button className={CSS}>
            <img 
                src={AddTweet} 
                alt='Add Tweet' 
            />
        </button>
    )
}

export default AddPostButton