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
    const { handleSubmit, pristine, previousPage, how_frequent,submitting,start_date, end_date,date,change } = this.props;
    console.log(how_frequent);
    return (
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <div>
          <legend style={{margin: "1em 0"}}>How often do you want it:</legend>
          <Field name="frequency" component={RadioButtonGroup}>
            <RadioButton value="once" label="One time" />
            <RadioButton value="weekly" label="Weekly tiffin type service" />
          </Field>
        </div>
        <div>
          <legend style={{margin: "1em 0"}}>Select date(s):</legend>
          {
            (how_frequent === "weekly")?
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
            :
            <SingleDatePicker
              date={date} 
              onDateChange={date => change('date', date)} 
              focused={this.state.focused} 
              onFocusChange={({ focused }) => this.setState({ focused })}
              numberOfMonths={1}
            />
          }
         
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
  validate,
})(WizardFormThirdPage)

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardFormThirdPage = connect(state => {
  // can select values individually
  const how_frequent = selector(state, 'frequency');
  const start_date = selector(state, 'start_date');
  const end_date = selector(state, 'end_date');
  const date = selector(state, 'date');
  // or together as a group
  return {
    how_frequent,
    start_date,
    end_date,
    date
  }
})(WizardFormThirdPage)

export default WizardFormThirdPage
