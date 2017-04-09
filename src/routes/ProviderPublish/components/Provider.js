import React from 'react'
import { Step,Stepper,StepLabel} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ImageUploader from '../../../components/ImageUploader/index'
import './provider.scss'
import ProviderEntryForm from '../../../components/ProviderEntryForm/ProviderEntryForm'
import FoodItemEntryForm from '../../../components/FoodItemEntryForm/FoodItemEntryForm'
import ProviderProfile from 'components/ProviderProfile'
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import * as actions from 'layouts/CoreLayout/coreReducer';

const Provider = React.createClass ({
  componentDidMount() {

    const {user} = this.props.globalState.core.toJS();
    let userStep = (user.published)? 2:user.publishStage;
    // user clicked back after entering an item
    if((userStep ===1 || userStep ===0) && user.foodItemAddedInEntryMode){
      userStep =2;
    }
    this.props.addProviderEntryState({
      storeKey:'stepIndex',
      payload: userStep
    });
  },
  onAllClear(){
    const stepIndex = this.props.providerEntryState.get('stepIndex');
    if(stepIndex ===0){
      this.props.showHideSpinner({storeKey:'providerEntrySpinner',payload:false});
    }
    if(stepIndex ===1){
      this.props.showHideSpinner({storeKey:'foodItemEntrySpinner',payload:false});
    }
    this.props.addProviderEntryState({
      storeKey: "stepIndex",
      payload:stepIndex +1
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleNext(){
    if(this.props.providerEntryState.get('stepIndex')===0){
      this.refs.providerform.formSubmit();
    }
    if(this.props.providerEntryState.get('stepIndex')===1){
      this.refs.foodItemEntryForm.formSubmit();
    }
    if(this.props.providerEntryState.get('stepIndex')===2){
      let self = this;
      securedPostCall('/api/providers/publish')
        .then(function(res){
          if(res && res.data && res.data._id){
            self.props.dispatch(actions.publishUser());
            self.context.router.push('/providerProfile/'+res.data._id);
          }
        })
    }
  },
  handleCancel(){
    this.props.addProviderEntryState({
      storeKey:'stepIndex',
      payload: 2
    });
  },
  handlePrev(){
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
  },
  getStepContent(stepIndex,user) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <p>
              Please give a brief history about your cooking skills along with a picture showcasing you/your business
            </p>
            <ProviderEntryForm  providerEntryForm = {this.props.providerEntryForm}
                                spinner = {this.props.spinner}
                                addProviderInfo = {this.props.addProviderInfo}
                                addProviderErrorMsg = {this.props.addProviderErrorMsg}
                                onAllClear = {this.onAllClear}
                                fetchSecuredData = {this.props.fetchSecuredData}
                                showHideSpinner={this.props.showHideSpinner} 
                                params = {{id:user._id}}
                                mode = {"PROVIDER_ENTRY"}
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
            <FoodItemEntryForm  onAllClear = {this.onAllClear}
                                spinner = {this.props.spinner} 
                                foodItemEntryForm = {this.props.foodItemEntryForm}
                                addFoodItemInfo = {this.props.addFoodItemInfo}
                                fetchData = {this.props.fetchData}
                                showHideSpinner={this.props.showHideSpinner} 
                                removeFoodItemInfo = {this.props.removeFoodItemInfo}
                                params = {this.props.params}
                                mode = {"PROVIDER_ENTRY"} 
                                dispatch={this.props.dispatch}
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
                              mode = {"PROVIDER_ENTRY"} 
            />
          </div>
        );
      default:
        return 'Youre a long way from home!';
    }
  },
  renderContent() {
    const {stepIndex} = this.props.providerEntryState.toJS();
    const{providerEntrySpinner,foodItemEntrySpinner} = this.props.spinner.toJS();
    const showSpinner = (providerEntrySpinner || foodItemEntrySpinner)? true:false;
    const {user} = this.props.globalState.core.toJS();
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={contentStyle} >
        <div >{this.getStepContent(stepIndex,user)}</div>
        <div style={{display:'block', clear:'both', marginTop: 24, marginBottom: 12, textAlign:'center'}}>
          {
            (stepIndex === 1)?
              <div style={{display:'inline-block'}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                {
                  (user.foodItemAddedInEntryMode)?
                  <FlatButton
                    label="Cancel"
                    onTouchTap={this.handleCancel}
                    style={{marginRight: 12}}
                  />
                  :
                  undefined
                }
                
              </div>
              :
              undefined
          }

          <RaisedButton
            label={stepIndex === 2 ? 'Publish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
            disabled={showSpinner}
            disableTouchRipple={true}
          />
        </div>
      </div>
    );
  },
  render() { 
    const {stepIndex} = this.props.providerEntryState.toJS();
    return (
      <div className="pure-g" className = "pure-override-letter-spacing">
        <div className = "counter-fixed-menu">
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel iconContainerStyle ={{fill: 'rgb(242, 104, 0)'}}>Profile</StepLabel>
              </Step>
              <Step>
                <StepLabel>Food Item</StepLabel>
              </Step>
              <Step>
                <StepLabel>Preview</StepLabel>
              </Step>
            </Stepper>
            {this.renderContent()}
          </div> 
      </div>
    );
  }
})

Provider.propTypes= {
    globalState:React.PropTypes.object,
    providerEntryState: React.PropTypes.object,
    providerEntryForm: React.PropTypes.object,
    foodItemEntryForm: React.PropTypes.object,
    spinner: React.PropTypes.object,
    charsLeft:React.PropTypes.func,
    addProviderInfo:React.PropTypes.func,
    addProviderErrorMsg:React.PropTypes.func,
    addFoodItemInfo:React.PropTypes.func,
    removeFoodItemInfo:React.PropTypes.func,
    addProviderEntryState:React.PropTypes.func,
    fetchData:React.PropTypes.func,
    fetchSecuredData:React.PropTypes.func,
    provider:React.PropTypes.object,
    fetchMayBeSecuredData:React.PropTypes.func,
    prefilProviderEntryForm:React.PropTypes.func,
    securedPostCall:React.PropTypes.func,
    showHideSpinner:React.PropTypes.func,
    dispatch: React.PropTypes.func
  };
export default Provider;