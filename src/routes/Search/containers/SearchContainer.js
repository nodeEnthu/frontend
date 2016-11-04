import { connect } from 'react-redux'
import {selectCuisineOrDiet,flushOutStaleData,selectAddtnlQuery } from '../modules/search'
import {fetchMayBeSecuredData} from 'utils/actionUtils/defaultHttpActions';
import { userAddressUpdateDetect } from '../../../layouts/CoreLayout/coreReducer'
 
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Search from 'routes/Search/components/Search'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchMayBeSecuredData,
  flushOutStaleData,
  selectCuisineOrDiet,
  userAddressUpdateDetect,
  selectAddtnlQuery
}

const mapStateToProps = (state) => ({
  globalState:state,
  search: state.search,
  addressChange:state.core.get('userAddressSearch').get('newAddress')
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
