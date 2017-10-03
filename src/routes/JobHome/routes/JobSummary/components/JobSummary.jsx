import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './jobSummary.scss';
import JobSummaryComponent from 'components/JobSummary'
const JobSummary = createReactClass({
  	render(){
	    return (
	    <div className="job-home">
	    	<JobSummaryComponent/>
	    </div>)
  }
})

JobSummary.propTypes = {}
export default JobSummary;