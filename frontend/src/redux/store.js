import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice' 
import tweetsReducers from './tweetSlice' 


export const store = configureStore({
    reducer: {
        user : userReducer, 
        tweets : tweetsReducers 
    },
})