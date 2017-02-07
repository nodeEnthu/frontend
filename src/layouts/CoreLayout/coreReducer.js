import { connect } from 'react-redux'
import { Map } from 'immutable'

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER"
export const OPEN_MODAL_LOGIN = 'OPEN_MODAL_LOGIN';
export const CLOSE_MODAL_LOGIN = 'CLOSE_MODAL_LOGIN';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_ADDRESS_SEARCH_CHANGE = 'USER_ADDRESS_SEARCH_CHANGE'
export const USER_ADDRESS_UPDATE_PLACE_ID = 'USER_ADDRESS_UPDATE_PLACE_ID'
export const USER_FOOD_ITEM_UPDATE = 'USER_FOOD_ITEM_UPDATE'
export const PUBLISH_USER = "PUBLISH_USER"

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

export function publishUser() {
    return {
        type: PUBLISH_USER
    }
}

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

export function userFoodItemUpdate(_id) {
    return {
        type: USER_FOOD_ITEM_UPDATE,
        payload:_id
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
    [PUBLISH_USER]:(state,action)=>{
        return state.setIn(['user', 'published'],true).setIn(['user', 'userType'],'provider')
    },
    [OPEN_MODAL_LOGIN]: (state, action) => {
        return state.set('loginModalOPen', true)
    },
    [CLOSE_MODAL_LOGIN]: (state, action) => {
        return state.set('loginModalOPen', false)
    },
    [USER_LOGGED_IN]: (state, action) => {
        return state.set('userLoggedIn', action.payload);
    },
    [USER_ADDRESS_SEARCH_CHANGE]: (state, action) => {
        return state.setIn(['userAddressSearch', 'searchText'], action.payload);
    },
    [USER_ADDRESS_UPDATE_PLACE_ID]: (state, action) => {
        return state.setIn(['userAddressSearch', 'place_id'], action.payload);
    },
    [USER_FOOD_ITEM_UPDATE]:(state,action)=>{
        return state.setIn(['user', 'foodItemAddedInEntryMode'],true)
    }
}

const initialState = Map({
    token: '',
    user: Map({
        name: '',
        email: '',
        provider: '',
        img: '',
        fbUserID: '',
        gmailUserID: '',
        publishStage: 0,
        published: false,
        foodItemAddedInEntryMode:false,
        loc:undefined,
        deliveryAddressIndex:undefined,
        userType:'',
    }),
    loginModalOPen: undefined,
    userLoggedIn: false,
    address: '',
    placeId: '',
    userAddressSearch: Map({
        searchText: '',
        place_id: '',
    })
})

export function coreReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
