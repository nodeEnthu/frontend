// ------------------------------------
// Constants
// ------------------------------------
import { Map, List } from 'immutable';
export const MAX_COUNT_PROVIDER_DESC = 100;
export const REQUEST_DATA_PROVIDER = "REQUEST_DATA_PROVIDER";
export const FAIL_DATA_PROVIDER = "FAIL_DATA_PROVIDER";
export const RECEIVE_DATA_PROVIDER = "RECEIVE_DATA_PROVIDER";

export const REQUEST_DATA_REMOVE_ITEM = "REQUEST_DATA_REMOVE_ITEM";
export const FAIL_DATA_REMOVE_ITEM = "FAIL_DATA_REMOVE_ITEM";
export const RECEIVE_DATA_REMOVE_ITEM = "RECEIVE_DATA_REMOVE_ITEM";

export const REQUEST_DATA_ORDER_SUBMIT = "REQUEST_DATA_ORDER_SUBMIT";
export const FAIL_DATA_ORDER_SUBMIT = "FAIL_DATA_ORDER_SUBMIT";
export const RECEIVE_DATA_ORDER_SUBMIT = "RECEIVE_DATA_ORDER_SUBMIT";

export const PROVIDER_FOOD_ITEM_CHECKOUT = "PROVIDER_FOOD_ITEM_CHECKOUT";
export const DELETE_CHECKED_OUT_ITEM = "DELETE_CHECKED_OUT_ITEM";
export const UPDATE_CHECKED_OUT_ITEM = "UPDATE_CHECKED_OUT_ITEM";
export const REMOVE_ALL_CHECKED_OUT_ITEMS = "REMOVE_ALL_CHECKED_OUT_ITEMS";
export const FLUSH_PROVIDER_DATA = "FLUSH_PROVIDER_DATA";

export const SELECT_ITEM_FOR_REVIEW = "SELECT_ITEM_FOR_REVIEW";
export const SELECT_STAR_RATING = "SELECT_STAR_RATING";
export const SUBMIT_TYPED_REVIEW = "SUBMIT_TYPED_REVIEW";
export const REVIEW_WORDS = "REVIEW_WORDS";
export const REVIEW_ERROR = "REVIEW_ERROR";

export const REQUEST_DATA_SUBMIT_REVIEW = "REQUEST_DATA_ORDER_SUBMIT";
export const FAIL_DATA_SUBMIT_REVIEW = "FAIL_DATA_SUBMIT_REVIEW";
export const RECEIVE_DATA_SUBMIT_REVIEW = "RECEIVE_DATA_SUBMIT_REVIEW";
export const FLUSH_OUT_STALE__REVIEW_DATA = "FLUSH_OUT_STALE__REVIEW_DATA";

export const FOOD_ID_SELECTED = "FOOD_ID_SELECTED"
export const OPEN_MODAL = "OPEN_MODAL";

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

export function updateCheckedOutItem(foodItemId, storeKey , val) {
    return {
        type: UPDATE_CHECKED_OUT_ITEM,
        payload: {
            foodItemId: foodItemId,
            storeKey: storeKey,
            value:val
        }
    }
}
export function deleteCheckedOutItem(foodItemId) {
    return {
        type: DELETE_CHECKED_OUT_ITEM,
        foodItemId: foodItemId
    }
}
export function removeAllCheckedOutItems() {
    return {
        type: REMOVE_ALL_CHECKED_OUT_ITEMS
    }
}

// Actions for review
export function selectItemForReview(foodItem) {
    return {
        type: SELECT_ITEM_FOR_REVIEW,
        payload: foodItem
    }
}
export function selectStarRating(foodItemId, rating) {
    return {
        type: SELECT_STAR_RATING,
        foodItemId: foodItemId,
        rating: rating
    }
}

export function submitTypedReview(foodItemId, review) {
    return {
        type: SUBMIT_TYPED_REVIEW,
        foodItemId: foodItemId,
        review: review
    }
}

export function reviewError(obj) {
    return {
        type: REVIEW_ERROR,
        foodItemId: obj.foodItemId,
        storeKey: obj.storeKey,
        errorMsg: obj.errorMsg
    }
}

export function openModal(obj) {
    return {
        'type': OPEN_MODAL,
        'storeKey': obj.storeKey,
        'openModal': obj.openModal
    }
}
export function flushOutStaleReviewData(foodItemId) {
    return {
        'type': FLUSH_OUT_STALE__REVIEW_DATA,
        'foodItemId': foodItemId
    }
}
export function flushProviderData() {
    return {
        type: FLUSH_PROVIDER_DATA
    }
}
export function foodIdSelected(foodItemId){
    return {
        'type': FOOD_ID_SELECTED,
        'foodItemId': foodItemId
    }
}

const ACTION_HANDLERS = {
    [REQUEST_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], Map(action.payload.data.data)),
    [FLUSH_PROVIDER_DATA]: (state, action) => state.setIn(['providerProfileCall', 'isLoading'], false).setIn(['providerProfileCall', 'error'], undefined).setIn(['providerProfileCall', 'data'], Map()),

    [REQUEST_DATA_REMOVE_ITEM]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_REMOVE_ITEM]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_REMOVE_ITEM]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], Map(action.payload.data.data)),
    
    [REQUEST_DATA_ORDER_SUBMIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_ORDER_SUBMIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_ORDER_SUBMIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], Map(action.payload.data.data)),

    [PROVIDER_FOOD_ITEM_CHECKOUT]: (state, action) => state.setIn(['itemsCheckedOut', action.payload.itemCheckedOut._id], Map(action.payload.itemCheckedOut)),
    [UPDATE_CHECKED_OUT_ITEM]: (state, action) => state.setIn(['itemsCheckedOut', action.payload.foodItemId, action.payload.storeKey], action.payload.value),
    [DELETE_CHECKED_OUT_ITEM]: (state, action) => state.deleteIn(['itemsCheckedOut', action.foodItemId]),
    [REMOVE_ALL_CHECKED_OUT_ITEMS]: (state, action) => state.delete('itemsCheckedOut'),

    [SELECT_ITEM_FOR_REVIEW]: (state, action) => state.setIn(['reviews', 'item'], Map(action.payload)),
    [SELECT_STAR_RATING]: (state, action) => state.setIn(['reviews', 'reviewMap', action.foodItemId, 'rating'], action.rating),
    [SUBMIT_TYPED_REVIEW]: (state, action) => state.setIn(['reviews', 'reviewMap', action.foodItemId, 'review'], action.review),
    [REVIEW_ERROR]: (state, action) => state.setIn(['reviews', 'reviewMap', action.foodItemId, action.storeKey], action.errorMsg),

    [OPEN_MODAL]: (state, action) => state.set(action.storeKey, action.openModal),

    [REQUEST_DATA_SUBMIT_REVIEW]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_SUBMIT_REVIEW]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_SUBMIT_REVIEW]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], Map(action.payload.data.data)),
    [FLUSH_OUT_STALE__REVIEW_DATA]: (state, action) => state.setIn(['reviews', 'reviewMap', action.foodItemId], Map()),

    [FOOD_ID_SELECTED]:(state,action)=>state.set('foodIdSelected', action.foodItemId)
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
    submitOrder: Map({
        isLoading: false,
        error: false,
        data: undefined
    }),
    itemsCheckedOut: Map({}),
    removeItem: Map({
        isLoading: false,
        error: false,
        data: undefined
    }),
    reviews: Map({
        item: undefined,
        reviewMap: Map({}),
    }),
    submitReview: Map({
        isLoading: false,
        error: false,
        data: undefined
    }),
    providerEntryEditForm: {
        isLoading: false,
        error: false,
        data: undefined
    },
    foodIdSelected:undefined,
    reviewSubmitModalOpen: false,
    orderSubmitModalOpen: false,
    deleteItemModalOpen:false,
    foodItemModalOpen:false
})
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
