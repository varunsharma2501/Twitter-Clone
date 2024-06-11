import React from 'react' 

import { IoMdArrowBack } from 'react-icons/io'

import { useSelector } from 'react-redux'
import MiniAvatar from '../small components/MiniAvatar'
import { Link, useParams } from 'react-router-dom'
import { useGetOtherUserDetails } from '../../hooks/useGetOtherUserDetails'


const Feed = () => {

    const {user_id} = useParams(); 
    useGetOtherUserDetails(user_id); 

    const user = useSelector(store => store?.otherUsers?.otherUserDetails); 

  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
            <div className='flex items-center justify-start'>
                <Link to={'/home'} className='cursor-pointer ml-3 mr-4 hover:bg-[#323333]/60 h-[40px] w-[40px] flex items-center justify-center rounded-full'>
                    <IoMdArrowBack className='text-white text-2xl rounded-full' />
                </Link>
                <div>
                    <div className='text-white text-2xl font-bold mt-2'>
                        {user?.name}
                    </div>
                    <div className='text-xs text-gray-500 mb-1'>
                        10 Posts 
                    </div> 
                </div>
            </div>

            <div className='relative'>
                <div> 
                    <img src={user?.banner_img} alt='banner' /> 
                </div>         

                <div className='absolute top-28 hidden sm:flex left-4'>
                    <MiniAvatar 
                        name={user?.name} 
                        secureImageURL={user?.profile_pic}
                        height={140}
                        width={140}
                        haveBorder={true}
                    />
                </div>
                <div className='absolute top-20 flex min-[400px]:hidden left-4'>
                    <MiniAvatar 
                        name={user?.name} 
                        secureImageURL={user?.profile_pic}
                        height={80}
                        width={80}
                        haveBorder={true}
                    />
                </div>
                <div className='absolute top-[80px] hidden min-[400px]:flex sm:hidden left-4'>
                    <MiniAvatar 
                        name={user?.name} 
                        secureImageURL={user?.profile_pic}
                        height={120}
                        width={120}
                        haveBorder={true}
                    />
                </div>
            </div>

            <div className='h-60 pt-12 min-[400px]:pt-[75px] sm:pt-16'>
                <div className='ml-4 text-xl text-bold text-white'>
                    {user?.name}
                </div>
                <div className='ml-4 text-sm text-gray-500'>
                    @{user?.username}
                </div>

                <div className='text-white text-md ml-4 mt-4'>
                    <p> {user?.bio} </p>
                </div>

                <div className='flex mt-3 ml-4'>
                    <div className='text-white mr-4'>
                        <span className='font-bold'> {user?.following?.length} </span> <span className='text-gray-500'> Following </span> 
                    </div>
                    <div className='text-white'>
                        <span className='font-bold'> {user?.followers?.length} </span> <span className='text-gray-500'> Followers </span>  
                    </div>
                </div>
            </div>
    	</div>
  	)
}

export default Feed