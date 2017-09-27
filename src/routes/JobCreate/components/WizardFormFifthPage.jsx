import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import {RadioButton} from 'material-ui/RadioButton';
import {Checkbox, RadioButtonGroup} from 'redux-form-material-ui';

const renderError = ({ meta: { touched, error } }) =>
  touched && error
    ? <span>
        {error}
      </span>
    : false

const WizardFormFifthPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
      <div>
        <legend style={{margin: "1em 0"}}>Cuisine(s) interested in (optional):</legend>
          <Field name="ni" component={Checkbox} label="North-Indian" />
          <Field name="su" component={Checkbox} label="South-Indian" />
          <Field name="ch" component={Checkbox} label="Chinese" />
          <Field name="ve" component={Checkbox} label="Veg" />
          <Field name="nv" component={Checkbox} label="Non-veg" />
          <Field name="de" component={Checkbox} label="Desserts" />
      </div>
      <div style={{textAlign:'center', marginTop:'2em'}}>
        <button type="button" className="pure-button" style={{marginRight:'1em'}}onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="pure-button pure-button-primary">
          Submit
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFifthPage)