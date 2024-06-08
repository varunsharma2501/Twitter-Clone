import React from 'react'

import { HiOutlineUser } from "react-icons/hi2" 
import { GoHomeFill, GoBell } from "react-icons/go"  
import { IoSearchOutline, IoBookmarkOutline } from "react-icons/io5" 


const MobileBottomNavBar = () => {

    
    const iconCSS = 'w-[30px] h-[30px] text-white bg-black rounded-xl'; 
    const containerOfIcon = 'h-[50px] w-[50px] hover:bg-[#323333]/60 select-none flex items-center justify-center'; 

    return (
        <div className='min-[500px]:hidden absolute bottom-0 h-[55px] w-full flex items-center bg-black justify-around border-t-[1px] border-gray-500'>
            <div className={containerOfIcon}>
                <GoHomeFill className={iconCSS} />
            </div>

            <div className={containerOfIcon}>
                <IoSearchOutline className={iconCSS} /> 
            </div>

            <div className={containerOfIcon}>
                <GoBell className={iconCSS} /> 
            </div>
            
            <div className={containerOfIcon}>
                <HiOutlineUser className={iconCSS} /> 
            </div>
            
            <div className={containerOfIcon}>
                <IoBookmarkOutline className={iconCSS} /> 
            </div>
        </div>
    )
}

export default MobileBottomNavBar