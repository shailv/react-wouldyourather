export const ADD_LOGGED_USER = "ADD_LOGGED_USER";
export const USER_LOGOUT = "USER_LOGOUT";

export function addLoggedinUser(user) {
    return (dispatch) => {
        dispatch(setLoggedinUser(user))
    }
}

function setLoggedinUser(user) {
    return {
        type: ADD_LOGGED_USER,
        loggedInUser: user
    }
}

export function userLogout(user, callback) {
    return (dispatch) => {
        dispatch(logout(user));
        callback();
    }
}

function logout(user) {
    return {
        type: USER_LOGOUT,
        user
    }
}