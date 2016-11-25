import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import 'react-fastclick';
import {getCall,postCall,securedGetCall} from 'utils/httpUtils/apiCallWrapper';
import { updateLocation } from './location'

// Actions
import * as actions from 'layouts/CoreLayout/coreReducer'
export default (initialState = {},cb) => {

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {};

  // initializing code goes here .. bit of a hack .. should be improved
  let token = sessionStorage.getItem('token');
  if(sessionStorage.getItem('token')){
    securedGetCall('/api/users/me')
    .then(function(result) {
        store.dispatch(actions.userLoggedIn(true));
        store.dispatch(actions.addUser(result.data));
        store.dispatch(actions.addToken(token));
        cb(store);
    })
  } else{
    store.dispatch(actions.userLoggedIn(false));
    cb(store);
  }
  // initialization code ends here


  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }
}
