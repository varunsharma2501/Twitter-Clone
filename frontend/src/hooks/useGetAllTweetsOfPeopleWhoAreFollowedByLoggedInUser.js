import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutCleanUp } from '../helpers/logoutCleanUp'
import { setAllTweetsOfPeopleWhoAreFollowedByLoggedInUser } from '../redux/tweetSlice'


export const useGetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser = () => {
    
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchAllTweetsOfPeopleWhoAreFollowedByLoggedInUser = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/of-users-who-are-followed-by-logged-in-user`)
        .then( (response) => {
            dispatch(setAllTweetsOfPeopleWhoAreFollowedByLoggedInUser(response?.data?.data)); 
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

    const tweetSliceRefresh = useSelector(store => store.tweets.tweetSliceRefresh); 

    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Security Logout"); 
            logoutCleanUp(dispatch); 
            navigate('/'); 
        }
        else{
            fetchAllTweetsOfPeopleWhoAreFollowedByLoggedInUser(); 
        }
    }, [tweetSliceRefresh])
}