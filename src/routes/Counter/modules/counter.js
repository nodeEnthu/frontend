import {Map} from 'immutable';
import {getCall} from 'utils/apiCallWrapper';
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

export function fetchData(queryParams) {
    return (dispatch) => {
        dispatch(requestData());
        return getCall('/api/query/foodItems',queryParams)
            .then(res => dispatch(receiveData(res)))
            .catch(err => dispatch(failData(err)));
    };
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    REQUEST_DATA: (state, action) => state.set('isLoading', true),
    FAIL_DATA: (state, action) => state.set('isLoading',false).set('error',action.data).set('data', Map()),
    RECEIVE_DATA: (state, action)=> state.set('isLoading',false).set('error',undefined).set('data',action.data),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    isLoading: false,
    data: Map(),
    error: undefined,
});

export default function fetchedDataReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
};
