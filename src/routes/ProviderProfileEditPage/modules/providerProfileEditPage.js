import {Map} from 'immutable';
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
export const SHOW_HIDE_PROVIDER_EDIT_SPINNER = "SHOW_HIDE_PROVIDER_EDIT_SPINNER";

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

export function showHideSpinner(obj){
    return{
        type:SHOW_HIDE_PROVIDER_EDIT_SPINNER,
        storeKey:obj.storeKey,
        payload:obj.payload
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
   
    [REQUEST_DATA_PROVIDER_PROFILE_EDIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER_PROFILE_EDIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER_PROFILE_EDIT]: (state, action) => {return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data).set('providerEntryForm', Map(action.payload.data.data))},
    [ADD_PROVIDER_INFO]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [ADD_PROVIDER_ERROR_MSG]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [SHOW_HIDE_PROVIDER_EDIT_SPINNER]:(state,action)=> {console.log("m getting invoked",action);return state.setIn(['spinner',action.storeKey],action.payload)}
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState =
    Map({
        providerEntryForm: Provider,
        editedProviderProfile:{
            isLoading:false,
            error:false,
            data:Map()
        },
        providerProfileCall:Map({
            isLoading:false,
            error:false
        }),
        spinner:Map({
            providerEntrySpinner:false,
        })
    })

export default function providerProfileEditPage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
