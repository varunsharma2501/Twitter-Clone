import React, { useEffect } from 'react'

import { HiOutlineUser } from "react-icons/hi2" 
import { GoHomeFill } from "react-icons/go"  
import { IoSearchOutline, IoLogOutOutline } from "react-icons/io5" 

import toast from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux' 
import { Link, useNavigate } from 'react-router-dom'

import TwitterLogo from '../../assets/logo.png'
import AddTweetButton from '../small components/AddTweetButton'
import MiniAvatar from '../small components/MiniAvatar'
import { logoutCleanUp } from '../../helpers/logoutCleanUp'


const LeftSideBar = () => {

    const loggedInUserDetails = useSelector(store => store.user.loggedInUserDetails); 

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    
    const logoutUser = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 

        logoutCleanUp(dispatch); 
        toast.success('User logged out successfully'); 
        
        navigate('/'); 
    }

    const iconCSS = 'w-[28px] h-[28px] text-white '; 
    const iconLabelCSS = 'hidden xl:flex items-center text-white px-3'; 
    const containerOfIconAndLogo = 'flex h-full w-fit mx-auto xl:ml-5 my-2 hover:bg-[#323333]/60 p-2 rounded-full select-none '; 
    const row = 'w-full rounded-full cursor-pointer'; 

    return (
        
        <div className='hidden min-[500px]:flex w-[70px] max-w-[70px] h-full flex-col justify-between xl:min-w-[270px]'>
            
            <div>

                <div className='rounded-full bg-black h-[40px] w-[40px] overflow-hidden cursor-pointer hover:bg-[#323333]/60 my-4 mx-auto xl:ml-6'>
                    <Link to={'/home'}>
                        <img 
                            src={TwitterLogo} 
                            alt='twitter-log' 
                            height={40} 
                            width={40} 
                        />
                    </Link>
                </div>

                <div>
                    <div className={row}>
                        <Link to={'/home'}>
                            <div className={containerOfIconAndLogo}>
                                <div>
                                    <GoHomeFill className={iconCSS} />
                                </div>
                                <div className={iconLabelCSS}>
                                    Home
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={row}>
                        <div className={containerOfIconAndLogo}>
                            <div>
                                <IoSearchOutline className={iconCSS} /> 
                            </div>
                            <div className={iconLabelCSS}>
                                Explore 
                            </div>
                        </div>
                    </div>
                    <div className={row}>
                        <Link to={`/home/profile/${loggedInUserDetails?._id}`} className={containerOfIconAndLogo}>
                            <div>
                                <HiOutlineUser className={iconCSS} /> 
                            </div>
                            <div className={iconLabelCSS}>
                                Profile 
                            </div>
                        </Link>
                    </div>
                    <div className={row}>
                        <div onClick={logoutUser} className={containerOfIconAndLogo}>
                            <div>
                                <IoLogOutOutline className={iconCSS  + 'rotate-180'} /> 
                            </div>
                            <div className={iconLabelCSS}>
                                Logout 
                            </div>
                        </div>
                    </div>
                </div>

                <button className='hidden xl:flex justify-center items-center bg-[#1d9bf0] h-[50px] w-[220px] hover:bg-blue-500 py-3 px-[96px] mt-2 rounded-full ml-4 overflow-hidden'>
                    <p className='text-white font-bold text-lg'> Post </p> 
                </button>

                <AddTweetButton CSS={'xl:hidden h-[40px] w-[40px] bg-blue-500 rounded-full shadow-[0px_0px_5px_1px_rgba(247,247,247,1)] overflow-hidden my-4 mx-auto xl:ml-6 flex items-center justify-center'} />
        
            </div>
            
            <Link to={`/home/profile/${loggedInUserDetails?._id}`} >
                <div className='flex xl:px-4 xl:py-2 xl:h-[65px] xl:w-[240px] rounded-full cursor-pointer select-none hover:bg-[#323333]/60 mx-auto xl:ml-4 mb-3'> 
                    <MiniAvatar 
                        userId={loggedInUserDetails?._id}
                        name={loggedInUserDetails?.name}
                        secureImageURL={loggedInUserDetails?.profile_pic}
                        height={48}
                        width={48}
                    /> 
                    <div className='hidden ml-1 xl:ml-3 xl:flex xl:flex-col'> 
                        <h3 className='text-white font-semibold p-0 m-0'> {loggedInUserDetails?.name} </h3>
                        <p className='text-gray-500 text-md'> @{loggedInUserDetails?.username} </p>
                    </div> 
                </div>
            </Link>
        </div>
    )
}

export default LeftSideBar