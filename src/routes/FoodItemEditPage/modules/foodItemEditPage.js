import { Map } from 'immutable';



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
        type: Add_Food_Item_Info,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}
export function removeFoodItemInfo(obj) {
    return {
        type: Remove_Food_Item_Info,
        storeKeys: obj.storeKeys,
        payload: ''
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[REQUEST_DATA_FOOD_ITEM]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true).setIn([action.payload.storeKey, 'error'], undefined).set('foodItemEntryForm', Map()),
    [FAIL_DATA_FOOD_ITEM]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).set('foodItemEntryForm', Map()),
    [RECEIVE_DATA_FOOD_ITEM]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).set('foodItemEntryForm', Map(action.payload.data.data)),

    [ADD_FOOD_ITEM_INFO]: (state, action) => state.setIn(['foodItemEntryForm', action.storeKey], action.payload),
    [REMOVE_FOOD_ITEM_INFO]: (state, action) => state.setIn(['foodItemEntryForm', 'name'], '').setIn(['foodItemEntryForm', 'description'], ''),

}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Map({
	foodItemCall:Map({
		isLoading:false,
		error:false
	}),
    foodItemEntryForm: Map({
        name: '',
        nameErrMsg: '',
        description: '',
        cuisineType: '',
        cuisineTypeErrorMsg: '',
        descriptionErrorMsg: '',
        placeOrderBy: undefined,
        placeOrderByErrorMsg: '',
        serviceDate: new Date(),
        serviceDateErrorMsg: '',
        deliveryFlag: false,
        price: '',
        priceErrorMsg: '',
        pickUpStartTime: undefined,
        pickUpEndTime: undefined,
        organic: false,
        vegetarian: false,
        glutenfree: false,
        lowcarb: false,
        vegan: false,
        nutfree: false,
        oilfree: false,
        nondairy: false,
        indianFasting: false,
        allClear: false,
        snackBarOpen: false,
        snackBarMessage: '',
        firstItem: true
    })
})


export default function foodItemEditPage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
