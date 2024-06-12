import { resetLoggedInUserDetails, resetUserDetails, resetAllOtherUsersDetails } from '../redux/userSlice' 
import { resetAllExistingTweets, resetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser, resetAllTweetsOfUser } from '../redux/tweetSlice' 


export const logoutCleanUp = (dispatch) => {
    
    dispatch(resetLoggedInUserDetails()); 
    dispatch(resetUserDetails()); 
    dispatch(resetAllOtherUsersDetails()); 

    dispatch(resetAllExistingTweets()); 
    dispatch(resetAllTweetsOfPeopleWhoAreFollowedByLoggedInUser()); 
    dispatch(resetAllTweetsOfUser()); 

    localStorage.removeItem('jwt'); 
}