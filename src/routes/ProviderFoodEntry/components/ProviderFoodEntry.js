import React from 'react'
import './providerFoodEntry.scss'
import FoodItemEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm'
import * as actions from 'layouts/CoreLayout/coreReducer';

const ProviderFoodEntry = React.createClass ({
  
 
  render() { 
    return (
        <div>
            <p>
              Enter the food item you wish to provide
            </p>
            <FoodItemEntryForm  foodItemEntryForm = {this.props.foodItemEntryForm}
                                addFoodItemInfo = {this.props.addFoodItemInfo}
                                fetchData = {this.props.fetchData}
                                removeFoodItemInfo = {this.props.removeFoodItemInfo}
                                mode = {"PROVIDER_ENTRY"} 
                                dispatch={this.props.dispatch}
                                params={this.props.params}
            />
          </div>
    );
  }
})

ProviderFoodEntry.propTypes= {
    foodItemEntryForm: React.PropTypes.object,
    addFoodItemInfo:React.PropTypes.func,
    removeFoodItemInfo:React.PropTypes.func,
    fetchData:React.PropTypes.func,
    dispatch: React.PropTypes.func
  };
export default ProviderFoodEntry;