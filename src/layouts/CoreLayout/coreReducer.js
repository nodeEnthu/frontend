import { connect } from 'react-redux'
import { Map } from 'immutable'

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER"
export const OPEN_MODAL_LOGIN = 'OPEN_MODAL_LOGIN';
export const CLOSE_MODAL_LOGIN = 'CLOSE_MODAL_LOGIN';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_ADDRESS_SEARCH_CHANGE = 'USER_ADDRESS_SEARCH_CHANGE'
export const USER_ADDRESS_UPDATE_PLACE_ID = 'USER_ADDRESS_UPDATE_PLACE_ID'
export const USER_ADDRESS_UPDATE_DETECT = 'USER_ADDRESS_UPDATE_DETECT'

const initialState = Map({
    token: '',
    user: Map({
        name: '',
        email: '',
        provider: '',
        img: '',
        fbUserID: '',
        gmailUserID: ''
    }),
    loginModalOPen: false,
    userLoggedIn: false,
    address: '',
    placeId: '',
    userAddressSearch: Map({
        searchText: '',
        place_id: '',
        newAddress:false
    })
})

export function addToken(value) {
    return {
        type: "ADD_TOKEN",
        payload: value
    }
}
export function addUser(user) {
    return {
        type: "ADD_USER",
        payload: user
    }
}
export function openLoginModal() {
    return {
        type: OPEN_MODAL_LOGIN,
    };
};

export function closeLoginModal() {
    return {
        type: CLOSE_MODAL_LOGIN,
    };
};
export function userLoggedIn(val) {
    return {
        type: USER_LOGGED_IN,
        payload: val
    };
};
export function userAddressSearchChange(val) {
    return {
        type: USER_ADDRESS_SEARCH_CHANGE,
        payload: val
    }
}
export function userAddressUpdatePlaceId(val) {
    return {
        type: USER_ADDRESS_UPDATE_PLACE_ID,
        payload: val
    }
}
export function userAddressUpdateDetect(val) {
    return {
        type: USER_ADDRESS_UPDATE_DETECT,
        payload:val
    }
}


const ACTION_HANDLERS = {
    [ADD_TOKEN]: (state, action) => {
        return state.set('token', action.payload)
    },
    [ADD_USER]: (state, action) => {
        let newUser = Map(action.payload);
        return state.set('user', newUser)
    },
    [OPEN_MODAL_LOGIN]: (state, action) => {
        return state.set('loginModalOPen', true)
    },
    [CLOSE_MODAL_LOGIN]: (state, action) => {
        return state.set('loginModalOPen', false)
    },
    [USER_LOGGED_IN]: (state, action) => {
        console.log('USER_LOGGED_IN is invoked with ', action.payload);
        return state.set('userLoggedIn', action.payload);
    },
    [USER_ADDRESS_SEARCH_CHANGE]: (state, action) => {
        return state.updateIn(['userAddressSearch', 'searchText'], value => action.payload);
    },
    [USER_ADDRESS_UPDATE_PLACE_ID]: (state, action) => {
        return state.updateIn(['userAddressSearch', 'place_id'], value => action.payload);
    },
    [USER_ADDRESS_UPDATE_DETECT]: (state, action) => {
        return state.updateIn(['userAddressSearch', 'newAddress'], value => action.payload);
    }
}

export function coreReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
