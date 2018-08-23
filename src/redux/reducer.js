import post from './reducers/postReducer';
import user from './reducers/userReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    post,
    user, 
});


