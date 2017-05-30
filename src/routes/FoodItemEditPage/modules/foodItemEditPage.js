import { Map } from 'immutable';
import FoodItem from 'models/FoodItem';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA_FOOD_ITEM = "REQUEST_DATA_FOOD_ITEM";
export const FAIL_DATA_FOOD_ITEM = "FAIL_DATA_FOOD_ITEM";
export const RECEIVE_DATA_FOOD_ITEM = "RECEIVE_DATA_FOOD_ITEM";


export const ADD_FOOD_ITEM_INFO = 'ADD_FOOD_ITEM_INFO';
export const REMOVE_FOOD_ITEM_INFO = 'REMOVE_FOOD_ITEM_INFO';

// ------------------------------------
// Actions
// ------------------------------------

export function addFoodItemInfo(obj) {
    return {
        type: ADD_FOOD_ITEM_INFO,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}
export function removeFoodItemInfo() {
    return {
        type: REMOVE_FOOD_ITEM_INFO
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[REQUEST_DATA_FOOD_ITEM]: (state, action) => {return state.setIn([action.payload.storeKey, 'isLoading'], true).setIn([action.payload.storeKey, 'error'], undefined).set('foodItemEntryForm', Map())},
    [FAIL_DATA_FOOD_ITEM]: (state, action) => {return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).set('foodItemEntryForm', Map())},
    [RECEIVE_DATA_FOOD_ITEM]: (state, action) => {return state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).set('foodItemEntryForm', Map(action.payload.data.data))},
    [REMOVE_FOOD_ITEM_INFO]: (state, action) => {return state.set('foodItemEntryForm', FoodItem)},
    [ADD_FOOD_ITEM_INFO]: (state, action) => state.setIn(['foodItemEntryForm', action.storeKey], action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Map({
	foodItemCall:Map({
		isLoading:false,
		error:false
	}),
    foodItemEntryForm: FoodItem
})


export default function foodItemEditPage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
