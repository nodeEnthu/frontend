import * as types from '../constants/ActionTypes';
import moment from 'moment';
import Map from 'immutable';
//////////////////////
// Chat actions
/////////////////////

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    payLoad:message
  };
}
export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: message})
      .catch(error => {throw error});
  }
}

const initialState = Map({
  addMessage:''
})

const ACTION_HANDLERS={
  [types.ADD_MESSAGE]:(state,action)=>{
    return state.set('addMessage',action.payLoad)
  }
}

export default function chatReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
