// ------------------------------------
// Constants
// ------------------------------------
export const LEFTNAV_OPEN_CLOSE = 'LEFTNAV_OPEN_CLOSE';
export const USER_ZIP_SEARCH_CHANGE = 'USER_ZIP_SEARCH_CHANGE'

import { Map, fromJS } from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------
export function leftnavstatechange(state) {
    return {
        type: LEFTNAV_OPEN_CLOSE
    }
}
export function userZipSearchChange(val) {
    return {
        type: USER_ZIP_SEARCH_CHANGE,
        payload:val
    }
}

export const actions = {
    leftnavstatechange,
    userZipSearchChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LEFTNAV_OPEN_CLOSE]: (state, action) => {
        return state.set('leftNavOpen', !state.get('leftNavOpen'));
    },
    [USER_ZIP_SEARCH_CHANGE]:(state,action)=>{
        let newState = state.updateIn(['userZipSearch','searchText'],value=>action.payload);
        return newState;
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = Map({
    leftNavOpen: false,
    userZipSearch: Map({
        searchText: ''
    })
});
export function homeviewReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
