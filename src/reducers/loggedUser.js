import { ADD_LOGGED_USER, USER_LOGOUT } from '../actions/loggedUser'
import { SAVE_QUESTION_ANSWER } from '../actions/questions'

/**
 * @description Reducer to manage logged user
 */
export default function loggedInUser(state = [], action) {
    switch (action.type) {
        case ADD_LOGGED_USER:
            return action.loggedInUser[0];

        case SAVE_QUESTION_ANSWER:
            const answer = { [action.qid]: action.answer };
            return Object.assign({}, state, { answers: Object.assign({}, state.answers, answer) });

        case USER_LOGOUT:
            const newState = {};
            return newState;
        default:
            return state;
    }
}
