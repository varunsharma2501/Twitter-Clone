import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { resetUserDetails, setUserDetails } from '../redux/userSlice'
import { logoutCleanUp } from '../helpers/logoutCleanUp'


export const useGetUserDetails = (setIsUserProfilePageDetialsLoading, user_id = undefined) => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchUserDetails = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details/${user_id}`)
        .then( (response) => {
            dispatch(setUserDetails(response?.data?.data)); 
            setIsUserProfilePageDetialsLoading(false); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            setIsUserProfilePageDetialsLoading(false); 
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        }) 
    }
    
    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Unauthenticated Access Attempt \n Access Denied"); 
            logoutCleanUp(dispatch); 
            navigate('/'); 
        }
        else{
            setIsUserProfilePageDetialsLoading(true); 
            fetchUserDetails(); 
        }
    }, [user_id]) 
}