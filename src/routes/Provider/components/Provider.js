import React from 'react'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import ImageUploader from '../../../components/ImageUploader/index'
import classes from './provider.scss'
import ProviderEntryForm from '../../../components/ProviderEntryForm/ProviderEntryForm'
import FoodItemEntryForm from '../../../components/FoodItemEntryForm/FoodItemEntryForm'

class Provider extends React.Component {
  state = this.props.providerEntryState.toJS();
  handleNext = () => {
    if(this.props.providerEntryState.get('stepIndex')===0){
      this.refs.providerform.formSubmit();
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <p>
              Please give a brief history about your cooking skills along with a picture showcasing you/your business.
            </p>
            <div className="is-center">
                <ImageUploader/>
            </div>
            <ProviderEntryForm {...this.props} ref="providerform"/>
          </div>
            
        );
      case 1:
        return (
          <div>
            <p>
              Enter the food item you wish to provide
            </p>
            <div className="is-center">
                <ImageUploader/>
            </div>
            <FoodItemEntryForm {...this.props} ref="foodItemEntryForm"/>
          </div>
        );
      case 2:
        return (
          <p>
            Please indicate the relavent dates and delivery/pick-up  options
          </p>
        );
      default:
        return 'Youre a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.props.providerEntryState.toJS();
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
        <div >{this.getStepContent(stepIndex)}</div>
        <div style={{display:'block', clear:'both', marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
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
    providerEntryForm: React.PropTypes.object.isRequired,
    providerEntryState: React.PropTypes.object.isRequired,
};
export default Provider;