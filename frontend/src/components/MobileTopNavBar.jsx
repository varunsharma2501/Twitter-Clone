import React from 'react'

import { IoLogOutOutline } from "react-icons/io5" 

import TwitterLogo from '../assets/logo.png'
import Avatar from './Avatar'


const MobileTopNavBar = () => {
    return (
        <div className='min-[500px]:hidden flex absolute top-0 justify-between items-center h-[55px] w-full bg-black border-b-[1px] border-gray-500'>

            <div>
                <IoLogOutOutline className='w-[40px] h-[40px] text-white bg-black rounded-full rotate-180 ml-5 hover:bg-red-600 p-2' /> 
            </div>
            
            <div className='rounded-full bg-black h-[40px] w-[40px] overflow-hidden cursor-pointer hover:bg-[#323333]/60'>
                <img 
                    src={TwitterLogo} 
                    alt='twitter-log' 
                    height={40} 
                    width={40} 
                />
            </div>

            <div className='mr-3'>
                <Avatar heightVal={38} widthVal={38} />
            </div>
        
        </div>
    )
}

export default MobileTopNavBar