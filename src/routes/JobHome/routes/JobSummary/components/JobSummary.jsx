import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './jobSummary.scss';
import JobSummaryComponent from 'components/JobSummary'
import {securedGetCall} from 'utils/httpUtils/apiCallWrapper';
const JobSummary = createReactClass({
	getInitialState() {
		return{
			
		}	
	},
	componentDidMount() {
		
	},
  	render(){
  		const {jobDetails} = this.props; 
	    return (
	    <div className="job-home">
	    	{
	    		(jobDetails)?
	    		<JobSummaryComponent jobDetails={jobDetails}/>
	    		:
	    		undefined
	    	}
	    	
	    </div>)
  }
})

JobSummary.propTypes = {}
export default JobSummary;