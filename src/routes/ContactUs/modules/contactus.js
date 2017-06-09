import { Map } from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------


// ------------------------------------
// Actions
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */


export const actions = {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    user: Map({
        firstName: '',
        lastName: ''
    })
});

export default function contactusreducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
