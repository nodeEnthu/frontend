import { injectReducer } from '../../store/reducers'
import { onJobCreateEntry} from 'utils/auth/onEnterAuth'

export default (store) => ({
  path : 'job/create',
  onEnter: (nextState, replace) => onJobCreateEntry(nextState, replace, store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JobCreate = require('./containers/JobCreateContainer').default
      const reducer = require('./modules/jobCreate').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jobCreate', reducer })

      /*  Return getComponent   */
      cb(null, JobCreate)

    /* Webpack named bundle   */
    }, 'jobCreate')
  }
})
