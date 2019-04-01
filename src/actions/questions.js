import {_saveQuestion, _saveQuestionAnswer} from '../_DATA';

/** Constants */
//export const ADD_QUESTION = "ADD_QUESTION"
export const SAVE_QUESTION = "SAVE_QUESTION"
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"

/** Action creators */
// export function getAllQuestions(){
//     return (dispatch) => {   
//         return _getQuestions().then((results) => (
//             dispatch({
//                 type: RECEIVE_DATA,
//                 questions: results
//             })
//         ));
//     }
// }
export function saveQuestion(question, callback){
    return (dispatch) => {   
        return _saveQuestion(question).then((result) => {
            dispatch(addQuestion(result));
            callback(result);
        }
            //what to do with the results?
        )
    }
}

export function saveQuestionAnswer(savedAnswer, callback){
    return (dispatch) => {
        return _saveQuestionAnswer(savedAnswer).then(() => {
            
            dispatch(addQuestionAnswer(savedAnswer));
            callback();
        });
    }
}

function addQuestion(question){
    return{
        type: SAVE_QUESTION,
        question
    }
}

function addQuestionAnswer(savedAnswer){
    console.log(savedAnswer);
    const {authedUser, qid, answer} = savedAnswer;
    return{
        type: SAVE_QUESTION_ANSWER,
        user: authedUser, 
        qid, 
        answer
    }
}
