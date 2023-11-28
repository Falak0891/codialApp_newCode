import { combineReducers } from 'redux';
import posts from './Posts';
import auth from './Auth';
import profile from './Profile';
import friends from './Friends';

export default combineReducers({
  posts,
  auth,
  profile,
  friends,
});
