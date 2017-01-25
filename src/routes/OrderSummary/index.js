import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/user/:userId/order-summary',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const OrderAction = require('./containers/OrderSummaryContainer').default
      const reducer = require('./modules/orderSummary').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'orderSummary', reducer })

      /*  Return getComponent   */
      cb(null, OrderAction)

    /* Webpack named bundle   */
    }, 'order-summary')
  }
})
