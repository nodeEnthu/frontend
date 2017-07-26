import { Map, List } from 'immutable';
import FoodItem from 'models/FoodItem';

// ------------------------------------
// Constants
// ------------------------------------


export const ADD_FOOD_ITEM_INFO = 'ADD_FOOD_ITEM_INFO'
export const REMOVE_FOOD_ITEM_INFO = 'REMOVE_FOOD_ITEM_INFO'


// ------------------------------------
// Actions
// ------------------------------------


////////////////////////////////
//actions for food item entry
///////////////////////////////
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
    [ADD_FOOD_ITEM_INFO]: (state, action) => state.setIn(['foodItemEntryForm', action.storeKey], action.payload),
    [REMOVE_FOOD_ITEM_INFO]: (state, action) => {return state.set('foodItemEntryForm', FoodItem)},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    Map({
        foodItemEntryForm: FoodItem,
    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
