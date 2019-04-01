export const ADD_LOGGED_USER = "ADD_LOGGED_USER";

export function addLoggedinUser(user){
    return (dispatch) => {
        dispatch(setLoggedinUser(user))
    }
}

function setLoggedinUser(user){
    return{
        type: ADD_LOGGED_USER,
        loggedInUser: user
    }
}
