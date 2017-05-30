import React from 'react'
import './foodItemEditPage.scss'
import RaisedButton from 'material-ui/RaisedButton'
import FoodEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const FoodItemEditPage = createReactClass({
    render() {
        return ( <FoodEntryForm foodItemEntryForm = { this.props.foodItemEntryForm }
            globalState = { this.props.globalState }
            fetchData = { this.props.fetchData }
            addFoodItemInfo = { this.props.addFoodItemInfo }
            removeFoodItemInfo = { this.props.removeFoodItemInfo }
            params = { this.props.params }
            mode = { "editMode" }
            nextLabel = { "SAVE CHANGES" }
            dispatch = { this.props.dispatch }
            />
        )
    }
})
FoodItemEditPage.propTypes = {
    globalState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    foodItemEntryForm: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    addFoodItemInfo: PropTypes.func.isRequired,
    removeFoodItemInfo: PropTypes.func.isRequired
}
export default FoodItemEditPage;
