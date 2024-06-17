import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setAllDisplayTweets } from '../redux/tweetSlice'
import { logoutCleanUp } from '../helpers/logoutCleanUp'


export const useGetTweets = (setAreDisplayTweetLoading, user_id = undefined) => {
     
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchAllExistingTweets = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/all-existing-tweets`)
        .then( (response) => {
            dispatch(setAllDisplayTweets(response?.data?.data)); 
            setAreDisplayTweetLoading(false); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            setAreDisplayTweetLoading(false); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        })
    }

    const fetchAllTweetsOfPeopleWhoAreFollowedByLoggedInUser = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/of-users-who-are-followed-by-logged-in-user`)
        .then( (response) => {
            dispatch(setAllDisplayTweets(response?.data?.data)); 
            setAreDisplayTweetLoading(false); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            setAreDisplayTweetLoading(false); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        })
    }

    const fetchAllTweetsOfUser = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/all-tweets-of-user/${user_id}`)
        .then( (response) => {
            dispatch(setAllDisplayTweets(response?.data?.data)); 
            setAreDisplayTweetLoading(false); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            setAreDisplayTweetLoading(false); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        })
    }

    const whichDivIsActive = useSelector(store => store?.tweets?.whichDivIsActive); 
    const tweetSliceRefresh = useSelector(store => store?.tweets?.tweetSliceRefresh); 

    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Security Logout"); 
            logoutCleanUp(dispatch); 
            navigate('/'); 
        }
        else{
            if(whichDivIsActive === 'for-you-div-is-active' && !user_id){
                setAreDisplayTweetLoading(true); 
                fetchAllExistingTweets(); 
            }
            else if(whichDivIsActive === 'following-div-is-active' && !user_id){
                setAreDisplayTweetLoading(true); 
                fetchAllTweetsOfPeopleWhoAreFollowedByLoggedInUser(); 
            }
            else if(whichDivIsActive === 'profile-div-is-active' && user_id){
                setAreDisplayTweetLoading(true); 
                fetchAllTweetsOfUser(); 
            }
        }
    }, [whichDivIsActive, user_id, tweetSliceRefresh]) 
}