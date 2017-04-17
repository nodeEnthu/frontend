import * as types from '../constants/ActionTypes';
import moment from 'moment';
import {Map,Set} from 'immutable';
//////////////////////
// Chat actions
/////////////////////

export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    payLoad:message
  };
}

export function addTimeStamp(timeStamp){
  return{
    type: types.ADD_TIME_STAMP,
    payLoad:timeStamp
  }
}
export function createMessage(message) {
  return dispatch => {
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: message})
      .catch(error => {throw error});
  }
}

export function createChannel(channel) {
  return dispatch => {
    dispatch(addChannel(channel))
    return fetch ('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(channel)})
      .catch(error => {throw error});
  }
}
export function typing(username) {
  return {
    type: types.TYPING,
    username
  };
}
export function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username
  };
}
const initialState = Map({
  text: '',
  user: '',
  time: '',
  typing:Set()
})

const ACTION_HANDLERS={
  [types.ADD_MESSAGE]:(state,action)=>{
    return state.set('text',action.payLoad)
  },
  [types.TYPING]:(state,action)=>{
    let newState = state.update('typing',set=>set.add(action.username));
    return newState;
  },
  [types.STOP_TYPING]:(state,action)=>{
    return state.get('typing').filter(function(user) {
      return user !== action.username;
    });
  },
  [types.ADD_TIME_STAMP]:(state,action)=>{
    return state.set('time',action.payLoad);
  }
}

export default function chatReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
