import {
    SAVE_QUESTION,
    SAVE_QUESTION_ANSWER
} from '../actions/questions'
import {RECEIVE_DATA} from '../actions/shared'

export default function questions(state=[],action){
    
    switch(action.type){
        case RECEIVE_DATA:
            return action.questions;
        case SAVE_QUESTION: 
            const newQuestion = action.question;
            return state.concat(newQuestion);
        case SAVE_QUESTION_ANSWER: 
            const index = state.findIndex(q=> q.id == action.qid);
            const question = state[index];

            if(action.answer === "optionOne"){
                question.optionOne.votes.push(action.user);
            }
            else{
                question.optionTwo.votes.push(action.user);
            }
            state[index] = question;
            return state;//.concat([action.questions]);
        default:
            return state;
    }
}