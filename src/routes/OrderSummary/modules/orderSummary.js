import { Map } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA_ORDERS_AS_CUSTOMER = "REQUEST_DATA_ORDERS_AS_CUSTOMER";
export const FAIL_DATA_ORDERS_AS_CUSTOMER = "FAIL_DATA_ORDERS_AS_CUSTOMER";
export const RECEIVE_DATA_ORDERS_AS_CUSTOMER = "RECEIVE_DATA_ORDERS_AS_CUSTOMER";

export const REQUEST_DATA_ORDERS_AS_PROVIDER = "REQUEST_DATA_ORDERS_AS_PROVIDER";
export const FAIL_DATA_ORDERS_AS_PROVIDER = "FAIL_DATA_ORDERS_AS_PROVIDER";
export const RECEIVE_DATA_ORDERS_AS_PROVIDER = "RECEIVE_DATA_ORDERS_AS_PROVIDER";

// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REQUEST_DATA_ORDERS_AS_CUSTOMER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_ORDERS_AS_CUSTOMER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_ORDERS_AS_CUSTOMER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),

    [REQUEST_DATA_ORDERS_AS_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_ORDERS_AS_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_ORDERS_AS_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    ordersAsCustomer: Map({
        isLoading: false,
        error: false,
        data: [],
    }),
    ordersAsProvider: Map({
        isLoading: false,
        error: false,
        data: []
    }),
});
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
