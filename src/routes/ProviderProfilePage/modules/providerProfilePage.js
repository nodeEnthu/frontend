// ------------------------------------
// Constants
// ------------------------------------
import { Map, List } from 'immutable';
export const MAX_COUNT_PROVIDER_DESC = 100;
export const REQUEST_DATA_PROVIDER = "REQUEST_DATA_PROVIDER";
export const FAIL_DATA_PROVIDER = "FAIL_DATA_PROVIDER";
export const RECEIVE_DATA_PROVIDER = "RECEIVE_DATA_PROVIDER";

export const REQUEST_DATA_ORDER_SUBMIT = "REQUEST_DATA_ORDER_SUBMIT";
export const FAIL_DATA_ORDER_SUBMIT = "FAIL_DATA_ORDER_SUBMIT";
export const RECEIVE_DATA_ORDER_SUBMIT = "RECEIVE_DATA_ORDER_SUBMIT";

export const PROVIDER_FOOD_ITEM_CHECKOUT = "PROVIDER_FOOD_ITEM_CHECKOUT";
export const DELETE_CHECKED_OUT_ITEM = "DELETE_CHECKED_OUT_ITEM";
export const UPDATE_CHECKED_OUT_QTY = "UPDATE_CHECKED_OUT_QTY";
export const REMOVE_ALL_CHECKED_OUT_ITEMS="REMOVE_ALL_CHECKED_OUT_ITEMS";

export const SELECT_ITEM_FOR_REVIEW = "SELECT_ITEM_FOR_REVIEW";
export const SELECT_STAR_RATING = "SELECT_STAR_RATING";
export const SUBMIT_TYPED_REVIEW = "SUBMIT_TYPED_REVIEW";
export const REVIEW_WORDS = "REVIEW_WORDS";
export const REVIEW_ERROR = "REVIEW_ERROR";
export const OPEN_MODAL = "OPEN_MODAL";

export const REQUEST_DATA_SUBMIT_REVIEW = "REQUEST_DATA_ORDER_SUBMIT";
export const FAIL_DATA_SUBMIT_REVIEW = "FAIL_DATA_SUBMIT_REVIEW";
export const RECEIVE_DATA_SUBMIT_REVIEW = "RECEIVE_DATA_SUBMIT_REVIEW";
export const FLUSH_OUT_STALE__REVIEW_DATA = "FLUSH_OUT_STALE__REVIEW_DATA";



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
export function deleteCheckedOutItem(foodItemId) {
    return {
        type: DELETE_CHECKED_OUT_ITEM,
        foodItemId:foodItemId
    }
}
export function removeAllCheckedOutItems(){
    return{
        type:REMOVE_ALL_CHECKED_OUT_ITEMS
    }
}

// Actions for review
export function selectItemForReview(foodItem){
    return{
        type:SELECT_ITEM_FOR_REVIEW,
        foodItem:foodItem
    }
}
export function selectStarRating(rating){
    return{
        type:SELECT_STAR_RATING,
        rating:rating
    }
}

export function submitTypedReview(review){
    return{
        type:SUBMIT_TYPED_REVIEW,
        review:review
    }
}

export function reviewError(obj){
    return{
        type:REVIEW_ERROR,
        storeKey:obj.storeKey,
        errorMsg:obj.errorMsg
    }
}

export function openModal(obj){
    return{
        'type':OPEN_MODAL,
        'storeKey':obj.storeKey,
        'openModal':obj.openModal
    }
}
export function flushOutStaleReviewData(){
    return{
        'type':FLUSH_OUT_STALE__REVIEW_DATA
    }
}

const ACTION_HANDLERS = {
    [REQUEST_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),
    
    [REQUEST_DATA_ORDER_SUBMIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_ORDER_SUBMIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_ORDER_SUBMIT]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),

    [PROVIDER_FOOD_ITEM_CHECKOUT]: (state, action) => state.setIn(['itemsCheckedOut', action.payload.itemCheckedOut._id],Map(action.payload.itemCheckedOut)),
    [UPDATE_CHECKED_OUT_QTY]:(state,action)=>state.setIn(['itemsCheckedOut', action.payload.foodItemId,'quantity'],action.payload.quantity),
    [DELETE_CHECKED_OUT_ITEM]:(state,action)=> state.deleteIn(['itemsCheckedOut',action.foodItemId]),
    [REMOVE_ALL_CHECKED_OUT_ITEMS]:(state,action)=>state.delete('itemsCheckedOut'),

    [SELECT_ITEM_FOR_REVIEW]:(state,action)=>state.setIn(['review','item'],Map(action.foodItem)),
    [SELECT_STAR_RATING]:(state,action)=>state.setIn(['review','rating'],action.rating),
    [SUBMIT_TYPED_REVIEW]:(state,action)=>state.setIn(['review','review'],action.review),
    [REVIEW_ERROR]:(state,action)=>state.setIn(['review',action.storeKey],action.errorMsg),

    [OPEN_MODAL]:(state,action)=>state.set(action.storeKey,action.openModal),

    [REQUEST_DATA_SUBMIT_REVIEW]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_SUBMIT_REVIEW]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_SUBMIT_REVIEW]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),
    [FLUSH_OUT_STALE__REVIEW_DATA]:(state,action)=> state.set('item',Map()).set('review','').set('rating',undefined).set('ratingError',undefined).set('reviewError',undefined)
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
    submitOrder:Map({
        isLoading:false,
        error:false,
        data:undefined
    }),
    itemsCheckedOut: Map({
    }),
    review:Map({
        item:Map(),
        review:'',
        rating:undefined,
        ratingError:'',
        reviewError:''
    }),
    submitReview:Map({
        isLoading:false,
        error:false,
        data:undefined
    }),
    providerEntryEditForm: {
        isLoading:false,
        error:false,
        data:undefined
    },
    reviewSubmitModalOpen:false,
    orderSubmitModalOpen:false
})
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
