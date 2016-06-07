import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {homeviewReducer} from './../routes/Home/modules/homeview'
import {reducer as formReducer} from 'redux-form';
const LEFTNAV_OPEN_CLOSE = 'LEFTNAV_OPEN_CLOSE'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    homepage:homeviewReducer,
    form: formReducer,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
