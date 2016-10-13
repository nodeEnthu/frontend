// ------------------------------------
// Constants
// ------------------------------------
import { Map, List } from 'immutable'
export const REQUEST_DATA_PROVIDER = "REQUEST_DATA_PROVIDER";
export const FAIL_DATA_PROVIDER = "FAIL_DATA_PROVIDER";
export const RECEIVE_DATA_PROVIDER = "RECEIVE_DATA_PROVIDER";
export const PROVIDER_FOOD_ITEM_CHECKOUT = "PROVIDER_FOOD_ITEM_CHECKOUT";
// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------

export function providerFoodItemCheckout(providerId, itemCheckedOut) {
    return {
        type: PROVIDER_FOOD_ITEM_CHECKOUT,
        payload: {
            providerId: providerId,
            itemCheckedOut: itemCheckedOut
        }
    }
}

const ACTION_HANDLERS = {
    [REQUEST_DATA_PROVIDER]: (state, action) => { console.log("reaching here with", action);
        return state.setIn([action.payload.storeKey, 'isLoading'], true) },
    [FAIL_DATA_PROVIDER]: (state, action) => { console.log("reaching here with", action);
        return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], List()) },
    [RECEIVE_DATA_PROVIDER]: (state, action) => { console.log("reaching here with", action);
        return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data) },
    [PROVIDER_FOOD_ITEM_CHECKOUT]: (state, action) => { console.log("reaching here with", state.get('selectedProvider'));
        return state.setIn['selectedProvider', action.payload.providerId], Map(), () => action.payload.itemCheckedOut }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    providerProfileCall: Map({
        isLoading: false,
        error: false,
        data: undefined
    }),
    selectedProvider: Map({

    })
})
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
