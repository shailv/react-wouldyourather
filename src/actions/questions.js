import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

/**
 * @description User question actions
 */
/** Constants */
export const SAVE_QUESTION = "SAVE_QUESTION"
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"

/**
 * @description Save a new question
 * @param {Object} question New question to add
 * @param {Object} callback function to invoke after question is added
 */
export function saveQuestion(question, callback) {
    return (dispatch) => {
        return _saveQuestion(question).then((result) => {
            dispatch(addQuestion(result));
            callback(result);
        }
        )
    }
}
function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

/**
 * @description Save a new answer
 * @param {Object} savedAnswer Object with user, answer and question id
 * @param {Object} callback function to invoke after answer is added
 */
export function saveQuestionAnswer(savedAnswer) {
    return (dispatch) => {
        return _saveQuestionAnswer(savedAnswer).then(() => {
            dispatch(addQuestionAnswer(savedAnswer));
        });
    }
}

function addQuestionAnswer(savedAnswer) {
    const { authedUser, qid, answer } = savedAnswer;
    return {
        type: SAVE_QUESTION_ANSWER,
        user: authedUser,
        qid,
        answer
    }
}
