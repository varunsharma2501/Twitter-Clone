import { axiosTokenInstance } from "../axios/axiosTokenIntsance";
import { getTweetSliceRefresh } from "../redux/tweetSlice";
import { setFollowOrUnfollow } from "../redux/userSlice";


const handleFollowOrUnfollow = async (e, dispatch, currUserId) => {
    
    e.stopPropagation(); 
    e.preventDefault(); 
    
    dispatch(setFollowOrUnfollow({ 
        toBeFollowedOrUnfollowedUserId : currUserId 
    })); 
    
    const res = await axiosTokenInstance().patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/follow-or-unfollow/${currUserId}`); 
    
    dispatch(getTweetSliceRefresh()); 
}

export default handleFollowOrUnfollow 