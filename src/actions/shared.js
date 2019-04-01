import {_getUsers, _getQuestions} from '../_DATA';

export const RECEIVE_DATA = "RECEIVE_DATA"

export function handleInitialData(){
    return (dispatch) => {   
        return Promise.all([
            _getUsers(),
            _getQuestions()
        ]).then(([users,questions]) => {
        dispatch(receiveData(users,questions))
        })
    }
}

function receiveData(users,questions){
    const allUsers = Object.values(users);
    const userObject = Object.assign([],allUsers);
    const userArray = Object.keys(userObject).map(u=>userObject[u]);

    const allQuestions = Object.values(questions);
    const questionObject = Object.assign([],allQuestions);
    const questionArray = Object.keys(questionObject).map(u=>questionObject[u]);
    
    return{
        type: RECEIVE_DATA,
        users: userArray,
        questions: questionArray
    }
}