import React from 'react'
import './providerFoodEntry.scss'
import FoodItemEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm'
import * as actions from 'layouts/CoreLayout/coreReducer';
import Stepper from 'components/Stepper'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const ProviderFoodEntry = createReactClass ({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
 
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
                                nextLabel={"NEXT"}
                                linkToRedirectOnAllClear={"/provider/"+user._id+"/publish"+ this.context.router.location.search}
            />
          </div>
    );
  }
})

ProviderFoodEntry.propTypes= {
    globalState:PropTypes.object,
    foodItemEntryForm: PropTypes.object,
    addFoodItemInfo:PropTypes.func,
    removeFoodItemInfo:PropTypes.func,
    fetchData:PropTypes.func,
    dispatch: PropTypes.func
  };
export default ProviderFoodEntry;