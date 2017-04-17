import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {  addFoodItemInfo, removeFoodItemInfo} from '../modules/providerFoodEntry'
import { fetchData} from 'utils/actionUtils/defaultHttpActions'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import ProviderFoodEntry from '../components/ProviderFoodEntry'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = (dispatch) => {
    return bindActionCreators({
        dispatch,
        addFoodItemInfo,
        removeFoodItemInfo,
        fetchData
    }, dispatch)

}

const mapStateToProps = (state) => ({
    globalState: state,
    foodItemEntryForm: state.providerFoodEntry.get('foodItemEntryForm'),
})


export default connect(mapStateToProps, mapActionCreators)(ProviderFoodEntry)
