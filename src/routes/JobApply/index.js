import { injectReducer } from '../../store/reducers'
import { onJobApplyEntry} from 'utils/auth/onEnterAuth'

export default (store) => ({
  path : '/job/apply/board',
  onEnter: (nextState, replace) => onJobApplyEntry(nextState, replace, store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JobApply = require('./containers/JobApplyContainer').default
      const reducer = require('./modules/jobApply').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jobApply', reducer })

      /*  Return getComponent   */
      cb(null, JobApply)

    /* Webpack named bundle   */
    }, 'jobApply')
  }
})
