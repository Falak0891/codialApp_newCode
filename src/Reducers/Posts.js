import { UPDATE_POSTS } from "../Actions/Action_Types";

export default function posts(state=[] , action){
    switch(action.type){
        case UPDATE_POSTS :
            return action.posts;

        default :
        return state;
    }
} 