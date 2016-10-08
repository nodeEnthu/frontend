// ------------------------------------
// Constants
// ------------------------------------
import { Map,List } from 'immutable'
export const REQUEST_DATA_PROVIDER = "REQUEST_DATA_PROVIDER";
export const FAIL_DATA_PROVIDER = "FAIL_DATA_PROVIDER";
export const RECEIVE_DATA_PROVIDER = "RECEIVE_DATA_PROVIDER";

// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REQUEST_DATA_PROVIDER]: (state, action) => {console.log("reaching here with",action); return state.setIn([action.payload.storeKey, 'isLoading'], true)},
    [FAIL_DATA_PROVIDER]: (state, action) => {console.log("reaching here with",action); return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], List())},
    [RECEIVE_DATA_PROVIDER]: (state, action) => {console.log("reaching here with",action);return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'],action.payload.data.data)},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    providerProfileCall:Map({
      isLoading:false,
      error:false,
      data:undefined
    })
})
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
