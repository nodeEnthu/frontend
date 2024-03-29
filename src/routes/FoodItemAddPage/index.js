import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/foodItems/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const FoodItemAddContainer = require('./../FoodItemEditPage/containers/FoodItemEditContainer').default
      const reducer = require('./../FoodItemEditPage/modules/foodItemEditPage').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'foodItemEdit', reducer })

      /*  Return getComponent   */
      cb(null, FoodItemAddContainer)

    /* Webpack named bundle   */
    }, 'foodItemEdit');
  }
})