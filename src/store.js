import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {_getUsers,_getQuestions,_saveQuestion,_saveQuestionAnswer} from './_DATA';

const store = createStore(
    combineReducers({
        users,
        questions
    }), 
    applyMiddleware(thunk));

/** Constants */
const ADD_QUESTION = "ADD_QUESTION"
const SAVE_QUESTION = "SAVE_QUESTION"
const RECEIVE_DATA = "RECEIVE_DATA"
const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"

/** Reducers */
function users(state=[],action){
   if(action.type === 'RECEIVE_DATA'){
        return action.users;
    }
    return state;
}

function questions(state=[],action){
    switch(action.type){
        case RECEIVE_DATA:
            return action.questions;
        case SAVE_QUESTION: 
            return state.concat([action.questions]);
        case SAVE_QUESTION_ANSWER: 
            return state.concat([action.questions]);
        default:
            return state;
    }
}
/**Add users to state */
// store.dispatch(() => ({
//     type:'ADD_USERS',
//     users:datastore._getUsers()
// }));

/** Action creators */
//Questions
function getAllQuestions(){
    return (dispatch) => {   
        return _getQuestions().then((results) => (
            dispatch({
                type: RECEIVE_DATA,
                questions: results
            })
        ));
    }
}
function saveQuestion(question){
    return (dispatch) => {   
        return _saveQuestion(question).then((results) => (
            dispatch({
                type: SAVE_QUESTION,
                questions: results
            })
        ));
    }
}

function saveQuestionAnswer(user,questionID,answer){
    return (dispatch) => {   
        return _saveQuestionAnswer(user,questionID,answer).then((results) => (
            dispatch({
                type: SAVE_QUESTION_ANSWER,
                questions: results
            })
        ));
    }
}

//Users
function getAllUsers(){
    return (dispatch) => {   
        return _getQuestions().then((results) => (
            dispatch({
                type: RECEIVE_DATA,
                users:users
            })
        ));
    }
}

export default store;

/**
 * 
 * function asyncActionCreator (id) {
  return (dispatch) => {
    return API.fetchUser(id)
    .then((user) => {
      dispatch(addUser(user));
    });
  };
}
 */