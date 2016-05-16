import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {homeviewReducer} from './../routes/Home/modules/homeview'
const LEFTNAV_OPEN_CLOSE = 'LEFTNAV_OPEN_CLOSE'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    homeviewReducer:homeviewReducer,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
