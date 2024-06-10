import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './routes/Routes'

import { Provider } from 'react-redux'; 
import { store } from './redux/store.js';

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}> 
            <RouterProvider router={router}> 
            
            </RouterProvider> 
        </Provider>
    </React.StrictMode>
)