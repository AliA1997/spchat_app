import mlbPlayers from '../../sports-data/mlb-players.json';
import mlbTeams from '../../sports-data/mlb-teams.json';
import nbaPlayers from '../../sports-data/nba-players.json';
import nbaTeams from '../../sports-data/nba-teams.json';
import nflTeams from '../../sports-data/nfl-teams.json';

const arr = [...mlbPlayers, ...mlbTeams, ...nbaPlayers,
    ...nbaTeams, ...nflTeams];

const initialState = {
    // doEdit: false,
    // doEditPost: false,
    currentPost: null,
    createdPost: null,
    sports_data: arr
}

// const START_EDIT_COMMENT = 'START_EDIT_COMMENT';
// const END_EDIT_COMMENT = 'END_EDIT_COMMENT';
// const START_EDIT_POST = 'START_EDIT_POST'; 
// const END_EDIT_POST = 'END_EDIT_POST';
const START_GET_POST = 'START_GET_POST';
const POST_CREATED_POPUP = 'POST_CREATED_POPUP';
const POST_CLOSED_POPUP = 'POST_CLOSED_POPUP';

export default (state = initialState, action) => {
    switch(action.type) {
        // case START_EDIT_COMMENT:
        //     return {...state, doEdit: true};
        // case END_EDIT_COMMENT:
        //     return {...state, doEdit: false};
        // case START_EDIT_POST:
        //     return {...state, doEditPost: true};
        // case END_EDIT_POST:
        //     return {...state, doEditPost: false};
        case START_GET_POST:
            return {...state, currentPost: action.payload};
        case POST_CREATED_POPUP:
            return {...state, createdPost: action.payload};
        case POST_CLOSED_POPUP:
            return {...state, createdPost: null};
        default: 
        return state;
    }
}

// export const edit = () => {
//     return {
//         type: START_EDIT_COMMENT
//     }
// }

// export const doneEdit = () => {
//     return {
//         type: END_EDIT_COMMENT
//     }
// }

export const getPost = (post)  => {
    return {
        type: START_GET_POST,
        payload: post
    };
}

export const postCreated = (post) => {
    return {
        type: POST_CREATED_POPUP,
        payload: post
    }
}

export const postFinished = () => {
    return {
        type: POST_CLOSED_POPUP,
    }
}


// export const editPost = () => {
//     return {
//         type: START_EDIT_POST,
//     }
// }
// export const doneEditPost = () => {
//     return {
//         type: END_EDIT_POST
//     };
// }

