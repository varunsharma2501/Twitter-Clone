import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice' 
import otherUsersReducer from './otherUsersSlice' 
import tweetsReducers from './tweetSlice' 


export const store = configureStore({
    reducer: {
        user : userReducer,
        otherUsers : otherUsersReducer,
        tweets : tweetsReducers
    },
})