// ------------------------------------
// Constants
// ------------------------------------
export const USER_ADDRESS_SEARCH_CHANGE = 'USER_ADDRESS_SEARCH_CHANGE'

import { Map, fromJS } from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------

export function userAddressSearchChange(val) {
    return {
        type: USER_ADDRESS_SEARCH_CHANGE,
        payload:val
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [USER_ADDRESS_SEARCH_CHANGE]:(state,action)=>{
        return state.updateIn(['userAddressSearch','searchText'],value=>action.payload);
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = Map({
    userAddressSearch: Map({
        searchText: ''
    })
});
export function homeviewReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
