import { combineReducers } from 'redux'
import locationReducer from './location'
import homeviewReducer from './../routes/Home/modules/homeview'
import {coreReducer} from '../layouts/CoreLayout/coreReducer'
import { reducer as formReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    core:coreReducer,
    homepage:homeviewReducer,
    location: locationReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer