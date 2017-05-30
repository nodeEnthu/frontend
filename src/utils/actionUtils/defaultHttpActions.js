import { getCall, securedGetCall, checkSecuredGetCall, securedPostCall } from 'utils/httpUtils/apiCallWrapper';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const FAIL_DATA = 'FAIL_DATA';

// ------------------------------------
// Actions
// ------------------------------------
function requestData(payload, actionType) {
    return {
        type: (actionType) ? REQUEST_DATA + '_' + actionType : REQUEST_DATA,
        payload: {
            storeKey: payload.storeKey
        }
    };
};

function failData(payload, actionType) {
    return {
        type: (actionType) ? FAIL_DATA + '_' + actionType : FAIL_DATA,
        payload: {
            storeKey: payload.storeKey,
            data: payload.data
        }
    };
};

function receiveData(payload, actionType) {
    return {
        type:(actionType) ?  RECEIVE_DATA + '_' + actionType: RECEIVE_DATA,
        payload: {
            storeKey: payload.storeKey,
            data: payload.data
        }
    };
};

export function fetchData(url,storeKey,actionType,queryParams) {
    return (dispatch) => {
        dispatch(requestData({ storeKey: storeKey },actionType));
        return getCall(url, queryParams)
            .then(res => dispatch(receiveData({ storeKey: storeKey, data: res },actionType)))
    };
}

export function fetchMayBeSecuredData(url,storeKey,actionType,queryParams) {
    return (dispatch) => {
        dispatch(requestData({ storeKey: storeKey },actionType));
        return checkSecuredGetCall(url, queryParams)
            .then(res => dispatch(receiveData({ storeKey: storeKey, data: res },actionType)))
    };
}

export function fetchSecuredData(url,storeKey,actionType,queryParams) {
    return (dispatch) => {
        dispatch(requestData({ storeKey: storeKey },actionType));
        return securedGetCall(url, queryParams)
            .then(res => dispatch(receiveData({ storeKey: storeKey, data: res },actionType)))
            
    };
}

export function postSecuredData(url, storeKey,actionType,queryParams) {
    return (dispatch) => {
        dispatch(requestData({ storeKey: storeKey },actionType));
        return securedPostCall(url, queryParams)
            .then(res => dispatch(receiveData({ storeKey: storeKey, data: res },actionType)))
    };
}
