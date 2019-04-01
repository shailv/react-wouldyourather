import {RECEIVE_DATA} from '../actions/shared'

export default function users(state=[],action){
    if(action.type === RECEIVE_DATA){
         return action.users;
     }
     return state;
 }
 