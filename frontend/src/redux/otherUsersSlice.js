import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    otherUserDetails : {},
    allOtherUsersDetails : [] 
}

export const otherUsersSlice = createSlice({
    name: 'otherUsers',
    initialState,
    reducers: {
        setOtherUserDetails : (state, action) => {
            state.otherUserDetails = action.payload 
        },
        resetOtherUserDetails : (state, action) => {
            state.otherUserDetails = {} 
        }, 
        setAllOtherUsersDetails : (state, action) => {
            state.allOtherUsersDetails = action.payload 
        },
        resetAllOtherUsersDetails : (state, action) => {
            state.allOtherUsersDetails = []
        }
    }
})

export const { setOtherUserDetails, resetOtherUserDetails, setAllOtherUsersDetails, resetAllOtherUsersDetails } = otherUsersSlice.actions

export default otherUsersSlice.reducer 