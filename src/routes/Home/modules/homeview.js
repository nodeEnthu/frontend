// ------------------------------------
// Constants
// ------------------------------------
export const LEFTNAV_OPEN_CLOSE = 'LEFTNAV_OPEN_CLOSE'
import { Map, fromJS } from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------
export function leftnavstatechange(state) {
    return {
        type: LEFTNAV_OPEN_CLOSE
    }
}

export const actions = {
    leftnavstatechange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LEFTNAV_OPEN_CLOSE]: (state, action) => {
        return state.set('leftNavOpen', !state.get('leftNavOpen'));
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = Map({
    leftNavOpen: false,
    userZipSearch: Map({
        searchText: '',
        refinedVals: []
    })
});
export function homeviewReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
