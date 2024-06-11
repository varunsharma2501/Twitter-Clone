import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice' 
import otherUsersReducer from './otherUsersSlice' 


export const store = configureStore({
    reducer: {
        user : userReducer,
        otherUsers : otherUsersReducer
    },
})