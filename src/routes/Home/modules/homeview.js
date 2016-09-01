// ------------------------------------
// Constants
// ------------------------------------
export const USER_ADDRESS_SEARCH_CHANGE = 'USER_ADDRESS_SEARCH_CHANGE'
export const USER_ADDRESS_UPDATE_PLACE_ID = 'USER_ADDRESS_UPDATE_PLACE_ID'

import { Map } from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------

export function userAddressSearchChange(val) {
    return {
        type: USER_ADDRESS_SEARCH_CHANGE,
        payload: val
    }
}

export function userAddressUpdatePlaceId(val) {
    return {
        type: USER_ADDRESS_UPDATE_PLACE_ID,
        payload: val
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [USER_ADDRESS_SEARCH_CHANGE]: (state, action) => {
        return state.updateIn(['userAddressSearch', 'searchText'], value => action.payload);
    },
    [USER_ADDRESS_UPDATE_PLACE_ID]: (state, action) => {
        return state.updateIn(['userAddressSearch', 'place_id'], value => action.payload);
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = Map({
    userAddressSearch: Map({
        searchText: '',
        place_id: ''
    })
});

export function homeviewReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
