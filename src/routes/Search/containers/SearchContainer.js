import { connect } from 'react-redux'
import {selectCuisineOrDiet,flushOutStaleData,selectAddtnlQuery,setDirty} from '../modules/search'
import { userAddressSearchChange,userAddressUpdatePlaceId } from 'layouts/CoreLayout/coreReducer'
import {fetchMayBeSecuredData} from 'utils/actionUtils/defaultHttpActions';
 
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
  selectAddtnlQuery,
  userAddressSearchChange,
  userAddressUpdatePlaceId,
  setDirty
}

const mapStateToProps = (state) => ({
  globalState:state,
  search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
