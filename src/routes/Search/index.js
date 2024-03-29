import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'search',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SearchContainer = require('./containers/SearchContainer').default
      const reducer = require('./modules/search').default

      /*  Add the reducer to the store on key 'search'  */
      injectReducer(store, { key: 'search', reducer })

      /*  Return getComponent   */
      cb(null, SearchContainer)

    /* Webpack named bundle   */
    }, 'search')
  }
})
