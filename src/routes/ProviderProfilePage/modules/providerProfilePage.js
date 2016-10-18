// ------------------------------------
// Constants
// ------------------------------------
import { Map, List } from 'immutable'
export const REQUEST_DATA_PROVIDER = "REQUEST_DATA_PROVIDER";
export const FAIL_DATA_PROVIDER = "FAIL_DATA_PROVIDER";
export const RECEIVE_DATA_PROVIDER = "RECEIVE_DATA_PROVIDER";
export const PROVIDER_FOOD_ITEM_CHECKOUT = "PROVIDER_FOOD_ITEM_CHECKOUT";
export const UPDATE_CHECKED_OUT_QTY = "UPDATE_CHECKED_OUT_QTY";
// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------

export function providerFoodItemCheckout(itemCheckedOut) {
    return {
        type: PROVIDER_FOOD_ITEM_CHECKOUT,
        payload: {
            itemCheckedOut: itemCheckedOut
        }
    }
}

export function updateCheckedOutQty(foodItemId,quantity) {
    return {
        type: UPDATE_CHECKED_OUT_QTY,
        payload: {
            foodItemId: foodItemId,
            quantity:quantity
        }
    }
}

const ACTION_HANDLERS = {
    [REQUEST_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], List()),
    [RECEIVE_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),
    [PROVIDER_FOOD_ITEM_CHECKOUT]: (state, action) => state.setIn(['itemsCheckedOut', action.payload.itemCheckedOut._id],Map(action.payload.itemCheckedOut)),
    [UPDATE_CHECKED_OUT_QTY]:(state,action)=>state.setIn(['itemsCheckedOut', action.payload.foodItemId,'quantity'],action.payload.quantity)
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
    itemsCheckedOut: Map({
    })
})
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
