const initialState = {
    currentUser: null
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE_FAVORITE_PLAYERS = 'UPDATE_FAVORITE_PLAYERS';
const UPDATE_FAVORITE_TEAMS = 'UPDATE_FAVORITE_TEAMS';

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
        return {...state, currentUser: action.payload};
        case LOGOUT:
        return {...state, currentUser: null};
        case UPDATE_FAVORITE_PLAYERS:
        return {...state, currentUser: {favorite_players: action.payload}};
        case UPDATE_FAVORITE_TEAMS:
        return {...state, currentUser: {...state.currentUser, favorite_teams: action.payload}}
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

export const updateFavoritePlayers = (newPlayers) => {
    // console.log('newPlayers------------', newPlayers);
        return {
            type: UPDATE_FAVORITE_PLAYERS,
            payload: newPlayers
        };
}

export const updateFavoriteTeams = (newTeams) => {
        return {
            type: UPDATE_FAVORITE_PLAYERS,
            payload: newTeams
        };
}
