import { ADD_FRIEND, FETCH_FRIENDS_SUCCESS, REMOVE_FRIEND } from '../Actions/Action_Types';

const defaultFriendsState = [];

// profile reducer
export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friend);
    case REMOVE_FRIEND:
      const newArr = state.filter(friend => friend.to_user._id !== action.userId);
      return newArr;
    default:
      return state;
  }
}
