import {Map} from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DATA_PROVIDER_PROFILE = "REQUEST_DATA_PROVIDER_PROFILE";
export const FAIL_DATA_PROVIDER_PROFILE = "FAIL_DATA_PROVIDER_PROFILE";
export const RECEIVE_DATA_PROVIDER_PROFILE = "RECEIVE_DATA_PROVIDER_PROFILE";

// ------------------------------------
// Actions
// ------------------------------------



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DATA_PROVIDER_PROFILE]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
  [FAIL_DATA_PROVIDER_PROFILE]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).set('providerEntryForm', Map()),
  [RECEIVE_DATA_PROVIDER_PROFILE]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).set('providerEntryForm', Map(action.payload.data.data))
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState =
    Map({
        providerEntryForm: Map({
            title: '',
            description: '',
            searchText: '',
            place_id: '',
            keepAddressPrivateFlag: false,
            includeAddressInEmail:true,
            email: '',
            pickUpFlag:true,
            pickUpAddtnlComments:'',
            doYouDeliverFlag:false,
            deliveryRadius:'',
            deliveryMinOrder:'',
            deliveryAddtnlComments:'',
            allClear: false,
            titleErrorMsg: '',
            emailErrorMsg: '',
            descriptionErrorMsg: '',
            providerAddressJustificationModalOpen:false
        }),
        providerProfileCall:Map({
            isLoading:false,
            error:false
        })
    })

export default function providerProfileEditPage(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};
