import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    allExistingTweets : [],
    allTweetsOfPeopleWhoAreFollowedByLoggedInUser : [], 
    allTweetsOfUser : [], 
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
        getRefresh : (state, action) => {
            state.refresh = !state.refresh; 
        }
    }
})

export const { setAllExisitngTweets, resetAllExistingTweets, getRefresh, setAllTweetsOfPeopleWhoAreFollowedByLoggedInUser, resetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser, setAllTweetsOfUser, resetAllTweetsOfUser } = tweetSlice.actions 

export default tweetSlice.reducer 