import { connect } from 'react-redux'
import { Map } from 'immutable'

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER"
export const OPEN_MODAL_LOGIN = 'OPEN_MODAL_LOGIN';
export const CLOSE_MODAL_LOGIN = 'CLOSE_MODAL_LOGIN';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

const initialState = Map({
    token: '',
    user: Map({
        name: '',
        email: '',
        provider: '',
        img:'',
        fbUserID: '',
        gmailUserID:''
    }),
    loginModalOPen:false,
    userLoggedIn:false,
    address:'',
    placeId:''
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
    payload:val
  };
};

const ACTION_HANDLERS = {
    [ADD_TOKEN]: (state, action) => {
        return state.set('token', action.payload)
    },
    [ADD_USER]: (state, action) => {
        let newUser = Map(action.payload);
        return state.set('user', newUser)
    },
    [OPEN_MODAL_LOGIN]: (state,action) => {
        return state.set('loginModalOPen', true)
    },
    [CLOSE_MODAL_LOGIN]: (state, action) => {
        return state.set('loginModalOPen', false)
    },
    [USER_LOGGED_IN]:(state,action)=>{
        console.log('USER_LOGGED_IN is invoked with ', action.payload );
        return state.set('userLoggedIn',action.payload);
    }   
}

export function coreReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
