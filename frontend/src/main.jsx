import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './routes/Routes'

import { Provider } from 'react-redux' 
import { store } from './redux/store.js' 

import persistStore from 'redux-persist/es/persistStore' 
import { PersistGate } from 'redux-persist/integration/react'

import './index.css' 


let persistor = persistStore(store)


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}> 
        <PersistGate loading={null} persistor={persistor} >
            <RouterProvider router={router}> 
            
            </RouterProvider> 
        </PersistGate>
    </Provider>
)