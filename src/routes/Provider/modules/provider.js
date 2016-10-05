// ------------------------------------
// Constants
// ------------------------------------
export const Chars_Left = 'Chars_Left'
export const Add_Provider_Info = "Add_Provider_Info"
export const Add_Provider_Error_Msg = 'Add_Provider_Error_Msg'
export const Add_Provider_Entry_State = "Add_Provider_Entry_State"

export const Add_Food_Item_Info = 'Add_Food_Item_Info'
export const Remove_Food_Item_Info = 'Remove_Food_Item_Info'
export const MAX_COUNT_PROVIDER_DESC = 100;
import { Map, List } from 'immutable'
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
    [Add_Provider_Info]: (state, action) => {
        //console.log(" reducer Add_Provider_Info is invoked with ", action);
        return state.setIn(['providerEntryForm', action.storeKey], action.payload)
    },
    [Add_Provider_Error_Msg]: (state, action) => {
        //console.log(" reducer Add_Provider_Error_Msg is invoked with ", action);
        return state.setIn(['providerEntryForm', action.storeKey], action.payload)
    },

    [Add_Food_Item_Info]: (state, action) => {
        //console.log(" reducer Add_Food_Item_Info is invoked with ", action);
        return state.setIn(['foodItemEntryForm', action.storeKey], action.payload)
    },
    [Remove_Food_Item_Info]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'name'], '')
                    .setIn(['foodItemEntryForm', 'description'], '')
    },
    [Add_Provider_Entry_State]:(state,action)=>{
        //console.log(" reducer Provider_Entry_State is invoked with ", action);
        return state.setIn(['providerEntryState', action.storeKey], action.payload)
    }
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
            chars_left: MAX_COUNT_PROVIDER_DESC,
            title: '',
            description: '',
            searchText: '',
            place_id: '',
            keepAddressPrivateFlag: false,
            includeAddressInEmail:true,
            emailId: '',
            pickUpFlag:true,
            pickUpAddtnlComments:'',
            doYouDeliverFlag:false,
            deliveryRadius:'',
            deliveryMinOrder:'',
            deliveryAddtnlComments:'',
            allClear: false,
            titleErrorMsg: '',
            emailIdErrorMsg: '',
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
            serviceDate:undefined,
            serviceDateErrorMsg:'',
            deliveryFlag: false,
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
        })
    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
