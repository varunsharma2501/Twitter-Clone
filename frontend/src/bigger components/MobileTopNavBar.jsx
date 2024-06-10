import React from 'react'

import TwitterLogo from '../assets/logo.png'
import MiniAvatar from '../small components/MiniAvatar'


const MobileTopNavBar = () => {
    return (
        <div className='min-[500px]:hidden flex absolute top-0 items-center h-[55px] w-full bg-black border-b-[1px] border-gray-500'>

            <div className='absolute left-3'>
                <MiniAvatar />
            </div>
        
            <div className='rounded-full bg-black h-[40px] overflow-hidden cursor-pointer mr flex justify-center items-center w-full'>
                <img 
                    src={TwitterLogo} 
                    alt='twitter-log' 
                    height={40} 
                    width={40} 
                    className='hover:bg-[#323333]/60 rounded-full'
                />
            </div>
        </div>
    )
}

export default MobileTopNavBar