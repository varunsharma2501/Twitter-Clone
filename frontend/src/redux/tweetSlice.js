import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    allDisplayTweets : [], 
    tweetSliceRefresh : false, 
    whichDivIsActive : 'for-you-div-is-active' 
}

export const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        setAllDisplayTweets : (state, action) => {
            state.allDisplayTweets = action.payload 
        },
        resetAllDisplayTweets : (state, action) => {
            state.allDisplayTweets = [] 
        },
        getTweetSliceRefresh : (state, action) => {
            state.tweetSliceRefresh = !state.tweetSliceRefresh 
        },
        setWhichDivIsActive : (state, action) => {
            state.whichDivIsActive = action.payload 
        },
        resetWhichDivIsActive : (state, action) => {
            state.whichDivIsActive = 'for-you-div-is-active' 
        },
        setLikeOrDislike : (state, action) => {
            const { tweetId, loggedInUserId } = action.payload; 
            state.allDisplayTweets = state.allDisplayTweets?.map( (currTweet) => {
                if(currTweet._id === tweetId){
                    if(currTweet.likes.includes(loggedInUserId)){
                        const indexOfLoggedInUser = currTweet.likes.indexOf(loggedInUserId); 
                        currTweet.likes.splice(indexOfLoggedInUser, 1); 
                    }
                    else{
                        currTweet.likes.push(loggedInUserId); 
                    }
                }
                return currTweet; 
            })
        },
        deleteTweet : (state, action) => {
            const { tweetId, loggedInUserId } = action.payload; 
            state.allDisplayTweets = state.allDisplayTweets?.filter( (currTweet) => {
                if(currTweet._id === tweetId){
                    if(currTweet.userId._id === loggedInUserId){
                        return false; 
                    }
                }
                return true;
            })
        },
        editTweetInRedux : (state, action) => {
            const {toBeEditedTweetId, editTweetContent} = action.payload; 
            state.allDisplayTweets = state.allDisplayTweets?.map( (currTweet) => {
                if(currTweet._id === toBeEditedTweetId){
                    currTweet.description = editTweetContent 
                }
                return currTweet;
            })
        }
    }
})

export const { setAllDisplayTweets, resetAllDisplayTweets, getTweetSliceRefresh, setWhichDivIsActive, resetWhichDivIsActive, setLikeOrDislike, deleteTweet, editTweetInRedux } = tweetSlice.actions 

export default tweetSlice.reducer 