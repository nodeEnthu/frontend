import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'contactus',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ContactUs = require('./containers/ContactUsContainer').default
      const reducer = require('./modules/contactus').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'contactus', reducer })

      /*  Return ContactUs   */
      cb(null, ContactUs)

    /* Webpack named bundle   */
    }, 'contactus')
  }
})
