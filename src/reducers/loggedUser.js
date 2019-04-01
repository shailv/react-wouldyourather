import {ADD_LOGGED_USER} from '../actions/loggedUser'

export default function loggedInUser(state=[],action){
    if(action.type === ADD_LOGGED_USER){
        if(action.loggedInUser.length > 0);
         return action.loggedInUser[0];
    }
    return state;
 }
 