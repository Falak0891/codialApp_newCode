import { APIUrls } from '../Helpers/Urls';
import { getAuthTokenFromLocalStorage } from '../Helpers/Utils';
import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED,
  FETCH_USER_PROFILE,
} from './Action_Types';

export function fetchUserProfileStart(){
    return {
        type: FETCH_USER_PROFILE,
    }
}

export function userProfileSuccess(user){
    return {
        type: USER_PROFILE_SUCCESS,
        user,
    }
}

export function userProfileFailed(error){
    return {
        type: USER_PROFILE_FAILED,
        error,
    }
}

export function fetchUserProfile(userId){
    return (dispatch) =>{
        dispatch(fetchUserProfileStart());

        const url = APIUrls.userProfile(userId);

        fetch(url, {
            // method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}` // Remove Auth if not required
            },
          })
          .then((response) => response.json())
          .then((data) => {
            if(data.success){
            
               dispatch(userProfileSuccess(data.data.user));
               return;
            }
            
          });
    }
}