import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/how/tiffin/works/provider',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HowTiffinWorksProvider = require('./containers/HowTiffinWorksProviderContainer').default
      const reducer = require('./modules/howTiffinWorksProvider').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'howTiffinWorksProvider', reducer })

      /*  Return getComponent   */
      cb(null, HowTiffinWorksProvider)

    /* Webpack named bundle   */
    }, 'howTiffinWorksProvider')
  }
})
