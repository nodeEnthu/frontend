import { Map,List } from 'immutable';
// ------------------------------------
// Constants
// ------------------------------------

export const SELECT_CUISINE_OR_DIET_TYPE = "SELECT_CUISINE_OR_DIET_TYPE";

// ------------------------------------
// Actions
// ------------------------------------


export function selectCuisineOrDiet(storeKey,dietOrCuisineSelected){
  return{
    type: SELECT_CUISINE_OR_DIET_TYPE,
    key: storeKey,
    payload: dietOrCuisineSelected
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    REQUEST_DATA: (state, action) => state.set('isLoading', true),
    FAIL_DATA: (state, action) => state.set('isLoading', false).set('error', action.data).set('data', List()),
    RECEIVE_DATA: (state, action) => state.set('isLoading', false).set('error', undefined).set('data',state.get('data').concat(action.payload.data.data)),
    SELECT_CUISINE_OR_DIET_TYPE: (state, action) => state.updateIn([action.key, action.payload],false,selected => !selected)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    isLoading: false,
    data: List(),
    error: undefined,
    cuisineSelectedMap: Map(),
    dietSelectedMap: Map()
});

export default function fetchedDataReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
};
