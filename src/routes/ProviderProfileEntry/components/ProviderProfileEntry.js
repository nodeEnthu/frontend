import React from 'react'
import './providerProfileEntry.scss'
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm'
import * as actions from 'layouts/CoreLayout/coreReducer';
import Stepper from 'components/Stepper'
const ProviderProfileEntry = React.createClass ({
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
    globalState:React.PropTypes.object,
    providerEntryForm: React.PropTypes.object,
    addProviderInfo:React.PropTypes.func,
    addProviderErrorMsg:React.PropTypes.func,
    dispatch: React.PropTypes.func,
    fetchSecuredData:React.PropTypes.func.isRequired
  };
export default ProviderProfileEntry;