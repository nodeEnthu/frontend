import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import createReactClass from 'create-react-class'
import renderTextArea from './renderTextArea'
import PhoneVerification from 'components/PhoneVerification';

let WizardFormFirstPage =  createReactClass({
  getInitialState() {
    return{
      verified:false,
      phone:undefined,
      code:undefined
    };
  },
  componentDidMount() {
    // make the calls 1. to get all the invite list
    const {user}  = this.props.globalState.core.toJS();
    if(user.phone){
      this.setState({phone:user.phone, verified:true, providerId: user._id});
    }
  },
  onSuggestionSelected(event,{suggestion}){
    const {addressVar,place_idVar, change } = this.props;
    change('address', suggestion.address);
    change('place_id', suggestion.place_id);
  },
  changePhoneAttr(obj){
      this.setState({[obj.storeKey]:obj.payload});
      if(obj.storeKey === 'verified' && obj.payload === true && this.state.phone)
        this.props.updateUser('phone',this.state.phone);
      if(obj.storeKey === 'phone'){
        let {phone} = this.props.globalState.core.get('user').toJS();
        if(obj.payload === phone) this.setState({verified: true});
        else this.setState({verified: false});
      }
  },
  render(){
    const { handleSubmit, addressVar,place_idVar, change } = this.props
    let {phone,code,verified} = this.state;
    return (
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <legend style={{margin: "1em 0"}}>Address where food is required:</legend>
        <AsyncAutocomplete  name={'searchText'}
                            apiUrl = {'/api/locations/addressTypeAssist'}
                            userSearchText = {addressVar}
                            getSuggestionValue={(suggestion)=>suggestion.address}
                            onChange = {(event, value)=>{change('address', value.newValue); change('place_id', null)}}
                            onSuggestionSelected = {this.onSuggestionSelected}
        />
        {
          (addressVar && !place_idVar)?
          <div className="error">Please choose from one of the suggested addresses</div>
          :
          undefined
        }
        <div style={{width:'100%'}}>
          <Field
            name="addtnlAddressComments"
            type="textarea"
            component={renderTextArea}
            label="Landmarks / house no. that will help provider find you"
          />
        </div>
        <div style={{width:'100%'}}>
          <legend style={{margin: "1em 0"}}>Phone number(only for provider you hire):</legend>
          <PhoneVerification
            phone={phone}
            code={code}
            changePhoneAttr={this.changePhoneAttr}
            verified={verified}
            style={{marginTop:'0.5em'}}
          />
        </div>
        <div style={{textAlign:'center', marginTop:'2em'}}>
          <button type="submit" disabled = {!place_id} className="pure-button pure-button-primary is-center">
            Next
          </button>
        </div>
      </form>
  )}
})

// Decorate with redux-form
WizardFormFirstPage = reduxForm({
  form: 'wizard', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  initialValues: {
    partysize: '1',
    serviceType: 'delivery',
    address:'',
    place_id:'',
    lu:true,
  },
  validate
})(WizardFormFirstPage)

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardFormFirstPage = connect(state => {
  // can select values individually
  const addressVar = selector(state, 'address');
  const place_idVar = selector(state, 'place_id');
  // or together as a group
  return {
    addressVar,
    place_idVar
  }
})(WizardFormFirstPage)

export default WizardFormFirstPage