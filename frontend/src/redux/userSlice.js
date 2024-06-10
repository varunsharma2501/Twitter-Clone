import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    _id : '',
    name : '',
    email : '',
    username : '',
    profile_pic : '',
    cloudinary_img_public_id : '',
    followers : [], 
    following : [] 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state._id = action.payload._id,
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.username = action.payload.username, 
            state.profile_pic = action.payload.profile_pic,
            followers = action.payload.followers,
            following = action.payload.following
        },
        setProfilePicPublicId : (state, action) => {
            state.cloudinary_img_public_id = action.payload 
        },
        logout : (state, action) => {
            state._id = '',
            state.name = '',
            state.email = '',
            state.username = '',
            state.profile_pic = '',
            state.cloudinary_img_public_id = '',
            state.followers = [], 
            state.following = []
        }
    }
})

// Action creators are generated for each case reducer function 
export const { setUser, setProfilePicPublicId, logout } = userSlice.actions

export default userSlice.reducer 