// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import ProviderRoute from './Provider'
import ProviderProfilePage from './ProviderProfilePage'
import Search from './Search'
import FoodItemReviews from './FoodItemReviews'
import ProviderProfileEditPage from './ProviderProfileEditPage'
import FoodItemEditPage from './FoodItemEditPage'
import FoodItemAddPage from './FoodItemAddPage'

import { onMainPageEnter } from 'utils/auth/onEnterAuth'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    childRoutes: [{
            indexRoute: Home,
            onEnter: (nextState, replace) => onMainPageEnter(nextState, replace, store)
        },
        ProviderRoute(store),
        ProviderProfilePage(store),
        Search(store),
        FoodItemReviews(store),
        ProviderProfileEditPage(store),
        FoodItemEditPage(store),
        FoodItemAddPage(store)
    ]

})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
