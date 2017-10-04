import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './jobApply.scss';
import JobSummary from 'components/JobSummary'

const JobApply = createReactClass({
	getInitialState() {
		return{};
	},
	componentDidMount() {
		console.log("coming here");	
	},
  	render(){
	    return (
	    <div className="job-apply">
	    	<JobSummary/>
	    	<div className="apply-wrapper">
		    	<Card>
	                <CardHeader
	                  title="Apply"
	                />
	                <CardText>
	                  <form className="pure-form">
	                  	<textarea style={{minHeight:'3em'}}className="pure-u-1" placeholder="Write something to get this job">
	                  	</textarea>
	                  </form>
	                </CardText>
	                <CardActions style={{textAlign:'right'}}>
	                   <FlatButton primary={true} label="Apply" />
	                </CardActions>
	            </Card>
	        </div>
	    </div>)
  }
})

JobApply.propTypes = {}
export default JobApply;