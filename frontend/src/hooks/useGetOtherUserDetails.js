import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetAllOtherUsersDetails, resetOtherUserDetails, setOtherUserDetails } from '../redux/otherUsersSlice'


export const useGetOtherUserDetails = (user_id) => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchOtherUserDetails = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/user/other-user-details/${user_id}`)
        .then( (response) => {
            dispatch(setOtherUserDetails(response?.data?.data)); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            if(err?.response?.data?.logout){
                dispatch(logout()); 
                dispatch(resetAllOtherUsersDetails()); 
                dispatch(resetOtherUserDetails()); 
                localStorage.removeItem('jwt'); 
                navigate('/'); 
            }
        })
    }

    useEffect( () => {
        if(!localStorage.getItem('jwt')){ 
            toast.error("Security Logout"); 
            localStorage.removeItem('jwt'); 
            dispatch(logout()); 
            dispatch(resetAllOtherUsersDetails()); 
            dispatch(resetOtherUserDetails()); 
            navigate('/'); 
        }
        else{
            fetchOtherUserDetails(); 
        }
    }, [user_id])
}