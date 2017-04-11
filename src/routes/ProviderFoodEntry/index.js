import { injectReducer } from '../../store/reducers'
import { onProviderPageEnter} from 'utils/auth/onEnterAuth'

export default (store) => ({
  path: '/provider/:id/providerFoodEntry',
  onEnter: (nextState, replace) => onProviderPageEnter(nextState, replace, store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ProviderFoodEntry = require('./containers/ProviderFoodEntryContainer').default
      const reducer = require('./modules/providerFoodEntry').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'providerFoodEntry', reducer })

      /*  Return getComponent   */
      cb(null, ProviderFoodEntry)

    /* Webpack named bundle   */
    }, 'providerFoodEntry')
  }
})
