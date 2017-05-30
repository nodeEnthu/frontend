import React from 'react'
import './providerProfileEntry.scss'
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm'
import * as actions from 'layouts/CoreLayout/coreReducer';
import Stepper from 'components/Stepper';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const ProviderProfileEntry = createReactClass ({
  componentDidMount() {
    
  },
  handleNext(){
    this.refs.providerform.formSubmit();
  },
  
  render() {
    const {user} = this.props.globalState.core.toJS();
    return (
          <div className="provider-profile-entry">
            <Stepper
              steps={[{label:'Profile'},{label:'Food'},{label:'Publish'}]}
              activeStep={1}
            >
            </Stepper>
            <p>
              Please give a brief history about your cooking skills along with a picture showcasing you/your business
            </p>
            <ProviderEntryForm  providerEntryForm = {this.props.providerEntryForm}
                                addProviderInfo = {this.props.addProviderInfo}
                                addProviderErrorMsg = {this.props.addProviderErrorMsg}
                                dispatch={this.props.dispatch}
                                params = {{id:this.props.params.id}}
                                mode = {"PROVIDER_ENTRY"}
                                fetchSecuredData={this.props.fetchSecuredData}
                                nextLabel={"NEXT: FOOD LISTINGS"}
                                linkToRedirectOnAllClear={"/provider/"+user._id+"/providerFoodEntry"}
            />
          </div>
          
        );
  }
})

ProviderProfileEntry.propTypes= {
    globalState:PropTypes.object,
    providerEntryForm: PropTypes.object,
    addProviderInfo:PropTypes.func,
    addProviderErrorMsg:PropTypes.func,
    dispatch: PropTypes.func,
    fetchSecuredData:PropTypes.func.isRequired
  };
export default ProviderProfileEntry;