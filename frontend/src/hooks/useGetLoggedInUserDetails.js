import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosTokenInstance } from '../axios/axiosTokenIntsance'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser, setProfilePicPublicId, logout } from '../redux/userSlice'


export const useGetLoggedInUserDetails = () => {
        
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const fetchUserDetails = () => {
        axiosTokenInstance().get(`${import.meta.env.VITE_BACKEND_URL}/api/user/logged-in-user-details`)
        .then( (response) => {
            dispatch(setProfilePicPublicId(response?.data?.data?.cloudinary_img_public_id)); 
            dispatch(setUser(response?.data?.data)); 
        }) 
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(err); 
            if(err?.response?.data?.logout){
                dispatch(logout()); 
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
            navigate('/'); 
        }
        else{
            fetchUserDetails(); 
        }
    }, [])
}