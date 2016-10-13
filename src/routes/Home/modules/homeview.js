import {Map} from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const PLACE_HOLDER = "PLACE_HOLDER"

// ------------------------------------
// Actions
// ------------------------------------
export function placeholder(){
	return{
		type:PLACE_HOLDER
	}
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
   [PLACE_HOLDER]:(state,action)=>{return state;}
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Map({});

export default function homepage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
