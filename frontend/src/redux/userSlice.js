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
        setFollowOrUnfollow : (state, action) => {
            
            const {toBeFollowedOrUnfollowedUserId} = action.payload; 

            if(state.loggedInUserDetails.following.includes(toBeFollowedOrUnfollowedUserId)){

                state.loggedInUserDetails.following = state.loggedInUserDetails.following.filter( (currUserId) => {
                    if(currUserId === toBeFollowedOrUnfollowedUserId) return false; 
                    return true; 
                })

                if(state.userDetails._id === toBeFollowedOrUnfollowedUserId){
                    state.userDetails.followers = state.userDetails.followers.filter( (currUserId) => {
                        if(currUserId === state.loggedInUserDetails._id) return false;
                        return true; 
                    })
                }

                if(state.userDetails._id === state.loggedInUserDetails._id){
                    state.userDetails.following = state.userDetails.following.filter( (currUserId) => {
                        if(currUserId === toBeFollowedOrUnfollowedUserId) return false; 
                        return true; 
                    })
                }

                state.allOtherUsersDetails.map( (currUser) => {
                    if(currUser._id === toBeFollowedOrUnfollowedUserId){
                        currUser.followers = currUser.followers.filter( (followerId) => {
                            if(followerId === state.loggedInUserDetails._id) return false; 
                            return true;
                        }); 
                    }
                })
            }
            else{
                state.loggedInUserDetails.following.push(toBeFollowedOrUnfollowedUserId); 

                if(state.userDetails._id === toBeFollowedOrUnfollowedUserId){
                    state.userDetails.followers.push(state.loggedInUserDetails._id); 
                }

                if(state.userDetails._id === state.loggedInUserDetails._id){
                    state.userDetails.following.push(toBeFollowedOrUnfollowedUserId); 
                }

                state.allOtherUsersDetails.map( (currUser) => {
                    if(currUser._id === toBeFollowedOrUnfollowedUserId){
                        currUser.followers.push(state.loggedInUserDetails._id); 
                    }
                })
            }
        },
        // Recheck these once ahead  
        setAllOtherUsersDetails : (state, action) => {
            state.allOtherUsersDetails = action.payload 
        },
        resetAllOtherUsersDetails : (state, action) => {
            state.allOtherUsersDetails = [] 
        }
    }
})

// Action creators are generated for each case reducer function 
export const { setLoggedInUserDetails, resetLoggedInUserDetails, decreaseTweetsCount, increaseTweetsCount, setUserDetails, resetUserDetails, setFollowOrUnfollow, setAllOtherUsersDetails, resetAllOtherUsersDetails } = userSlice.actions 

export default userSlice.reducer 