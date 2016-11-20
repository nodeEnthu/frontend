import React from 'react'
import { Step,Stepper,StepLabel} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import ImageUploader from '../../../components/ImageUploader/index'
import classes from './provider.scss'
import ProviderEntryForm from '../../../components/ProviderEntryForm/ProviderEntryForm'
import FoodItemEntryForm from '../../../components/FoodItemEntryForm/FoodItemEntryForm'
import ProviderProfile from 'components/ProviderProfile'

class Provider extends React.Component {
  state = this.props.providerEntryState.toJS();
  onAllClear=()=>{
    const stepIndex = this.props.providerEntryState.get('stepIndex');
    this.props.addProviderEntryState({
      storeKey: "stepIndex",
      payload:stepIndex +1
    });
  };
  handleNext = () => {
    if(this.props.providerEntryState.get('stepIndex')===0){
      this.refs.providerform.formSubmit();
    }
    if(this.props.providerEntryState.get('stepIndex')===1){
      this.refs.foodItemEntryForm.formSubmit();
    }
  };
  handlePrev = () => {
   const stepIndex = this.props.providerEntryState.get('stepIndex');
    if (!this.props.providerEntryState.get('loading')) {
        this.props.addProviderEntryState({
          storeKey: "loading",
          payload:false
        });
        this.props.addProviderEntryState({
          storeKey: "stepIndex",
          payload:stepIndex -1
        });
    }
  };

  getStepContent(stepIndex,user) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <p>
              Please give a brief history about your cooking skills along with a picture showcasing you/your business
            </p>
            <div className={classes["is-center"]}>
              <ImageUploader/>
            </div>
            <ProviderEntryForm  providerEntryForm = {this.props.providerEntryForm}
                                addProviderInfo = {this.props.addProviderInfo}
                                addProviderErrorMsg = {this.props.addProviderErrorMsg}
                                onAllClear = {this.onAllClear}
                                fetchSecuredData = {this.props.fetchSecuredData} 
                                params = {{id:user._id}}
                                actionName = {"PROVIDER_ENTRY"}
                                prefilProviderEntryForm = {this.props.prefilProviderEntryForm}
                                ref="providerform" 
            />
          </div>
          
        );
      case 1:
        return (
          <div>
            <p>
              Enter the food item you wish to provide
            </p>
            <div className={classes["is-center"]}>
                <ImageUploader/>
            </div>
            <FoodItemEntryForm  onAllClear = {this.onAllClear} 
                                foodItemEntryForm = {this.props.foodItemEntryForm}
                                addFoodItemInfo = {this.props.addFoodItemInfo}
                                fetchData = {this.props.fetchData}
                                removeFoodItemInfo = {this.props.removeFoodItemInfo}
                                params = {this.props.params} 
                                ref="foodItemEntryForm"
            />
          </div>
        );
      case 2:
        return (
          <div style={{position:'flex',top:'150px'}}>
            <ProviderProfile  params = {{id:user._id}}
                              providerProfile = {this.props.provider}
                              globalState = {this.props.globalState}
                              fetchMayBeSecuredData = {this.props.fetchMayBeSecuredData}
                              actionName = {"PROVIDER_ENTRY"}
                              mode={"providerEntry"}
            />
          </div>
        );
      default:
        return 'Youre a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.props.providerEntryState.toJS();
    const {user} = this.props.globalState.core.toJS();
    const contentStyle = {margin: '0 16px'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
            Click here</a> to reset the example.
          </p>
        </div>
      );
    }
    return (
      <div style={contentStyle} >
        <div >{this.getStepContent(stepIndex,user)}</div>
        <div style={{display:'block', clear:'both', marginTop: 24, marginBottom: 12, textAlign:'center'}}>
          {
            (stepIndex === 2)?
              undefined
              :
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
          }
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
     
    const {loading, stepIndex} = this.props.providerEntryState.toJS();

    return (
      <div className="pure-g" className = {classes["pure-override-letter-spacing"]}>
        <div className = "counter-fixed-menu">
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Set-up profile</StepLabel>
              </Step>
              <Step>
                <StepLabel>Item info</StepLabel>
              </Step>
              <Step>
                <StepLabel>Preview and Submit</StepLabel>
              </Step>
            </Stepper>
            <ExpandTransition loading={loading} open={true} >
              {this.renderContent()}
            </ExpandTransition>
          </div> 
      </div>
    );
  }
}

Provider.propTypes= {
    globalState:React.PropTypes.object.isRequired,
    providerEntryState: React.PropTypes.object.isRequired,
    providerEntryForm: React.PropTypes.object.isRequired,
    foodItemEntryForm: React.PropTypes.object.isRequired,
    charsLeft:React.PropTypes.func.isRequired,
    addProviderInfo:React.PropTypes.func.isRequired,
    addProviderErrorMsg:React.PropTypes.func.isRequired,
    addFoodItemInfo:React.PropTypes.func.isRequired,
    removeFoodItemInfo:React.PropTypes.func.isRequired,
    addProviderEntryState:React.PropTypes.func.isRequired,
    fetchData:React.PropTypes.func.isRequired,
    fetchSecuredData:React.PropTypes.func,
    provider:React.PropTypes.object,
    fetchMayBeSecuredData:React.PropTypes.func,
    prefilProviderEntryForm:React.PropTypes.func
};
export default Provider;