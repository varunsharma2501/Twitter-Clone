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
        setUserDetails : (state, action) => {
            state.userDetails = action.payload 
        },
        resetUserDetails : (state, action) => {
            state.userDetails = {} 
        }, 
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
export const { setLoggedInUserDetails, resetLoggedInUserDetails, setUserDetails, resetUserDetails, setAllOtherUsersDetails, resetAllOtherUsersDetails, getUserSliceRefresh } = userSlice.actions 

export default userSlice.reducer 