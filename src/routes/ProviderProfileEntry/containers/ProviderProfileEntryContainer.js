import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { charsLeft, addProviderInfo, addProviderErrorMsg, addMethodOfPayment } from '../modules/providerProfileEntry'
import { fetchSecuredData } from 'utils/actionUtils/defaultHttpActions'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import ProviderProfileEntry from '../components/ProviderProfileEntry'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = (dispatch) => {
    return bindActionCreators({
        charsLeft,
        dispatch,
        addProviderInfo,
        addProviderErrorMsg,
        addMethodOfPayment,
        fetchSecuredData
    }, dispatch)

}

const mapStateToProps = (state) => ({
    globalState: state,
    providerEntryForm: state.providerProfileEntry.get('providerEntryForm'),
    providerEntryState: state.providerProfileEntry.get('providerEntryState'),
    foodItemEntryForm: state.providerProfileEntry.get('foodItemEntryForm'),
    spinner: state.providerProfileEntry.get('spinner'),
    providerProfileEntry: state.providerProfileEntry
})


export default connect(mapStateToProps, mapActionCreators)(ProviderProfileEntry)
