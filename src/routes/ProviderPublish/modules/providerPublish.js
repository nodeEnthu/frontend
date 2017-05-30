import { Map, List } from 'immutable';
import Provider from 'models/Provider';
// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_DATA_PROVIDER_ENTRY = "REQUEST_DATA_PROVIDER_ENTRY";
export const FAIL_DATA_PROVIDER_ENTRY = "FAIL_DATA_PROVIDER_ENTRY";
export const RECEIVE_DATA_PROVIDER_ENTRY = "RECEIVE_DATA_PROVIDER_ENTRY";



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REQUEST_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data).set('providerEntryForm', Map(action.payload.data.data)),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    Map({
        providerProfileCall: Map({
            isLoading: false,
            error: false,
            data: Map()
        })
    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
