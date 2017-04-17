import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
createStore(initialState,function(store){
  // ========================================================
  // Render Setup
  // ========================================================
  const MOUNT_NODE = document.getElementById('root')
  injectTapEventPlugin();
  let render = () => {
    const routes = require('./routes/index').default(store)

    ReactDOM.render(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AppContainer
          store={store}
          routes={routes}
        />
      </MuiThemeProvider>,MOUNT_NODE
    );
  }

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
      }

      // Wrap render in try/catch
      render = () => {
        try {
          renderApp()
        } catch (error) {
          renderError(error)
        }
      }

      // Setup hot module replacement
      module.hot.accept('./routes/index', () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
      )
    }
  }

  // ========================================================
  // Go!
  // ========================================================
  render()
})

