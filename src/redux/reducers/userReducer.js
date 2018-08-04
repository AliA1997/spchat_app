const initialState = {
    currentUser: null,
    registeredUser: null
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_REGISTERED_POPUP = 'USER_REGISTERED_POPUP';
const USER_REGISTERED_FINISHED_POPUP = 'USER_REGISTERED_FINISHED_POPUP';

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
        return {...state, currentUser: action.payload};
        case LOGOUT:
        return {...state, currentUser: null};
        case USER_REGISTERED_POPUP:
        return {...state, registeredUser: action.payload};
        case USER_REGISTERED_FINISHED_POPUP:
        return {...state, registeredUser: null};
        default: 
        return state;
    }
}
export const loginUser = (user) => {
    console.log('Reducer user----------', user);
    return {
        type: LOGIN,
        payload: user
    }
}


export const logoutUser = () => {
    return {
        type: LOGOUT
    }
}

export const userRegistered = (user) => {
    return {
        type: USER_REGISTERED_POPUP,
        payload: user 
    }
}

export const userFinishedRegistered = () => {
    return {
        type: USER_REGISTERED_FINISHED_POPUP
    }
}
