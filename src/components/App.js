import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class';

const App = createReactClass({

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    )
  }
})

App.propTypes={
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
}

export default App
