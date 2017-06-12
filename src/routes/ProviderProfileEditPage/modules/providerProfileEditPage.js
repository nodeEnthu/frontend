import { Map, List } from 'immutable';
import Provider from 'models/Provider';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA_PROVIDER_PROFILE = "REQUEST_DATA_PROVIDER_PROFILE";
export const FAIL_DATA_PROVIDER_PROFILE = "FAIL_DATA_PROVIDER_PROFILE";
export const RECEIVE_DATA_PROVIDER_PROFILE = "RECEIVE_DATA_PROVIDER_PROFILE";

export const REQUEST_DATA_PROVIDER_PROFILE_EDIT = "REQUEST_DATA_PROVIDER_PROFILE_EDIT";
export const FAIL_DATA_PROVIDER_PROFILE_EDIT = "FAIL_DATA_PROVIDER_PROFILE_EDIT";
export const RECEIVE_DATA_PROVIDER_PROFILE_EDIT = "RECEIVE_DATA_PROVIDER_PROFILE_EDIT";

export const ADD_PROVIDER_INFO = "ADD_PROVIDER_ERROR_MSG";
export const ADD_PROVIDER_ERROR_MSG = "ADD_PROVIDER_INFO";

export const ADD_METHOD_OF_PAYMENT_EDIT = "ADD_METHOD_OF_PAYMENT_EDIT"


// ------------------------------------
// Actions
// ------------------------------------

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

export function addMethodOfPayment(obj) {
    return {
        type: ADD_METHOD_OF_PAYMENT_EDIT,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

    [REQUEST_DATA_PROVIDER_PROFILE_EDIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER_PROFILE_EDIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER_PROFILE_EDIT]: (state, action) => {
        return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data).set('providerEntryForm', Map(action.payload.data.data)) },
    [ADD_PROVIDER_INFO]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [ADD_PROVIDER_ERROR_MSG]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [ADD_METHOD_OF_PAYMENT_EDIT]: (state, action) => {
        let methodsOfPayment = state.get('providerEntryForm').toJS().methodsOfPayment || [];
        let index = methodsOfPayment.indexOf(action.payload)
        if (index > -1) {
            methodsOfPayment.splice(index, 1);
        } else methodsOfPayment.push(action.payload);
        return state.setIn(['providerEntryForm', 'methodsOfPayment'], List(methodsOfPayment));
    }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState =
    Map({
        providerEntryForm: Provider,
        editedProviderProfile: {
            isLoading: false,
            error: false,
            data: Map()
        },
        providerProfileCall: Map({
            isLoading: false,
            error: false
        })
    })

export default function providerProfileEditPage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
