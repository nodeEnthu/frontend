import React from 'react'
import './providerFoodEntry.scss'
import FoodItemEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm'
import * as actions from 'layouts/CoreLayout/coreReducer';
import Stepper from 'components/Stepper'

const ProviderFoodEntry = React.createClass ({
  
 
  render() { 
    const {user} = this.props.globalState.core.toJS();
    return (
        <div className="provider-food-entry">
            <Stepper
              steps={[{label:'Profile'},{label:'Food'},{label:'Publish'}]}
              activeStep={2}
            >
            </Stepper>
            <p>
              Enter the food item you wish to provide
            </p>
            <FoodItemEntryForm  globalState ={this.props.globalState}
                                foodItemEntryForm = {this.props.foodItemEntryForm}
                                addFoodItemInfo = {this.props.addFoodItemInfo}
                                fetchData = {this.props.fetchData}
                                removeFoodItemInfo = {this.props.removeFoodItemInfo}
                                mode = {"PROVIDER_ENTRY"} 
                                dispatch={this.props.dispatch}
                                params={this.props.params}
                                nextLabel={"NEXT: PUBLISH"}
                                linkToRedirectOnAllClear={"/provider/"+user._id+"/publish"}
            />
          </div>
    );
  }
})

ProviderFoodEntry.propTypes= {
    globalState:React.PropTypes.object,
    foodItemEntryForm: React.PropTypes.object,
    addFoodItemInfo:React.PropTypes.func,
    removeFoodItemInfo:React.PropTypes.func,
    fetchData:React.PropTypes.func,
    dispatch: React.PropTypes.func
  };
export default ProviderFoodEntry;