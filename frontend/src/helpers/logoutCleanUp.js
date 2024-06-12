import { logout } from '../redux/userSlice'
import { resetOtherUserDetails } from '../redux/otherUsersSlice'
import { resetAllOtherUsersDetails } from '../redux/otherUsersSlice'
import { resetAllExistingTweets } from '../redux/tweetSlice'


export const logoutCleanUp = (dispatch) => {
    
    dispatch(logout()); 
    dispatch(resetOtherUserDetails()); 
    dispatch(resetAllOtherUsersDetails()); 
    dispatch(resetAllExistingTweets()); 

    localStorage.removeItem('jwt'); 
}