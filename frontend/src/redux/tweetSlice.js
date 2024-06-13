import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    allExistingTweets : [],
    allTweetsOfPeopleWhoAreFollowedByLoggedInUser : [], 
    allTweetsOfUser : [], 
    tweetSliceRefresh : false
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
        setAllTweetsOfPeopleWhoAreFollowedByLoggedInUser : (state, action) => {
            state.allTweetsOfPeopleWhoAreFollowedByLoggedInUser = action.payload 
        },
        resetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser : (state, action) => {
            state.allTweetsOfPeopleWhoAreFollowedByLoggedInUser = [] 
        },
        setAllTweetsOfUser : (state, action) => {
            state.allTweetsOfUser = action.payload 
        },
        resetAllTweetsOfUser : (state, action) => {    
            state.allTweetsOfUser = [] 
        },
        getTweetSliceRefresh : (state, action) => {
            state.tweetSliceRefresh = !state.tweetSliceRefresh; 
        }
    }
})

export const { setAllExisitngTweets, resetAllExistingTweets, getTweetSliceRefresh, setAllTweetsOfPeopleWhoAreFollowedByLoggedInUser, resetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser, setAllTweetsOfUser, resetAllTweetsOfUser } = tweetSlice.actions 

export default tweetSlice.reducer 