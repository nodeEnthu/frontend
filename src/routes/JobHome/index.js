import { injectReducer } from '../../store/reducers'
import JobSummary from './routes/JobSummary'
import JobInvite from './routes/JobInvite'
import JobProposals from './routes/JobProposals'
import JobHired from './routes/JobHired'

export default (store) => ({
  path : '/job/:id',
   childRoutes: [
     JobSummary(store),
     JobInvite(store),
     JobProposals(store),
     JobHired(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JobHome = require('./containers/JobHomeContainer').default
      const reducer = require('./modules/jobHome').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jobHome', reducer })

      /*  Return getComponent   */
      cb(null, JobHome)

    /* Webpack named bundle   */
    }, 'jobHome')
  }
})