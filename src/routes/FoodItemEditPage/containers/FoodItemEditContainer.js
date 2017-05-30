import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchData } from 'utils/actionUtils/defaultHttpActions'
import { addFoodItemInfo, removeFoodItemInfo } from './../modules/foodItemEditPage'
import { fromJS } from 'immutable'

import FoodItemEditPage from '../components/FoodItemEditPage'

const mapActionCreators = (dispatch) => {
    return bindActionCreators({
        dispatch,
        fetchData,
        addFoodItemInfo,
        removeFoodItemInfo
    }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        globalState: state,
        foodItemEntryForm: state.foodItemEdit.get('foodItemEntryForm')
    }
}


export default connect(mapStateToProps, mapActionCreators)(FoodItemEditPage)
