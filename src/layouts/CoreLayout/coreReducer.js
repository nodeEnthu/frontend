import { connect } from 'react-redux'
import { Map } from 'immutable'

const ADD_TOKEN = "ADD_TOKEN";
const ADD_USER = "ADD_USER"

const initialState = Map({
    token: '',
    user: Map({
        name: '',
        email: '',
        provider: '',
        fbLargeImg: '',
        fbSmallImg: '',
        fbUserID: ''
    })
})

export function addToken(value) {
    return {
        type: "ADD_TOKEN",
        payload: value
    }
}
export function addUser(user) {
    return {
        type: "ADD_USER",
        payload: user
    }
}

const ACTION_HANDLERS = {
    [ADD_TOKEN]: (state, action) => {
        return state.set('token', action.payload)
    },
    [ADD_USER]: (state, action) => {
        console.log(action.payload);
        let newUser = Map(action.payload);
        let newState = state.set('user', newUser)
        console.log(newState.toJS());
        return newState;
    }
}

export function coreReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
