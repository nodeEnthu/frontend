import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import {RadioButton} from 'material-ui/RadioButton';
import {RadioButtonGroup} from 'redux-form-material-ui';

const renderError = ({ meta: { touched, error } }) =>
  touched && error
    ? <span>
        {error}
      </span>
    : false

let WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
     <div style={{width:'100%'}}>
         <legend style={{margin: "1em 0"}}>Number of people:</legend>
        <Field
          name="partysize"
          type="text"
          component={renderField}
          label="number of people"
        />
      </div>
      <div>
        <legend style={{margin: "1em 0"}}>Delivery type:</legend>
        <Field name="serviceType" component={RadioButtonGroup}>
          <RadioButton value="pickup" label="Pickup" />
          <RadioButton value="delivery" label="Delivery" />
          <RadioButton value="any" label="Pickup or delivery" />
        </Field>
      </div>
      <div style={{textAlign:'center', marginTop:'2em'}}>
        <button type="button" className="pure-button" style={{marginRight:'1em'}}onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="pure-button pure-button-primary">
          Next
        </button>
      </div>
    </form>
  )
}

WizardFormSecondPage = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage);

export default WizardFormSecondPage;
