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
export const DIRTY = "DIRTY";

export const SEARCH_OPEN_MODAL = "SEARCH_OPEN_MODAL";
export const SEARCH_FOOD_ID_SELECTED = "SEARCH_FOOD_ID_SELECTED"

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
export function setDirty(bool) {
    return {
        type: DIRTY,
        payload: bool
    };
}
export function foodIdSelected(foodItemId){
    return {
        'type': SEARCH_FOOD_ID_SELECTED,
        'foodItemId': foodItemId
    }
}
export function openModal(obj) {
    return {
        'type': SEARCH_OPEN_MODAL,
        'storeKey': obj.storeKey,
        'openModal': obj.openModal
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REQUEST_DATA]: (state, action) => state.set('isLoading', true),
    [FAIL_DATA]: (state, action) => state.set('isLoading', false).set('error', action.data).set('data', List()),
    [FLUSH_OUT_STALE_DATA]: (state, action) => state.set('isLoading', false).set('error', undefined).set('data', List()),
    [RECEIVE_DATA]: (state, action) => state.set('isLoading', false).set('error', undefined).set('data', state.get('data').concat(action.payload.data.data)),
    [SELECT_ADDTNL_QUERY]: (state, action) => {
        return state.setIn(['addtnlQuery', action.storeKey], action.payload);
    },
    [SELECT_CUISINE_OR_DIET_TYPE]: (state, action) => {
        if (state.getIn([action.key, action.payload])) {
            return state.deleteIn([action.key, action.payload])
        } else return state.updateIn([action.key, action.payload], false, selected => !selected)
    },
    [DIRTY]: (state, action) => state.set('dirty', action.payload),
    [SEARCH_FOOD_ID_SELECTED]: (state, action) => state.set('foodIdSelected', action.foodItemId),
    [SEARCH_OPEN_MODAL]: (state, action) => state.set(action.storeKey, action.openModal)
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
        date: undefined,
        sortBy: 'ratings'
    }),
    dirty: false,
    foodItemModalOpen: false,
    foodIdSelected: undefined
});

export default function fetchedDataReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
};
