// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import ProviderProfilePage from './ProviderProfilePage'
import Search from './Search'
import FoodItemReviews from './FoodItemReviews'
import ProviderProfileEditPage from './ProviderProfileEditPage'
import FoodItemEditPage from './FoodItemEditPage'
import FoodItemAddPage from './FoodItemAddPage'
import OrderAction from './OrderAction'
import OrderSummary from './OrderSummary'
import ProviderProfileEntry from './ProviderProfileEntry'
import ProviderFoodEntry from './ProviderFoodEntry'
import ProviderPublish from './ProviderPublish'
import ContactUs from './ContactUs'
import TermsAndConditions from './TermsAndConditions'
import { onMainPageEnter} from 'utils/auth/onEnterAuth'
import JobCreate from './JobCreate'
import JobHome from './JobHome'
import JobApply from './JobApply'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    childRoutes: [{
            indexRoute: Home,
            onEnter: (nextState, replace) => onMainPageEnter(nextState, replace, store)
        },
        ProviderProfileEntry(store),
        ProviderFoodEntry(store),
        ProviderProfilePage(store),
        ProviderPublish(store),
        Search(store),
        FoodItemReviews(store),
        ProviderProfileEditPage(store),
        FoodItemEditPage(store),
        FoodItemAddPage(store),
        OrderAction(store),
        OrderSummary(store),
        ContactUs(store),
        JobCreate(store),
        TermsAndConditions(store),
        JobApply(store),
        JobHome(store)
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
