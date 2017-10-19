import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/how/tiffin/works/customer',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HowTiffinWorksCustomer = require('./containers/HowTiffinWorksCustomerContainer').default
      const reducer = require('./modules/howTiffinWorksCustomer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'howTiffinWorksCustomer', reducer })

      /*  Return getComponent   */
      cb(null, HowTiffinWorksCustomer)

    /* Webpack named bundle   */
    }, 'howTiffinWorksCustomer')
  }
})
