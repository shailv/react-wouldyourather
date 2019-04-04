import {combineReducers} from 'redux';
import questions from './questions';
import users from './users';
import loggedInUser from './loggedUser';

/**
 * @description Combine all reducers
 */
export default combineReducers({
    questions,
    users,
    loggedInUser
})