const initialState = {
    searchItems: null,
    searchString: '',
}

const SEARCH_ITEMS = 'SEARCH_ITEMS';
const DONE_SEARCH_ITEMS = 'DONE_SEARCH_ITEMS';

export default (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_ITEMS:
            return {...state, doSearch: true, searchItems: action.payload, searchString: action.value};
        case DONE_SEARCH_ITEMS:
            return {...state, doSearch: false, searchString: ''};
        default: 
        return state;
    }
}

export const getSearch = (searchString, items) => {
    return {
        type: SEARCH_ITEMS,
        value: searchString, 
        payload: items
    };
}

export const doneSearch = () => {
    return {
        type: DONE_SEARCH_ITEMS
    }
}