import { connect } from 'react-redux'
import {Map} from 'immutable'

const ADD_TOKEN = "ADD_TOKEN"

const initialState = Map({
	token:''
})

export function addToken(value){
	return{
		type: "ADD_TOKEN",
		payload:value
	}
}

const ACTION_HANDLERS = {
    [ADD_TOKEN]: (state, action) => {
    	console.log("old state",state);
    	let newState = state.set('token', action.payload)
    	console.log("new state",newState);
        return newState ;
    }
}

export function coreReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
