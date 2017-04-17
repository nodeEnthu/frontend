import { connect } from 'react-redux'
import {fetchData} from 'utils/actionUtils/defaultHttpActions'
import {addFoodItemInfo,removeFoodItemInfo,showHideSpinner} from './../modules/foodItemEditPage'
import { fromJS } from 'immutable'

import FoodItemEditPage from '../components/FoodItemEditPage'



const mapActionCreators = {
    fetchData,
    addFoodItemInfo,
    removeFoodItemInfo,
    showHideSpinner
}

const mapStateToProps = (state) => {
    return {
        globalState:state,
        foodItemEntryForm:state.foodItemEdit.get('foodItemEntryForm'),
        spinner:state.foodItemEdit.get('spinner')
    }
}


export default connect(mapStateToProps, mapActionCreators)(FoodItemEditPage)
