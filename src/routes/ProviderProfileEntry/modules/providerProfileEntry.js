import { Map, List } from 'immutable';
import FoodItem from 'models/FoodItem';
import Provider from 'models/Provider';
// ------------------------------------
// Constants
// ------------------------------------
export const CHARS_LEFT = 'CHARS_LEFT'
export const ADD_PROVIDER_INFO = "ADD_PROVIDER_INFO"
export const ADD_PROVIDER_ERROR_MSG = 'ADD_PROVIDER_ERROR_MSG'


export const REQUEST_DATA_PROVIDER_ENTRY = "REQUEST_DATA_PROVIDER_ENTRY";
export const FAIL_DATA_PROVIDER_ENTRY = "FAIL_DATA_PROVIDER_ENTRY";
export const RECEIVE_DATA_PROVIDER_ENTRY = "RECEIVE_DATA_PROVIDER_ENTRY";

export const MAX_COUNT_PROVIDER_DESC = 100;


// ------------------------------------
// Actions
// ------------------------------------

////////////////////////////////
//actions for provider entry
///////////////////////////////
export function charsLeft(value) {
    return {
        type: CHARS_LEFT,
        payload: value
    }
}
export function addProviderInfo(obj) {
    return {
        type: ADD_PROVIDER_INFO,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}


export function addProviderErrorMsg(obj) {
    return {
        type: ADD_PROVIDER_ERROR_MSG,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_PROVIDER_INFO]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [ADD_PROVIDER_ERROR_MSG]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [REQUEST_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data).set('providerEntryForm', Map(action.payload.data.data)),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    Map({
        providerEntryForm: Provider,
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
