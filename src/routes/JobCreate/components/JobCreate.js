import React from 'react'
import WizardForm from './WizardForm'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const JobCreate = createReactClass({
  formSubmit(values){
    console.log(values);
  },
  render(){
    return(
      <WizardForm onSubmit={this.formSubmit}/>
      )
  }
})

JobCreate.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default JobCreate
