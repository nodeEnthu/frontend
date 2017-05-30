import React from 'react'
import './foodItemEditPage.scss'
import RaisedButton from 'material-ui/RaisedButton'
import FoodEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm';

const FoodItemEditPage = React.createClass({
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
    globalState: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    foodItemEntryForm: React.PropTypes.object.isRequired,
    fetchData: React.PropTypes.func.isRequired,
    addFoodItemInfo: React.PropTypes.func.isRequired,
    removeFoodItemInfo: React.PropTypes.func.isRequired
}
export default FoodItemEditPage;
