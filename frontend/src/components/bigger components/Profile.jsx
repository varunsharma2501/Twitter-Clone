import React, { useContext, useEffect, useState } from 'react' 
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

import { IoMdArrowBack } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import handleFollowOrUnfollow from '../../helpers/handleFollowOrUnfollow'

import { useGetUserDetails } from '../../hooks/useGetUserDetails'
import { useGetAllTweetsOfUser } from '../../hooks/useGetAllTweetsOfUser' 

import DisplayTweet from './DisplayTweet'
import AddTweetHoveringInputBox from './AddTweetHoveringInputBox'
import MiniAvatar from '../small components/MiniAvatar'

import { EditTweetContext } from '../../pages/Home'


const Feed = () => {

    const dispatch = useDispatch(); 

	const {
		editATweet, 
        setEditATweet, 
        editTweetContent, 
        setEditTweetContent, 
        oldTweetContent, 
        setOldTweetContent, 
        toBeEditedTweetId, 
        setToBeEditedTweetId 
	} = useContext(EditTweetContext); 

    const {user_id} = useParams(); 

    useGetUserDetails(user_id); 
    useGetAllTweetsOfUser(user_id); 

    const allTweetsOfUser = useSelector(store => store?.tweets?.allTweetsOfUser); 
    const userDetails = useSelector(store => store?.user?.userDetails); 
    const loggedInUserDetails = useSelector(store => store?.user?.loggedInUserDetails); 

    const isLoggedInUser = (loggedInUserDetails._id === user_id); 
    const [doesLoggedInUserFollowsThisUser, setDoesLoggedInUserFollowsThisUser] = useState(loggedInUserDetails?.following?.includes(user_id)); 

    useEffect( () => {
        setDoesLoggedInUserFollowsThisUser(loggedInUserDetails?.following?.includes(user_id)); 
    }, [user_id, loggedInUserDetails]) 

    const doFollowOrUnfollow = (e) => {
        handleFollowOrUnfollow(e, user_id, doesLoggedInUserFollowsThisUser, setDoesLoggedInUserFollowsThisUser, dispatch); 
    }

  	return (
		<div className='relative scrollbar-none w-[600px] xl:min-w-[600px] min-[500px]:border-x-[1px] max-[500px]:mt-[55px] max-[500px]:mb-[56px] border-gray-500 flex flex-col overflow-y-auto'>
            <div className='sticky top-0 border-t-[1px] border-gray-500 z-10 bg-black flex items-center justify-start'>
                <Link to={'/home'} className='cursor-pointer ml-3 mr-4 hover:bg-[#323333]/60 h-[40px] w-[40px] flex items-center justify-center rounded-full'>
                    <IoMdArrowBack className='text-white text-2xl rounded-full' />
                </Link>
                <div>
                    <div className='text-white text-2xl font-bold mt-2'>
                        {userDetails?.name}
                    </div>
                    <div className='text-xs text-gray-500 mb-1'>
                        {userDetails?.tweetsCount} Posts 
                    </div> 
                </div>
            </div>

            {
                editATweet && 
				<AddTweetHoveringInputBox linkBackButtonTo={`/home/profile/${user_id}`} closeEditATweet={ () => setEditATweet(false) } editTweetContent={editTweetContent} setEditTweetContent={setEditTweetContent} oldTweetContent={oldTweetContent} toBeEditedTweetId={toBeEditedTweetId} />
            }

            {
                !editATweet && 
                <div className='relative'> 
                    <div className='relative'> 
                        <div> 
                            <img src={userDetails?.banner_img} alt='banner' /> 
                        </div>         

                        <div className='absolute top-28 hidden sm:flex left-4'>
                            <MiniAvatar 
                                name={userDetails?.name} 
                                secureImageURL={userDetails?.profile_pic}
                                height={140}
                                width={140}
                                haveBorder={true}
                            />
                        </div>
                        <div className='absolute top-20 flex min-[320px]:hidden left-4'>
                            <MiniAvatar 
                                name={userDetails?.name} 
                                secureImageURL={userDetails?.profile_pic}
                                height={65}
                                width={65}
                                haveBorder={true}
                            />
                        </div>
                        <div className='absolute top-20 hidden min-[320px]:flex min-[400px]:hidden left-4'>
                            <MiniAvatar 
                                name={userDetails?.name} 
                                secureImageURL={userDetails?.profile_pic}
                                height={80}
                                width={80}
                                haveBorder={true}
                            />
                        </div>
                        <div className='absolute top-[95px] min-[400px]:top-[80px] min-[460px]:top-[95px] hidden min-[400px]:flex sm:hidden left-4'>
                            <MiniAvatar 
                                name={userDetails?.name} 
                                secureImageURL={userDetails?.profile_pic}
                                height={130}
                                width={130}
                                haveBorder={true}
                            />
                        </div>
                    </div>

                    <div className='border-t-[1px] pt-12 min-[400px]:pt-[75px] sm:pt-16 border-b-[1px] border-gray-500'>
                        <div className='ml-4 text-xl text-bold text-white'>
                            {userDetails?.name}
                        </div>
                        <div className='ml-4 text-sm text-gray-500'>
                            @{userDetails?.username}
                        </div>

                        <div className='text-white text-md ml-4 mt-4'>
                            <p> {userDetails?.bio} </p>
                        </div>

                        <div className='flex mt-3 ml-4 mb-6'>
                            <div className='text-white mr-4'>
                                <span className='font-bold'> {userDetails?.following?.length} </span> <span className='text-gray-500'> Following </span> 
                            </div>
                            <div className='text-white'>
                                <span className='font-bold'> {userDetails?.followers?.length} </span> <span className='text-gray-500'> Followers </span>  
                            </div>
                        </div>

                        {
                            !isLoggedInUser && 
                            <div className='absolute  w-32 h-10 max-[420px]:top-40 top-56 right-5 rounded-full overflow-hidden'>
                                <button  onClick={doFollowOrUnfollow} className={`absolute top-0 h-10 w-32 rounded-full font-semibold cursor-pointer select-none ${doesLoggedInUserFollowsThisUser ? 'bg-black border-[1px] text-white border-white' : 'bg-white border-[1px] text-black border-black'} `}> 
                                    { doesLoggedInUserFollowsThisUser ? 'Unfollow' : 'Follow' } 
                                </button>
                            </div> 
                        }

                        {
                            isLoggedInUser &&
                            <button onClick={ () => { toast.error('This feature is under development. \n Please wait few days') }} className='absolute max-[420px]:top-40 top-56 right-5 bg-black border-[1px] border-white text-white font-semibold cursor-pointer select-none h-10 w-32 rounded-full'>
                               Edit Profile 
                            </button>
                        }
                    </div>
                    
                    
                    <div>
                        {
                            allTweetsOfUser?.map( (currTweet) => {
                                return <DisplayTweet key={currTweet._id} currTweet={currTweet} openEditATweet={ () => setEditATweet(true) } setEditTweetContent={setEditTweetContent} setOldTweetContent={setOldTweetContent} setToBeEditedTweetId={setToBeEditedTweetId} /> 
                            })
                        }
                    </div>
                </div>
            }
    	</div>
  	)
}

export default Feed