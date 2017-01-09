import { Map, List } from 'immutable';
import FoodItem from 'models/FoodItem';
import Provider from 'models/Provider';
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
export const PREFIL_PROVIDER_ENTRY_FORM = "PREFIL_PROVIDER_ENTRY_FORM";
export const SHOW_HIDE_SPINNER = "SHOW_HIDE_SPINNER";

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

export function prefilProviderEntryForm(data) {
    return {
        type: PREFIL_PROVIDER_ENTRY_FORM,
        payload: data
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
export function removeFoodItemInfo() {
    return {
        type: Remove_Food_Item_Info
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

export function showHideSpinner(obj){
    return{
        type:SHOW_HIDE_SPINNER,
        storeKey:obj.storeKey,
        payload:obj.payload
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [Add_Provider_Info]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [Add_Provider_Error_Msg]: (state, action) => state.setIn(['providerEntryForm', action.storeKey], action.payload),
    [Add_Food_Item_Info]: (state, action) => state.setIn(['foodItemEntryForm', action.storeKey], action.payload),
    [Remove_Food_Item_Info]: (state, action) => {console.log(FoodItem.toJS()); return state.set('foodItemEntryForm', FoodItem)},
    [Add_Provider_Entry_State]: (state, action) => state.setIn(['providerEntryState', action.storeKey], action.payload),
    [PREFIL_PROVIDER_ENTRY_FORM]: (state, action) => state.set('providerEntryForm', Map(action.payload)),
    [REQUEST_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], true),
    [FAIL_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], action.data).setIn([action.payload.storeKey, 'data'], Map()),
    [RECEIVE_DATA_PROVIDER_ENTRY]: (state, action) => state.setIn([action.payload.storeKey, 'isLoading'], false).setIn([action.payload.storeKey, 'error'], undefined).setIn([action.payload.storeKey, 'data'], action.payload.data.data).set('providerEntryForm', Map(action.payload.data.data)),
    [SHOW_HIDE_SPINNER]:(state,action)=> {console.log("m getting invoked",action);return state.setIn(['spinner',action.storeKey],action.payload)}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    Map({
        val: 0,
        providerEntryState: Map({
            stepIndex: 0
        }),
        providerEntryForm: Provider,
        foodItemEntryForm: FoodItem,
        providerProfileCall: Map({
            isLoading: false,
            error: false,
            data: Map()
        }),
        spinner:Map({
            providerEntrySpinner:false,
            foodItemEntrySpinner:false
        })
    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
