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

/**
 * A contrived example using a transition between steps
 */

class HorizontalTransition extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    let formValidity = true;
    if(this.state.stepIndex===0){
      //check the validity of the form
      var providerForm = document.getElementById('provider-form');
      formValidity = providerForm.checkValidity();
      if(!formValidity){
       
      } 
    }
    const {stepIndex} = this.state;
    if (!this.state.loading && formValidity) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <p>
              Please give a brief history about your cooking skills along with a picture showcasing you/your business.
              Personalized message and relavent picture goes a long way in attracting customers. 
            </p>
            <div className="is-center">
                <ImageUploader/>
                <ProviderEntryForm/>
            </div>
  
      
          </div>
            
        );
      case 1:
        return (
          <div>
            <p>
              Enter the food item you wish to provide
            </p>
            <p>Something something whatever cool</p>
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
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden', height:'800px'};

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
        <div style={{height:'auto'}}>{this.getStepContent(stepIndex)}</div>
        <div style={{display:'block', clear:'both', marginTop: 24, marginBottom: 12,height:'auto'}}>
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
    const {loading, stepIndex} = this.state;

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
                <StepLabel>Time and delivery options</StepLabel>
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

export default HorizontalTransition;