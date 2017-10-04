import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : '/job/:id/proposals',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JobProposals = require('./containers/JobProposalsContainer').default
      const reducer = require('./modules/jobProposals').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jobProposals', reducer })

      /*  Return getComponent   */
      cb(null, JobProposals)

    /* Webpack named bundle   */
    }, 'jobProposals')
  }
})