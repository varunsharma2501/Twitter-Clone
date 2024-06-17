import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAllOtherUsersDetails } from '../redux/userSlice'

import { logoutCleanUp } from '../helpers/logoutCleanUp'


export const useGetAllOtherUsersDetails = (setAllOtherUsersDetailsLoading) => {
     
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchAllOtherUsersDetails = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all-other-user-details`)
        .then( (response) => {
            dispatch(setAllOtherUsersDetails(response?.data?.data)); 
            setAllOtherUsersDetailsLoading(false);
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            setAllOtherUsersDetailsLoading(false);
            if(err?.response?.data?.logout){
                logoutCleanUp(dispatch); 
                navigate('/'); 
            }
        })
    }

    const userSliceRefresh = useSelector(store => store?.user?.userSliceRefresh); 

    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Unauthenticated Access Attempt \n Access Denied"); 
            logoutCleanUp(dispatch); 
            navigate('/'); 
        }
        else{
            setAllOtherUsersDetailsLoading(true); 
            fetchAllOtherUsersDetails(); 
        }
    }, [userSliceRefresh])
}