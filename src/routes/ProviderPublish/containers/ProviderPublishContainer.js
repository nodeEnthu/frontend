import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { fetchSecuredData, fetchMayBeSecuredData } from 'utils/actionUtils/defaultHttpActions'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import ProviderPublish from '../components/ProviderPublish'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = (dispatch) => {
    return bindActionCreators({
        dispatch,
        fetchSecuredData,
        fetchMayBeSecuredData
    }, dispatch)

}

const mapStateToProps = (state) => ({
    globalState: state,
    providerPublish: state.providerPublish
})


export default connect(mapStateToProps, mapActionCreators)(ProviderPublish)
