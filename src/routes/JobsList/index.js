import { injectReducer } from '../../store/reducers'
import { onJobsListEntry} from 'utils/auth/onEnterAuth'

export default (store) => ({
  path : '/jobs/list',
  /*  Async getComponent is only invoked when route matches   */
  onEnter: (nextState, replace) => onJobsListEntry(nextState, replace, store),

  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JobsList = require('./containers/JobsListContainer').default
      const reducer = require('./modules/jobsList').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jobsList', reducer })

      /*  Return getComponent   */
      cb(null, JobsList)

    /* Webpack named bundle   */
    }, 'jobsList')
  }
})
