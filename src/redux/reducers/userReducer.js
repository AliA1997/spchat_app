const initialState = {
    currentUser: null
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
        return {...state, currentUser: action.payload};
        case LOGOUT:
        return {...state, currentUser: null};
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
