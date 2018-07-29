const initialState = {
    searchCriteria: '',
    search: '',
}

const SEARCH = 'SEARCH';
const DONE_SEARCH = 'DONE_SEARCH';

export default (state = initialState, action) => {
    switch(action.type) {
        case SEARCH:
            return {...state, search: action.value, searchCriteria: action.criteria};
        case DONE_SEARCH:
            return {...state, search: '', searchCriteria: ''};
        default: 
        return state;
    }
}

export const getSearch = (searchString, criteria='title') => {
    return {
        type: SEARCH,
        value: searchString, 
        criteria
    };
}

export const doneSearch = () => {
    return {
        type: DONE_SEARCH
    }
}