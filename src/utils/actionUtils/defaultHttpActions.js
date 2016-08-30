import { getCall,securedGetCall,securedPostCall } from 'utils/httpUtils/apiCallWrapper';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const FAIL_DATA = 'FAIL_DATA';

// ------------------------------------
// Actions
// ------------------------------------
function requestData() {
    return {
        type: REQUEST_DATA,
    };
};

function failData(err) {
    return {
        type: FAIL_DATA,
        data: err,
    };
};

function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        data: data,
    };
};

export function fetchData(url,queryParams) {
    return (dispatch) => {
        dispatch(requestData());
        return getCall(url, queryParams)
            .then(res => dispatch(receiveData(res)))
            .catch(err => dispatch(failData(err)));
    };
}

export function fetchSecuredData(url,queryParams) {
    return (dispatch) => {
        dispatch(requestData());
        return securedGetCall(url, queryParams)
            .then(res => dispatch(receiveData(res)))
            .catch(err => dispatch(failData(err)));
    };
}
export function postSecuredData(url,queryParams) {
    return (dispatch) => {
        dispatch(requestData());
        return securedPostCall(url, queryParams)
            .then(res => dispatch(receiveData(res)))
            .catch(err => dispatch(failData(err)));
    };
}

