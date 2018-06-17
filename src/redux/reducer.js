import mlbPlayers from '../sports-data/mlb-players.json';
import mlbTeams from '../sports-data/mlb-teams.json';
import nbaPlayers from '../sports-data/nba-players.json';
import nbaTeams from '../sports-data/nba-teams.json';
import nflTeams from '../sports-data/nfl-teams.json';

const arr = [...mlbPlayers, ...mlbTeams, ...nbaPlayers,
    ...nbaTeams, ...nflTeams];
const initialState = {
    doEditPost: false,
    doEdit: false,
    isUserPost: false,
    doSearch: false,
    currentUser: null,
    currentPost: null,
    searchItems: null,
    sports_data: arr
};

//Action TYpes 
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const START_EDIT_COMMENT = 'START_EDIT_COMMENT';
const END_EDIT_COMMENT = 'END_EDIT_COMMENT';
const START_EDIT_POST = 'START_EDIT_POST';
const END_EDIT_POST = 'END_EDIT_POST';
const USER_POST = 'USER_POST';
const START_GET_POST = 'START_GET_POST';
const DONE_GET_POST = 'DONE_GET_POST';
const SEARCH_ITEMS = 'SEARCH_ITEMS';
const DONE_SEARCH_ITEMS = 'DONE_SEARCH_ITEMS';

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, currentUser: action.payload};
        case LOGOUT:
            return {...state, currentUser: null};
        case START_EDIT_COMMENT:
            return {...state, doEdit: true};
        case END_EDIT_COMMENT:
            return {...state, doEdit: false};
        case START_EDIT_POST:
            return {...state, doEditPost: true};
        case END_EDIT_POST:
            return {...state, doEditPost: false};
        case USER_POST:
            return {...state, isUserPost: true};
        case START_GET_POST:
            return {...state, currentPost: action.payload};
        case DONE_GET_POST:
            return {...state, currentPost: null};
        case SEARCH_ITEMS:
            return {...state, doSearch: true, searchItems: action.payload};
        case DONE_SEARCH_ITEMS:
            return {...state, doSearch: false};
        default: 
        return state;
    }
};

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

export const edit = () => {
    return {
        type: START_EDIT_COMMENT
    }
}

export const doneEdit = () => {
    return {
        type: END_EDIT_COMMENT
    }
}

export const getPost = (post)  => {
    return {
        type: START_GET_POST,
        payload: post
    };
}

export const editPost = () => {
    return {
        type: START_EDIT_POST,
    }
}
export const doneEditPost = () => {
    return {
        type: END_EDIT_POST
    };
}


export const getSearch = (items) => {
    return {
        type: SEARCH_ITEMS,
        payload: items
    };
}

export const doneSearch = () => {
    return {
        type: DONE_SEARCH_ITEMS
    }
}