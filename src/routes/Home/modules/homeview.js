// ------------------------------------
// Constants
// ------------------------------------
export const USER_ZIP_SEARCH_CHANGE = 'USER_ZIP_SEARCH_CHANGE'

import { Map, fromJS } from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------

export function userZipSearchChange(val) {
    return {
        type: USER_ZIP_SEARCH_CHANGE,
        payload:val
    }
}

export const actions = {
    userZipSearchChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [USER_ZIP_SEARCH_CHANGE]:(state,action)=>{
        let newState = state.updateIn(['userZipSearch','searchText'],value=>action.payload);
        return newState;
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = Map({
    userZipSearch: Map({
        searchText: ''
    })
});
export function homeviewReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
