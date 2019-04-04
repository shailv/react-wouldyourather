export const ADD_LOGGED_USER = "ADD_LOGGED_USER";
export const USER_LOGOUT = "USER_LOGOUT";

/**
 * @description Logged in user actions
 */

/**
 * @description Set logged in user value for this session
 * @param {Object} user Logged in user
 */
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


/**
 * @description Remove logged in user from state
 * @param {user} user User to logout
 * @param {callback} callback function to invoke after user is logged out
 */
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