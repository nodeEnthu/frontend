import { injectReducer } from 'store/reducers'
import { onJobInviteEntry } from 'utils/auth/onEnterAuth'

export default (store) => ({
  path: '/job/:id/invite',
  onEnter: (nextState, replace) => onJobInviteEntry(nextState, replace, store),

  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JobInvite = require('./containers/JobInviteContainer').default
      const reducer = require('./modules/jobInvite').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jobInvite', reducer })

      /*  Return getComponent   */
      cb(null, JobInvite)

      /* Webpack named bundle   */
    }, 'jobInvite')
  }
})
