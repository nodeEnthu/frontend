import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import {RadioButton} from 'material-ui/RadioButton';
import {Checkbox, RadioButtonGroup} from 'redux-form-material-ui';
import {WEEK_DAYS_JOB, MEALS} from 'routes/Search/constants/searchFilters';
import createReactClass from 'create-react-class'

const renderError = ({ meta: { touched, error } }) =>
  touched && error
    ? <span>
        {error}
      </span>
    : false

let WizardFormFourthPage = createReactClass({
  getInitialState() {
    return{}
  },
  render(){
     const { handleSubmit, previousPage, how_frequent } = this.props;
     return (
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        {
          (how_frequent === 'weekly')?
          <div>
            <legend style={{margin: "1em 0"}}>Day(s) when you need service</legend>
         {
            WEEK_DAYS_JOB.map(function(weekday,index){
                return <div key={index} className="pure-u-1-3 pure-u-md-1-6" style={{paddingBottom : '0.25em'}}>
                        <div className="parent-box">
                                <div className="child-box-1">
                                    {weekday.label}
                                </div>
                                <div className="child-box-2">
                                    <Field name={weekday.value} component={Checkbox}/>
                                </div>
                            </div>
                        </div>
            })
          }
          </div>
          : undefined
        }
        <legend style={{margin: "1em 0"}}>Select meal(s) for each day</legend>
        <div>
          {
            MEALS.map(function(meal,index){
                return <div key={index} className="pure-u-1-3 pure-u-md-1-6" style={{paddingBottom : '0.25em'}}>
                        <div className="parent-box">
                                <div className="child-box-1">
                                    {meal.label}
                                </div>
                                <div className="child-box-2">
                                    <Field name={meal.value} component={Checkbox}/>
                                </div>
                            </div>
                        </div>
            })
          }
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
})

// Decorate with redux-form
WizardFormFourthPage = reduxForm({
  form: 'wizard', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFourthPage)

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardFormFourthPage = connect(state => {
  // can select values individually
  const how_frequent = selector(state, 'frequency');
  // or together as a group
  return {
    how_frequent
  }
})(WizardFormFourthPage)
export default WizardFormFourthPage