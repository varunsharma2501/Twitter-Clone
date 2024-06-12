import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setAllExisitngTweets } from '../redux/tweetSlice'
import { logoutCleanUp } from '../helpers/logoutCleanUp'


export const useGetAllExistingTweets = () => {
     
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchAllExistingTweets = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/all-existing-tweets`)
        .then( (response) => {
            console.log(response?.data?.data)
            dispatch(setAllExisitngTweets(response?.data?.data)); 
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
            fetchAllExistingTweets(); 
        }
    }, [refresh])
}