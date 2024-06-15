import { resetLoggedInUserDetails, resetUserDetails, resetAllOtherUsersDetails } from '../redux/userSlice' 
import { resetAllDisplayTweets, resetWhichDivIsActive } from '../redux/tweetSlice' 


export const logoutCleanUp = (dispatch) => {
    
    dispatch(resetLoggedInUserDetails()); 
    dispatch(resetUserDetails()); 
    dispatch(resetAllOtherUsersDetails()); 

    dispatch(resetAllDisplayTweets()); 
    dispatch(resetWhichDivIsActive()); 
    
    localStorage.removeItem('jwt'); 
}