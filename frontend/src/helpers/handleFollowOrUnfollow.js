import { axiosTokenInstance } from "../axios/axiosTokenIntsance";
import { getTweetSliceRefresh } from "../redux/tweetSlice";
import { setFollowOrUnfollow } from "../redux/userSlice";


const handleFollowOrUnfollow = async (e, dispatch, currUserId, whichDivIsActive, setAreDisplayTweetLoading) => {
    
    e.stopPropagation(); 
    e.preventDefault(); 
    
    if(whichDivIsActive === 'following-div-is-active'){
        setAreDisplayTweetLoading(true);
    }

    dispatch(setFollowOrUnfollow({ 
        toBeFollowedOrUnfollowedUserId : currUserId 
    })); 

    const res = await axiosTokenInstance().patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/follow-or-unfollow/${currUserId}`); 

    console.log(whichDivIsActive); 

    if(whichDivIsActive === 'following-div-is-active'){
        dispatch(getTweetSliceRefresh()); 
    }
}

export default handleFollowOrUnfollow 