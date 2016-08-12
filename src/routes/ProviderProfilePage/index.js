import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'providerProfile',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ProviderProfilePage = require('./containers/ProviderProfilePageContainer').default
      const reducer = require('./modules/providerProfilePage').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'providerProfile', reducer })

      /*  Return getComponent   */
      cb(null, ProviderProfilePage)

    /* Webpack named bundle   */
    }, 'provideProfile')
  }
})
