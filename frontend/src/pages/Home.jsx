import React, { useEffect } from 'react'

import LeftSideBar from '../bigger components/LeftSideBar'
import RightSideBar from '../bigger components/RightSideBar'
import MobileBottomNavBar from '../bigger components/MobileBottomNavBar'
import MobileTopNavBar from '../bigger components/MobileTopNavBar'
import AddTweetButton from '../small components/AddTweetButton'

import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios' 
import toast from 'react-hot-toast'
import { setUser, setProfilePicPublicId } from '../redux/userSlice'


const Home = () => {

  const user = useSelector(state => state.user); 
  console.log(user); 
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const fetchUserDetails = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/details`, {
        token : localStorage.getItem('jwt') 
    })
    .then( (response) => {
        dispatch(setProfilePicPublicId(response?.data?.data?.cloudinary_img_public_id)); 
        dispatch(setUser(response?.data?.data)); 
    }) 
    .catch( (err) => {
        toast.error(err?.response?.data?.message); 
        console.log(err); 
        if(err?.response?.data?.logout){
            sessionTimeOutLogout(dispatch); 
            navigate('/login-email'); 
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

  return (
    <div className='w-full h-screen flex justify-center bg-black'> 
        <div className='relative flex justify-center w-[100%]'> 
            
            <LeftSideBar /> 
            <Outlet />
            <RightSideBar /> 

            <MobileTopNavBar />
            <MobileBottomNavBar />
            
            <AddTweetButton CSS={'absolute bottom-[72px] right-[20px] min-[500px]:hidden h-[40px] w-[40px] bg-blue-500 rounded-full shadow-[0px_0px_5px_1px_rgba(247,247,247,1)] overflow-hidden flex items-center justify-center'} />
        </div>
    </div>
  )
}

export default Home