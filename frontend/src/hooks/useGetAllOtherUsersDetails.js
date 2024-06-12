import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAllOtherUsersDetails } from '../redux/otherUsersSlice'

import { logoutCleanUp } from '../helpers/logoutCleanUp'


export const useGetAllOtherUsersDetails = () => {
     
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchAllOtherUsersDetails = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all-other-user-details`)
        .then( (response) => {
            dispatch(setAllOtherUsersDetails(response?.data?.data)); 
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

    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Security Logout"); 
            logoutCleanUp(dispatch); 
            navigate('/'); 
        }
        else{
            fetchAllOtherUsersDetails(); 
        }
    }, [])
}