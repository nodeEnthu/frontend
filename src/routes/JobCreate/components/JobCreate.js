import React from 'react'
import WizardForm from './WizardForm'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import {normalizeDates} from 'routes/Search/constants/searchFilters'
const JobCreate = createReactClass({
  formSubmit(values){
    let self = this;
    // values.start_date  = normalizeDates(values.start_date);
    // values.end_date  = normalizeDates(values.end_date);
    securedPostCall('/api/job/create', values)
      .then(function(res){
        self.context.router.push('/job/'+res.data.result._id+'/summary');
      })
  },
  contextTypes: {
      router: PropTypes.object.isRequired
  },
  render(){
    return(
      <WizardForm onSubmit={this.formSubmit}/>
      )
  }
})

JobCreate.propTypes = {
}

export default JobCreate
