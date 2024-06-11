import React from 'react'

import MiniAvatar from './MiniAvatar.jsx'


const SearchResultUserCard = ({onClose, appUser}) => {

    const selectedUser = (e) => {
        // onClose(); 
    }    

    return (
        <div onClick={selectedUser} key={appUser._id} className='relative flex items-center gap-3 bg-black px-2 py-1.5 cursor-pointer hover:bg-[#323333]'> 
            <div className='mr-1'>
                <MiniAvatar />
            </div>
            <div className='overflow-hidden flex flex-col'>
                <div className='font-semibold text-white'> 
                    {appUser?.name} 
                </div> 
                <p className='text-sm text-white'> {appUser?.email} </p> 
            </div> 
        </div> 
    )
}

export default SearchResultUserCard 