import {ADD_LOGGED_USER} from '../actions/loggedUser'
import {SAVE_QUESTION_ANSWER} from '../actions/questions'

export default function loggedInUser(state=[],action){
    if(action.type === ADD_LOGGED_USER){
        if(action.loggedInUser.length > 0);
         return action.loggedInUser[0];
    }
    else if(action.type === SAVE_QUESTION_ANSWER){
        const answer = { [action.qid]: action.answer};
        
        return Object.assign({}, state, { answers: Object.assign({}, state.answers, answer) });
     }
    return state;
 }
 