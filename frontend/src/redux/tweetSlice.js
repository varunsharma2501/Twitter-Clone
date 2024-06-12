import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    allExistingTweets : [],
    refresh : false
}

export const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        setAllExisitngTweets : (state, action) => {
            state.allExistingTweets = action.payload 
        },
        resetAllExistingTweets : (state, action) => {
            state.allExistingTweets = [] 
        },
        getRefresh : (state, action) => {
            state.refresh = !state.refresh; 
        }
    }
})

export const { setAllExisitngTweets, resetAllExistingTweets, getRefresh } = tweetSlice.actions

export default tweetSlice.reducer 