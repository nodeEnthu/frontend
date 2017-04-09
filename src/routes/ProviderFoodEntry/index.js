import { injectReducer } from '../../store/reducers'
import { onProviderPageEnter} from 'utils/auth/onEnterAuth'

export default (store) => ({
  path: 'provider',
  onEnter: (nextState, replace) => onProviderPageEnter(nextState, replace, store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Provider = require('./containers/ProviderContainer').default
      const reducer = require('./modules/provider').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'provider', reducer })

      /*  Return getComponent   */
      cb(null, Provider)

    /* Webpack named bundle   */
    }, 'provider')
  }
})
