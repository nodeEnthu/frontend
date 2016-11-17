import { Map, List } from 'immutable';
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA = "REQUEST_DATA";
export const FAIL_DATA = "FAIL_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const SELECT_CUISINE_OR_DIET_TYPE = "SELECT_CUISINE_OR_DIET_TYPE";
export const FLUSH_OUT_STALE_DATA = "FLUSH_OUT_STALE_DATA";
export const SELECT_ADDTNL_QUERY = "SELECT_ADDTNL_QUERY";

// ------------------------------------
// Actions
// ------------------------------------


export function selectCuisineOrDiet(storeKey, dietOrCuisineSelected) {
    return {
        type: SELECT_CUISINE_OR_DIET_TYPE,
        key: storeKey,
        payload: dietOrCuisineSelected
    };
}
export function selectAddtnlQuery(key, value) {
    return {
        type: SELECT_ADDTNL_QUERY,
        storeKey: key,
        payload: value
    };
}
export function flushOutStaleData() {
    return {
        type: FLUSH_OUT_STALE_DATA
    };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REQUEST_DATA]: (state, action) => state.set('isLoading', true),
    [FAIL_DATA]: (state, action) => state.set('isLoading', false).set('error', action.data).set('data', List()),
    [FLUSH_OUT_STALE_DATA]: (state, action) => state.set('isLoading', false).set('error', undefined).set('data', List()),
    [RECEIVE_DATA]: (state, action) => state.set('isLoading', false).set('error', undefined).set('data', state.get('data').concat(action.payload.data.data)),
    [SELECT_ADDTNL_QUERY]: (state, action) => state.setIn(['addtnlQuery', action.storeKey], action.payload),
    [SELECT_CUISINE_OR_DIET_TYPE]: (state, action) => {
        if (state.getIn([action.key, action.payload])) {
            return state.deleteIn([action.key, action.payload])
        } else return state.updateIn([action.key, action.payload], false, selected => !selected)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    isLoading: false,
    data: List(),
    error: undefined,
    cuisineSelectedMap: Map(),
    dietSelectedMap: Map(),
    addtnlQuery: Map({
        orderMode: undefined,
        providerRadius: undefined,
        date: new Date()
    })
});

export default function fetchedDataReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
};