import { connect } from 'react-redux'
import {fetchSecuredData} from 'utils/actionUtils/defaultHttpActions'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import OrderSummary from '../components/OrderSummary'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchSecuredData
}

const mapStateToProps = (state) => ({
  globalState:state,
  ordersAsCustomer:state.orderSummary.get('ordersAsCustomer'),
  ordersAsProvider:state.orderSummary.get('ordersAsProvider')
})


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
