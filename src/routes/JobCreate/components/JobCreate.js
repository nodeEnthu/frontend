import React from 'react'
import WizardForm from './WizardForm'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import {normalizeDates} from 'routes/Search/constants/searchFilters'
import normalizeJobDetails from 'utils/normalizeJobDetails'
const JobCreate = createReactClass({
  formSubmit(values){
    let self = this;
    // values.start_date  = normalizeDates(values.start_date);
    // values.end_date  = normalizeDates(values.end_date);
    securedPostCall('/api/job/create', normalizeJobDetails(values))
      .then(function(res){
        self.context.router.push('/job/'+res.data._id+'/invite');
      })
  },
  contextTypes: {
      router: PropTypes.object.isRequired
  },
  render(){
    return(
      <WizardForm onSubmit={this.formSubmit} updateUser = {this.props.updateUser} globalState = {this.props.globalState}/>
      )
  }
})

JobCreate.propTypes = {
  updateUser:PropTypes.func,
  globalState: PropTypes.object
}

export default JobCreate
