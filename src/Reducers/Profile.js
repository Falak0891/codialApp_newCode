import { USER_PROFILE_SUCCESS, USER_PROFILE_FAILED, FETCH_USER_PROFILE } from "../Actions/Action_Types";

const initialProfileState = {
    user:{},
    error : null,
    inProgress: false,
};

export default function profile(state=initialProfileState , action){
    switch(action.type){
        case USER_PROFILE_SUCCESS :
            return {
                ...state,
                user : action.user,
                inProgress: false,
            };
        case USER_PROFILE_FAILED :
            return {
                ...state,
                error : action.error,
            };
        case FETCH_USER_PROFILE :
            return {
                ...state,
                inProgress:true,
            };    

        default :
        return state;
    }
} 