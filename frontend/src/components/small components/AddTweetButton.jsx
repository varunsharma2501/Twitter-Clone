import React, {useContext} from 'react'

import AddTweet from '../../assets/addTweet.png'
import { PostTweetUsingHoveringTabContext } from '../../pages/Home'


const AddTweetButton = ({CSS}) => {
    
    const { openAddTweetHoveringTab } = useContext(PostTweetUsingHoveringTabContext); 

    return (
        <button onClick={openAddTweetHoveringTab} className={CSS}>
            <img 
                src={AddTweet} 
                alt='Add Tweet' 
            />
        </button>
    )
}

export default AddTweetButton