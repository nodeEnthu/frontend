// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const MAX_COUNT_PROVIDER_DESC = 100;
import { Map } from 'immutable'
// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = 1) {
    return {
        type: COUNTER_INCREMENT,
        payload: value
    }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

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

export const actions = {
    increment,
    doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [COUNTER_INCREMENT]: (state, action) => {
        return state.set('val', state.get('val') + action.payload)
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
        providerEntryForm: {
            chars_left: MAX_COUNT_PROVIDER_DESC ,
            title: 'This is for starters',
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
        }

    })
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
