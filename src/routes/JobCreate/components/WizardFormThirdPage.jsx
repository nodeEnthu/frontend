import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import {RadioButton} from 'material-ui/RadioButton';
import {RadioButtonGroup} from 'redux-form-material-ui';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import createReactClass from 'create-react-class'
import moment from 'moment'

let WizardFormThirdPage =  createReactClass({
  getInitialState() {
    return{};
  },
  render(){
    const { handleSubmit, pristine, previousPage,submitting,start_date, end_date ,change } = this.props;
    return (
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <div>
          <legend style={{margin: "1em 0"}}>Select date(s):</legend>
            <DateRangePicker
              startDate={start_date} 
              endDate={end_date} 
              onDatesChange={({ startDate, endDate }) =>  {
                                                            change('start_date',startDate);
                                                            change('end_date', endDate);
                                                          }
                            } 
              focusedInput={this.state.focusedInput} 
              onFocusChange={focusedInput => this.setState({ focusedInput })} 
              numberOfMonths={1}
            />
        </div>
        <div style={{textAlign:'center', marginTop:'2em'}}>
          <button type="button" className="pure-button" style={{marginRight:'1em'}} onClick={previousPage}>
            Previous
          </button>
          <button type="submit" className="pure-button pure-button-primary" disabled={pristine || submitting}>
            Next
          </button>
        </div>
      </form>
    )
  }
})

// Decorate with redux-form
WizardFormThirdPage = reduxForm({
  form: 'wizard', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage)

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardFormThirdPage = connect(state => {
  // can select values individually
  const start_date = selector(state, 'start_date');
  const end_date = selector(state, 'end_date');
  // or together as a group
  return {
    start_date,
    end_date,
    state
  }
})(WizardFormThirdPage)

export default WizardFormThirdPage
