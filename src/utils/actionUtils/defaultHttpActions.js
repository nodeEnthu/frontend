import { getCall,securedGetCall,checkSecuredGetCall,securedPostCall } from 'utils/httpUtils/apiCallWrapper';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const FAIL_DATA = 'FAIL_DATA';

// ------------------------------------
// Actions
// ------------------------------------
function requestData(payload) {
    return {
        type: REQUEST_DATA,
        payload:{
            storeKey:payload.storeKey
        }
    };
};

function failData(payload) {
    return {
        type: FAIL_DATA,
        payload:{
            storeKey:payload.storeKey,
            data:payload.data
        }
    };
};

function receiveData(payload) {
    console.log("reaching here with",payload);
    return {
        type: RECEIVE_DATA,
        payload:{
            storeKey:payload.storeKey,
            data:payload.data
        }
    };
};

export function fetchData(url,storeKey,queryParams) {
    return (dispatch) => {
        dispatch(requestData({storeKey:storeKey}));
        return getCall(url,queryParams)
            .then(res => dispatch(receiveData({storeKey:storeKey,data:res})))
            .catch(err => dispatch(failData({storeKey:storeKey,data:err})));
    };
}

export function fetchMayBeSecuredData(url,storeKey,queryParams) {
    return (dispatch) => {
        dispatch(requestData({storeKey:storeKey}));
        return checkSecuredGetCall(url,queryParams)
            .then(res => dispatch(receiveData({storeKey:storeKey,data:res})))
            .catch(err => dispatch(failData({storeKey:storeKey,data:err})));
    };
}

export function fetchSecuredData(url,storeKey,queryParams) {
    return (dispatch) => {
        dispatch(requestData({storeKey:storeKey}));
        return securedGetCall(url, queryParams)
            .then(res => dispatch(receiveData({storeKey:storeKey,data:res})))
            .catch(err => dispatch(failData({storeKey:storeKey,data:err})));
    };
}
export function postSecuredData(url,storeKey,queryParams) {
    return (dispatch) => {
        dispatch(requestData({storeKey:storeKey}));
        return securedPostCall(url, queryParams)
            .then(res => dispatch(receiveData({storeKey:storeKey,data:res})))
            .catch(err => dispatch(failData({storeKey:storeKey,data:err})));
    };
}

