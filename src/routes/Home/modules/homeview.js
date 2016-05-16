// ------------------------------------
// Constants
// ------------------------------------
export const LEFTNAV_OPEN_CLOSE = 'LEFTNAV_OPEN_CLOSE'
import {Map,fromJS} from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------
export function leftnavstatechange (state) {
	console.log("I was invoked");
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
  	state.leftNav.leftNavOpen = !state.leftNav.leftNavOpen
  	return state;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export function homeviewReducer (state={leftNav:{leftNavOpen:true}} , action) {
	console.log("reducer was evoked",state);
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
