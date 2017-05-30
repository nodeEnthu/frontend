import { combineReducers } from 'redux'
import locationReducer from './location'
import homeviewReducer from './../routes/Home/modules/homeview'
import {coreReducer} from '../layouts/CoreLayout/coreReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    core:coreReducer,
    homepage:homeviewReducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer