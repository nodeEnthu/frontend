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
export const SHOW_HIDE_FOODITEM_EDIT_SPINNER = "SHOW_HIDE_FOODITEM_EDIT_SPINNER";

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
export function showHideSpinner(obj){
    return{
        type:SHOW_HIDE_FOODITEM_EDIT_SPINNER,
        storeKey:obj.storeKey,
        payload:obj.payload
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
    [ADD_FOOD_ITEM_INFO]: (state, action) => state.setIn(['foodItemEntryForm', action.storeKey], action.payload),
    [SHOW_HIDE_FOODITEM_EDIT_SPINNER]:(state,action)=> {console.log("m getting invoked",action);return state.setIn(['spinner',action.storeKey],action.payload)}

}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Map({
	foodItemCall:Map({
		isLoading:false,
		error:false
	}),
    foodItemEntryForm: FoodItem,
    spinner:Map({
            foodItemEntrySpinner:false,
        })
})


export default function foodItemEditPage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
