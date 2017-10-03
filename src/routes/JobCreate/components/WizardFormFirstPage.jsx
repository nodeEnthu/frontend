import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import createReactClass from 'create-react-class'
import renderTextArea from './renderTextArea'
let WizardFormFirstPage =  createReactClass({
  onSuggestionSelected(event,{suggestion}){
    const {addressVar,place_idVar, change } = this.props;
    change('address', suggestion.address);
    change('place_id', suggestion.place_id);
  },
  render(){
    const { handleSubmit, addressVar,place_idVar, change } = this.props
    return (
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <legend style={{margin: "1em 0"}}>Please provide the address where food is required:</legend>
        <AsyncAutocomplete  name={'searchText'}
                            apiUrl = {'/api/locations/addressTypeAssist'}
                            userSearchText = {addressVar}
                            getSuggestionValue={(suggestion)=>suggestion.address}
                            onChange = {(event, value)=>{change('address', value.newValue); change('place_id', null)}}
                            onSuggestionSelected = {this.onSuggestionSelected}
        />
        <div style={{width:'100%'}}>
          <Field
            name="addtnlAddressComments"
            type="textarea"
            component={renderTextArea}
            label="Landmarks / home no. that will help provider find you"
          />
        </div>
        <div style={{textAlign:'center', marginTop:'2em'}}>
          <button type="submit" className="pure-button pure-button-primary is-center">
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
    serviceType: 'any',
    frequency: 'weekly',
    address:'',
    place_id:'',
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