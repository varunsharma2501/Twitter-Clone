import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    loggedInUserDetails : {}, 
    userDetails : {}, 
    allOtherUsersDetails : [],
    userSliceRefresh : false 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedInUserDetails : (state, action) => {
            state.loggedInUserDetails = action.payload 
        },
        resetLoggedInUserDetails : (state, action) => {
            state.loggedInUserDetails = {}
        },
        decreaseTweetsCount : (state, action) => {
            state.loggedInUserDetails.tweetsCount = state.loggedInUserDetails.tweetsCount - 1; 
            state.userDetails.tweetsCount = state.userDetails.tweetsCount - 1; 
        },
        increaseTweetsCount : (state, action) => {
            state.loggedInUserDetails.tweetsCount = state.loggedInUserDetails.tweetsCount + 1; 
            state.userDetails.tweetsCount = state.userDetails.tweetsCount + 1; 
        },
        setUserDetails : (state, action) => {
            state.userDetails = action.payload 
        },
        resetUserDetails : (state, action) => {
            state.userDetails = {} 
        },
        // Recheck these once ahead  
        setAllOtherUsersDetails : (state, action) => {
            state.allOtherUsersDetails = action.payload 
        },
        resetAllOtherUsersDetails : (state, action) => {
            state.allOtherUsersDetails = [] 
        },
        getUserSliceRefresh : (state, action) => {
            state.userSliceRefresh = !state.userSliceRefresh; 
        }
    }
})

// Action creators are generated for each case reducer function 
export const { setLoggedInUserDetails, resetLoggedInUserDetails, decreaseTweetsCount, increaseTweetsCount, setUserDetails, resetUserDetails, setAllOtherUsersDetails, resetAllOtherUsersDetails, getUserSliceRefresh } = userSlice.actions 

export default userSlice.reducer 