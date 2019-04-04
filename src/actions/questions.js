import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

/** Constants */
export const SAVE_QUESTION = "SAVE_QUESTION"
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"

export function saveQuestion(question, callback) {
    return (dispatch) => {
        return _saveQuestion(question).then((result) => {
            dispatch(addQuestion(result));
            callback(result);
        }
        )
    }
}

export function saveQuestionAnswer(savedAnswer, callback) {
    return (dispatch) => {
        return _saveQuestionAnswer(savedAnswer).then(() => {
            dispatch(addQuestionAnswer(savedAnswer));
            callback();
        });
    }
}

function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
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
