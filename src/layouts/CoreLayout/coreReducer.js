import { connect } from 'react-redux'
import { Map } from 'immutable'

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER"
export const OPEN_MODAL_LOGIN = 'OPEN_MODAL_LOGIN';
export const CLOSE_MODAL_LOGIN = 'CLOSE_MODAL_LOGIN';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const UPDATE_USER = 'UPDATE_USER';
export const USER_FOOD_ITEM_UPDATE = 'USER_FOOD_ITEM_UPDATE'
export const PUBLISH_USER = "PUBLISH_USER"
export const POST_LOGIN_URL_REDIRECT = "POST_LOGIN_URL_REDIRECT"
export const SCORLL_TO_ITEM_IN_USER_PROFILE = "SCORLL_TO_ITEM_IN_USER_PROFILE"
export const ALREADY_SCROLLED = "ALREADY_SCROLLED"
export const ADD_ENV_VARS = "ADD_ENV_VARS"

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

export function updateUser(storeKey, storeVal) {
    return {
        type: UPDATE_USER,
        storeKey: storeKey,
        payload: storeVal
    };
};

export function publishUser() {
    return {
        type: PUBLISH_USER
    }
}


export function userFoodItemUpdate(_id) {
    return {
        type: USER_FOOD_ITEM_UPDATE,
        payload: _id
    }
}
export function postLoginUrlRedirect(url) {
    return {
        type: POST_LOGIN_URL_REDIRECT,
        payload: url
    }
}
export function userProfileScrollPosition(id) {
    return {
        type: SCORLL_TO_ITEM_IN_USER_PROFILE,
        payload: id
    }
}
export function alreadyScrolled() {
    return {
        type: ALREADY_SCROLLED
    }
}
export function addEnvVars(envVars) {
    return {
        type: ADD_ENV_VARS,
        payload: envVars
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
    [PUBLISH_USER]: (state, action) => {
        return state.setIn(['user', 'published'], true).setIn(['user', 'userType'], 'provider')
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
    [UPDATE_USER]: (state, action) => {
        return state.setIn(['user', action.storeKey], action.payload);
    },
    [USER_FOOD_ITEM_UPDATE]: (state, action) => {
        return state.setIn(['user', 'foodItemAddedInEntryMode'], true)
    },
    [POST_LOGIN_URL_REDIRECT]: (state, action) => {
        return state.set('postLoginUrlRedirect', action.payload)
    },
    [SCORLL_TO_ITEM_IN_USER_PROFILE]: (state, action) => {
        return state.setIn(['userProfileScroll', 'id'], action.payload)
            .setIn(['userProfileScroll', 'onceScrolled'], false)
    },
    [ALREADY_SCROLLED]: (state, action) => {
        return state.setIn(['userProfileScroll', 'onceScrolled'], true)
    },
    [ADD_ENV_VARS]: (state, action) => {
        return state.set('envVars', Map(action.payload))
    },
}

const initialState = Map({
    token: '',
    user: Map({
        _id: undefined,
        name: '',
        email: '',
        provider: '',
        img: '',
        fbUserID: '',
        gmailUserID: '',
        publishStage: 0,
        published: false,
        foodItemAddedInEntryMode: false,
        foodItems: undefined,
        loc: undefined,
        deliveryAddressIndex: undefined,
        userType: '',
        searchText: '',
        place_id: '',
        currency: undefined,
        firstTime:''
    }),
    loginModalOPen: undefined,
    userLoggedIn: false,
    postLoginUrlRedirect: '',
    userProfileScroll: Map({
        id: undefined,
        onceScrolled: false
    }),
    envVars: Map({
        initialImageUrl: '',
        googleLoginId: '',
        facebookLoginId: '',
        oneSignalAppId:''
    })
})

export function coreReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
