import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {homeviewReducer} from './../routes/Home/modules/homeview'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    homepage:homeviewReducer,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
