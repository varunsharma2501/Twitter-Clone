import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { logoutCleanUp } from '../helpers/logoutCleanUp'
import { setAllTweetsOfUser } from '../redux/tweetSlice'


export const useGetAllTweetsOfUser = (user_id) => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchAllTweetsOfUser = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/all-tweets-of-user/${user_id}`)
        .then( (response) => {
            dispatch(setAllTweetsOfUser(response?.data?.data)); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        })
    }

    const refresh = useSelector(store => store.tweets.refresh); 

    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Security Logout"); 
            logoutCleanUp(dispatch); 
            navigate('/'); 
        }
        else{
            fetchAllTweetsOfUser(); 
        }
    }, [user_id, refresh])

}