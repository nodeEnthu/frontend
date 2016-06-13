// ------------------------------------
// Constants
// ------------------------------------
export const Chars_Left = 'Chars_Left'
export const Add_Provider_Info = "Add_Provider_Info"
export const Add_Provider_Error_Msg = 'Add_Provider_Error_Msg'


export const Add_Food_Item_Name = 'Add_Food_Item_Name'
export const Add_Food_Item_Description = 'Add_Food_Item_Description'
export const Add_DeadLine_To_Order = 'Add_DeadLine_To_Order'
export const Add_Time_Range_To_PickUp_Start = 'Add_Time_Range_To_PickUp_Start'
export const Add_Time_Range_To_PickUp_End = 'Add_Time_Range_To_PickUp_End'
export const Add_Item_Tags = 'Add_Item_Tags'

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
export function addFoodItemName(value) {
    return {
        type: Add_Food_Item_Name,
        payload: value
    }
}
export function addFoodItemDescription(value) {
    return {
        type: Add_Food_Item_Description,
        payload: value
    }
}
export function addDeadLineToOrder(value) {
    return {
        type: Add_DeadLine_To_Order,
        payload: value
    }
}
export function addTimeRangeToPickUpStart(value) {
    return {
        type: Add_Time_Range_To_PickUp_Start,
        payload: value
    }
}
export function addTimeRangeToPickUpEnd(value) {
    return {
        type: Add_Time_Range_To_PickUp_End,
        payload: value
    }
}
export function addItemTags(value) {
    return {
        type: Add_Item_Tags,
        payload: value
    }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic. 

export const doubleAsync = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(increment(getState().counter.get('val')))
                resolve()
            }, 200)
        })
    }
}
 */
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

    [Add_Provider_Info]: (state, action) => {
        console.log(" reducer Add_Provider_Info is invoked with ", action);
        return state.setIn(['providerEntryForm', action.storeKey], action.payload)
    },

    [Add_Provider_Error_Msg]: (state, action) => {
        console.log(" reducer Add_Provider_Error_Msg is invoked with ", action);

        return state.setIn(['providerEntryForm', action.storeKey], action.payload)
    },


    [Add_Food_Item_Name]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'name'], action.payload)
    },
    [Add_Food_Item_Description]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'description'], action.payload)
    },
    [Add_DeadLine_To_Order]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'deadlineToOrder'], action.payload)
    },
    [Add_Time_Range_To_PickUp_Start]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'timeRangeToPickUp', 'startTime'], action.payload)
    },
    [Add_Time_Range_To_PickUp_End]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'timeRangeToPickUp', 'endTime'], action.payload)
    },
    [Add_Item_Tags]: (state, action) => {
        return state.setIn(['foodItemEntryForm', 'name'], action.payload)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    Map({
        val: 0,
        providerEntryState: {
            loading: false,
            finished: false,
            stepIndex: 0
        },
        providerEntryForm: Map({
            chars_left: MAX_COUNT_PROVIDER_DESC,
            title: '',
            description: '',
            streetName: '',
            keepAddressPrivateFlag: false,
            crosStreetName: '',
            city: '',
            emailId: '',
            keepEmailPrivateFlag: true,
            allClear: false,
            titleErrorMsg: '',
            emailIdErrorMsg: '',
            descriptionErrorMsg: '',
            cityErrorMsg: ''
        }),
        foodItemEntryForm: Map({
            name: '',
            description: '',
            deadlineToOrder: '',
            timeRangeToPickUp: Map({
                startTime: '',
                endTime: ''
            }),
            itemTags: List()

        })

    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
