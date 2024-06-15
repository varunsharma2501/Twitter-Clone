import toast from 'react-hot-toast'
import { logoutCleanUp } from './logoutCleanUp'
import { setWhichDivIsActive } from '../redux/tweetSlice'

export const navigateToHome = (e, dispatch, navigate) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    dispatch(setWhichDivIsActive('for-you-div-is-active')); 
    navigate('/home'); 
}

export const voluntaryLogout = (e, dispatch, navigate,) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    logoutCleanUp(dispatch); 
    toast.success('User logged out successfully'); 
    navigate('/'); 
}

export const navigateToProfilePage = (e, dispatch, navigate, loggedInUserDetails) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    dispatch(setWhichDivIsActive('profile-div-is-active')); 
    navigate(`/home/profile/${loggedInUserDetails?._id}`); 
}