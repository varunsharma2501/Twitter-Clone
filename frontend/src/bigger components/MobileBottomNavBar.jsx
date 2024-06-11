import React from 'react'

import { HiOutlineUser } from 'react-icons/hi2' 
import { GoHomeFill } from 'react-icons/go'  
import { IoSearchOutline, IoLogOutOutline } from 'react-icons/io5' 

import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux' 
import { logout } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'


const MobileBottomNavBar = () => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const logoutUser = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 

        localStorage.removeItem('jwt'); 
        dispatch(logout()); 

        toast.success('User logged out successfully'); 
        
        navigate('/'); 
    }
    
    const iconCSS = 'w-[42px] h-[42px] text-white hover:bg-[#323333]/60 p-2 bg-black rounded-full cursor-pointer'; 
    const containerOfIcon = 'h-[50px] w-[50px] select-none flex items-center justify-center'; 

    return (
        <div className='min-[500px]:hidden absolute bottom-0 h-[55px] w-full flex items-center bg-black justify-around border-t-[1px] border-gray-500'>
            <div className={containerOfIcon}>
                <GoHomeFill className={iconCSS} />
            </div>

            <div className={containerOfIcon}>
                <IoSearchOutline className={iconCSS} /> 
            </div>

            <div className={containerOfIcon}>
                <HiOutlineUser className={iconCSS} /> 
            </div>

            <div>
                <IoLogOutOutline onClick={logoutUser} className='w-[40px] h-[40px] text-white bg-black rounded-full cursor-pointer ml-5 hover:bg-red-600 p-2' /> 
            </div>
        </div>
    )
}

export default MobileBottomNavBar