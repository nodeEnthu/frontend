import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import {RadioButton} from 'material-ui/RadioButton';
import {Checkbox, RadioButtonGroup} from 'redux-form-material-ui';
import {JOB_CUISINES} from 'routes/Search/constants/searchFilters'
import renderTextArea from './renderTextArea'

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
        <legend style={{margin: "1em 0"}}>Cuisine(s) interested in:</legend>
          {
            JOB_CUISINES.map(function(cuisine,index){
              return <Field key={cuisine.value} name={cuisine.value} component={Checkbox} label={cuisine.label} />
            })
          }
      </div>
      
      <div style={{width:'100%'}}>
        <legend style={{margin: "1em 0"}}>Budget per meal:</legend>
        <Field
          name="budget"
          type="text"
          component={renderField}
          label="budget per meal in &#8377; "
        />
      </div>
      <div style={{width:'100%'}}>
        <Field
          name="addtnlCustomerComments"
          type="textarea"
          component={renderTextArea}
          label="Additional comments for providers"
        />
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