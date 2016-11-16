import {Map} from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA_REVIEWS = "REQUEST_DATA_REVIEWS";
export const FAIL_DATA_REVIEWS = "FAIL_DATA_REVIEWS";
export const RECEIVE_DATA_REVIEWS = "RECEIVE_DATA_REVIEWS";

// ------------------------------------
// Actions
// ------------------------------------
export function placeholder(){
	return{
		type:"PLACE_HOLDER"
	}
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
   [REQUEST_DATA_REVIEWS]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
   [FAIL_DATA_REVIEWS]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
   [RECEIVE_DATA_REVIEWS]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Map({
	 getReviews:Map({
        isLoading:false,
        error:false,
        data:undefined,
        pageNum:1
    }),
});

export default function reviewsReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
