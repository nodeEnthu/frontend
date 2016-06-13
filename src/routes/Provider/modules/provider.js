// ------------------------------------
// Constants
// ------------------------------------
export const Chars_Left = 'Chars_Left'
export const Add_Provider_Title = 'Add_Provider_Title'
export const Add_Provider_Description = 'Add_Provider_Description'
export const Add_Provider_Street_Name = 'Add_Provider_Street_Name'
export const Add_Provider_CrosStreet_Name = 'Add_Provider_CrosStreet_Name'
export const Add_Provider_City = 'Add_Provider_City'
export const Add_Provider_Email = 'Add_Provider_Email'
export const Form_All_Clear_Flag = 'Form_All_Clear_Flag'
export const Add_Provider_Keep_Address_Private_Flag = 'Add_Provider_Keep_Address_Private_Flag'
export const Add_Provider_Keep_Email_Private_Flag = 'Add_Provider_Keep_Email_Private_Flag'
export const Add_Provider_Title_Error_Msg = 'Add_Provider_Title_Error_Msg'
export const Add_Provider_Description_Error_Msg = 'Add_Provider_Description_Error_Msg'
export const Add_Provider_Email_Id_Error_Msg = 'Add_Provider_Email_Id_Error_Msg'
export const Add_Provider_City_Error_Msg = 'Add_Provider_City_Error_Msg'


export const Add_Food_Item_Name = 'Add_Food_Item_Name'
export const Add_Food_Item_Description = 'Add_Food_Item_Description'
export const Add_DeadLine_To_Order = 'Add_DeadLine_To_Order'
export const Add_Time_Range_To_PickUp_Start = 'Add_Time_Range_To_PickUp_Start'
export const Add_Time_Range_To_PickUp_End = 'Add_Time_Range_To_PickUp_End'
export const Add_Item_Tags = 'Add_Item_Tags'

export const MAX_COUNT_PROVIDER_DESC = 100;
import { Map,List } from 'immutable'
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
export function addProviderTitle(value) {
    return {
        type: Add_Provider_Title,
        payload: value
    }
}
export function addProviderDescription(value) {
    return {
        type: Add_Provider_Description,
        payload: value
    }
}
export function addProviderStreetName(value) {
    return {
        type: Add_Provider_Street_Name,
        payload: value
    }
}
export function addProviderCrosStreetName(value) {
    return {
        type: Add_Provider_CrosStreet_Name,
        payload: value
    }
}
export function addProviderCity(value) {
    return {
        type: Add_Provider_City,
        payload: value
    }
}
export function addProviderKeepAddressPrivateFlag(value) {
    return {
        type: Add_Provider_Keep_Address_Private_Flag,
        payload: value
    }
}
export function addProviderKeepEmailPrivateFlag(value) {
    return {
        type: Add_Provider_Keep_Email_Private_Flag,
        payload: value
    }
}
export function formAllClearFlag(value) {
    return {
        type: Form_All_Clear_Flag,
        payload: value
    }
}
export function addProviderEmail(value) {
    return {
        type: Add_Provider_Email,
        payload: value
    }
}
export function addProviderTitleErrorMsg(value) {
    return {
        type: Add_Provider_Title_Error_Msg,
        payload: value
    }
}
export function addProviderEmailIdErrorMsg(value) {
    return {
        type: Add_Provider_Email_Id_Error_Msg,
        payload: value
    }
}
export function addProviderDescriptionErrorMsg(value) {
    return {
        type: Add_Provider_Description_Error_Msg,
        payload: value
    }
}
export function addProviderCityErrorMsg(value) {
    return {
        type: Add_Provider_City_Error_Msg,
        payload: value
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

    [Add_Provider_Title]: (state, action) => {
        return state.setIn(['providerEntryForm','title'], action.payload)
    },
    [Add_Provider_Description]: (state, action) => {
        return state.setIn(['providerEntryForm','description'], action.payload)
    },
    [Add_Provider_Street_Name]: (state, action) => {
        return state.setIn(['providerEntryForm','streetName'], action.payload)
    },
    [Add_Provider_CrosStreet_Name]: (state, action) => {
        return state.setIn(['providerEntryForm','crosStreetName'], action.payload)
    },
    [Add_Provider_City]: (state, action) => {
        return state.setIn(['providerEntryForm','city'], action.payload)
    },
    [Add_Provider_Email]: (state, action) => {
        return state.setIn(['providerEntryForm','emailId'], action.payload)
    },
    [Add_Provider_Keep_Address_Private_Flag]: (state, action) => {
        return state.setIn(['providerEntryForm','keepAddressPrivateFlag'], action.payload)
    },
    [Add_Provider_Keep_Email_Private_Flag]: (state, action) => {
        return state.setIn(['providerEntryForm','keepEmailPrivateFlag'], action.payload)
    },
    [Form_All_Clear_Flag]: (state, action) => {
        return state.setIn(['providerEntryForm','formAllClearFlag'], action.payload)
    },
    [Add_Provider_Title_Error_Msg]: (state, action) => {
        return state.setIn(['providerEntryForm','titleErrorMsg'], action.payload)
    },
    [Add_Provider_Email_Id_Error_Msg]: (state, action) => {
        return state.setIn(['providerEntryForm','emailIdErrorMsg'], action.payload)
    },
    [Add_Provider_Description_Error_Msg]: (state, action) => {
        return state.setIn(['providerEntryForm','descriptionErrorMsg'], action.payload)
    },
    [Add_Provider_City_Error_Msg]: (state, action) => {
        return state.setIn(['providerEntryForm','cityErrorMsg'], action.payload)
    },


    [Add_Food_Item_Name]: (state, action) => {
        return state.setIn(['foodItemEntryForm','name'], action.payload)
    },
    [Add_Food_Item_Description]: (state, action) => {
        return state.setIn(['foodItemEntryForm','description'], action.payload)
    },
    [Add_DeadLine_To_Order]: (state, action) => {
        return state.setIn(['foodItemEntryForm','deadlineToOrder'], action.payload)
    },
    [Add_Time_Range_To_PickUp_Start]: (state, action) => {
        return state.setIn(['foodItemEntryForm','timeRangeToPickUp','startTime'], action.payload)
    },
    [Add_Time_Range_To_PickUp_End]: (state, action) => {
        return state.setIn(['foodItemEntryForm','timeRangeToPickUp','endTime'], action.payload)
    },
    [Add_Item_Tags]: (state, action) => {
        return state.setIn(['foodItemEntryForm','name'], action.payload)
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
            chars_left: MAX_COUNT_PROVIDER_DESC ,
            title: '',
            description: '',
            streetName: '',
            keepAddressPrivateFlag:false,
            crosStreetName: '',
            city: '',
            emailId: '',
            keepEmailPrivateFlag:true,
            allClear: false,
            titleErrorMsg: '',
            emailIdErrorMsg: '',
            descriptionErrorMsg: '',
            cityErrorMsg: ''
        }),
        foodItemEntryForm:Map({
            name:'',
            description:'',
            deadlineToOrder:'',
            timeRangeToPickUp:Map({
                startTime:'',
                endTime:''
            }),
            itemTags:List()

        })

    })
export default function providerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
