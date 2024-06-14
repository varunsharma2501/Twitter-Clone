import { axiosTokenInstance } from "../axios/axiosTokenIntsance";
import { getUserSliceRefresh } from "../redux/userSlice";


const handleFollowOrUnfollow = async (e, user_id, doesLoggedInUserFollowsThisUser, setDoesLoggedInUserFollowsThisUser, dispatch) => {
        
    e.stopPropagation(); 
    e.preventDefault(); 
    
    setDoesLoggedInUserFollowsThisUser(!doesLoggedInUserFollowsThisUser); 
    await axiosTokenInstance().patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/follow-or-unfollow/${user_id}`); 
    dispatch(getUserSliceRefresh()); 
}

export default handleFollowOrUnfollow 