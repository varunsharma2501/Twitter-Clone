import express from 'express' 
import dotenv from 'dotenv' 
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'; 


dotenv.config(); 

const PORT = process.env.PORT || 8000; 
const app = express(); 


app.use(express.json()); 

app.use(cors({
    origin : process.env.FRONTEND_URL 
}))


app.use('/api/auth', authRoutes); 


app.listen( PORT, (err) => {
    if(err){
        console.log(`Error occured while starting the server ${err.message}`); 
    }
    else{
        console.log(`Server started successfully on port no.: ${PORT}`); 
        console.log(`Press ctrl and click me: http://localhost:${PORT}`); 
    } 
}); 