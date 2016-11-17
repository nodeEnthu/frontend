
import { Map, List } from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const Chars_Left = 'Chars_Left'
export const Add_Provider_Info = "Add_Provider_Info"
export const Add_Provider_Error_Msg = 'Add_Provider_Error_Msg'
export const Add_Provider_Entry_State = "Add_Provider_Entry_State"

export const Add_Food_Item_Info = 'Add_Food_Item_Info'
export const Remove_Food_Item_Info = 'Remove_Food_Item_Info'

export const REQUEST_DATA_PROVIDER_ENTRY = "REQUEST_DATA_PROVIDER_ENTRY";
export const FAIL_DATA_PROVIDER_ENTRY = "FAIL_DATA_PROVIDER_ENTRY";
export const RECEIVE_DATA_PROVIDER_ENTRY = "RECEIVE_DATA_PROVIDER_ENTRY";

export const MAX_COUNT_PROVIDER_DESC = 100;


// ------------------------------------
// Actions
// ------------------------------------

////////////////////////////////
//actions for provider entry
///////////////////////////////
export function charsLeft(value) {
    return {
        type: Chars_Left,
        payload: value
    }
}
export function addProviderInfo(obj) {
    return {
        type: Add_Provider_Info,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}


export function addProviderErrorMsg(obj) {
    return {
        type: Add_Provider_Error_Msg,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}


////////////////////////////////
//actions for food item entry
///////////////////////////////
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

////////////////////////////////
//actions for changing state of form
///////////////////////////////
export function addProviderEntryState(obj) {
    return {
        type: Add_Provider_Entry_State,
        storeKey: obj.storeKey,
        payload: obj.payload
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [Add_Provider_Info]: (state, action) => {console.log("Entering "+ action.type+" with ",action.payload);return state.setIn(['providerEntryForm', action.storeKey], action.payload)},
    [Add_Provider_Error_Msg]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [Add_Food_Item_Info]: (state, action) => state.setIn(['foodItemEntryForm', action.storeKey], action.payload),
    [Remove_Food_Item_Info]: (state, action) => state.setIn(['foodItemEntryForm', 'name'], '').setIn(['foodItemEntryForm', 'description'], ''),
    [Add_Provider_Entry_State]:(state,action)=>state.setIn(['providerEntryState', action.storeKey], action.payload),

    [REQUEST_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).set('providerEntryForm', Map()),
    [RECEIVE_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).set('providerEntryForm', Map(action.payload.data.data)),
    
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    Map({
        val: 0,
        providerEntryState: Map({
            loading: false,
            finished: false,
            stepIndex: 0
        }),
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
        foodItemEntryForm: Map({
            name: '',
            nameErrMsg:'',
            description: '',
            cuisineType:'',
            cuisineTypeErrorMsg:'',
            descriptionErrorMsg:'',
            placeOrderBy: undefined,
            placeOrderByErrorMsg:'',
            serviceDate:new Date(),
            serviceDateErrorMsg:'',
            deliveryFlag: false,
            price:'',
            priceErrorMsg:'',
            pickUpStartTime:undefined,
            pickUpEndTime:undefined,
            organic:false,
            vegetarian:false,
            glutenfree:false,
            lowcarb:false,
            vegan:false,
            nutfree:false,
            oilfree:false,
            nondairy:false,
            indianFasting:false,
            allClear:false,
            snackBarOpen:false,
            snackBarMessage:'',
            firstItem:true
        }),
        providerProfileCall: Map({
            isLoading: false,
            error: false
        }),
    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
