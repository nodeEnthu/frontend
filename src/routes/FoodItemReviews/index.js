import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/foodItem/:id/reviews',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ReviewsContainer = require('./containers/ReviewsContainer').default
      const reducer = require('./modules/reviewsReducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'reviews', reducer })

      /*  Return getComponent   */
      cb(null, ReviewsContainer)

    /* Webpack named bundle   */
    }, 'foodItemReviews')
  }
})