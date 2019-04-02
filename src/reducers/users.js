import {RECEIVE_DATA} from '../actions/shared'
import {SAVE_QUESTION_ANSWER} from '../actions/questions'

export default function users(state=[],action){
    if(action.type === RECEIVE_DATA){
         return action.users;
     }
     else if(action.type === SAVE_QUESTION_ANSWER){
        const answer = { [action.qid]: action.answer};
        
        return state.map(u=> u.id === action.user ? Object.assign({}, u, { answers: Object.assign({}, u.answers, answer) }) : u);
     } 
     return state;
 }
 