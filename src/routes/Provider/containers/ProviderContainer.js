import { connect } from 'react-redux'
import {
    
} from '../modules/provider'
import {
    charsLeft,
    addProviderInfo,
    addProviderErrorMsg,
    addFoodItemInfo,
    addProviderEntryState
} from '../modules/provider'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Provider from '../components/Provider'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
    charsLeft,
    addProviderInfo,
    addProviderErrorMsg,
    addFoodItemInfo,
    addProviderEntryState
}

const mapStateToProps = (state) => ({
    providerEntryForm: state.provider.get('providerEntryForm'),
    providerEntryState: state.provider.get('providerEntryState'),
    foodItemEntryForm: state.provider.get('foodItemEntryForm')
})


export default connect(mapStateToProps, mapActionCreators)(Provider)
