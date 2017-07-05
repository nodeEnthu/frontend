import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import 'react-fastclick';
import { getCall, postCall, securedGetCall } from 'utils/httpUtils/apiCallWrapper';
import { updateLocation } from './location'
import getSearchAddressAndPlaceId from 'utils/getSearchAddressAndPlaceId'
import async from 'async'
// Actions
import * as actions from 'layouts/CoreLayout/coreReducer'
export default (initialState = {}, cb) => {

    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []
    if (__DEV__) {
        const devToolsExtension = window.devToolsExtension
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {};

    // initialization code ends here
    async.parallel([
        function(callback) {
            let token = sessionStorage.getItem('token');
            if (sessionStorage.getItem('token')) {
                securedGetCall('/api/users/me')
                    .then(function(result) {
                        let user = result.data;
                        if (user && user.name) {
                            store.dispatch(actions.userLoggedIn(true));
                            store.dispatch(actions.addUser(user));
                            store.dispatch(actions.addToken(token));
                        }
                        callback();
                    })
            } else {
                store.dispatch(actions.userLoggedIn(false));
                callback();
            }
        },
        function(callback) {
            securedGetCall('/api/env/envVars')
                    .then(function(result) {
                        let envVars = result.data;
                        store.dispatch(actions.addEnvVars(envVars)); 
                        callback();
                    });
        }
    ], function(err, resultArr) {
        cb(store);
    })

    // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
    store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }
}
