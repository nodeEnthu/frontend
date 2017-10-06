import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './jobHome.scss';
import { Link } from 'react-router';
import {securedGetCall} from 'utils/httpUtils/apiCallWrapper';


const JobHome = createReactClass({
	getInitialState() {
		return{
			activeLink:'invite',
			jobDetails:undefined,
			disabledInvites:[]
		};
	},
	componentDidMount() {
		let self = this;
		securedGetCall('/api/job/'+this.props.params.id)
      		.then(function(res){
	        	self.setState({jobDetails: res.data.job, disabledInvites : res.data.job.invitees});
	      	});	
	},
	changeActiveLink(link){
		this.setState({activeLink:link});
	},
	refreshPage(){
		let self = this;
		securedGetCall('/api/job/'+this.props.params.id)
      		.then(function(res){
	        	self.setState({jobDetails: res.data.job, disabledInvites:res.data.job.invitees});
	      	});	
	},
  	render(){
  		const {activeLink, jobDetails,disabledInvites} = this.state;
  		const jobId = this.props.params.id;
  		let self = this;
	    return (
	    <div className="job-home">
	    	<div className="heading-title">
	    		<h1>
	    			Need organic home made food
	    		</h1>
	    	</div>
			<div className='breadcrumbs'>
			  <div className='inner'>
			    <ul className='cf'>
			      <li>
			        <Link to={`/job/${jobId}/summary`} className={(activeLink === 'summary')? 'active' : undefined} onClick = {()=>this.changeActiveLink('summary')}>job</Link>
			      </li>
			      <li>
			          <Link to={`/job/${jobId}/invite`} className={(activeLink === 'invite')? 'active' : undefined} onClick = {()=>this.changeActiveLink('invite')}>invite</Link>
			      </li>
			      <li>
			        <Link to={`/job/${jobId}/proposals`} className={(activeLink === 'proposals')? 'active' : undefined} onClick = {()=>this.changeActiveLink('proposals')}>proposals</Link>
			      </li>
			      <li>
			        <Link to={`/job/${jobId}/hire`} className={(activeLink === 'hire')? 'active' : undefined} onClick = {()=>this.changeActiveLink('hire')}>hire</Link>
			      </li>
			    </ul>
			  </div>
			</div>
			{
				(jobDetails)?
					React.cloneElement(this.props.children, { jobDetails: jobDetails, refreshPage:self.refreshPage, disabledInvites: disabledInvites })
					:
					undefined
			}
			
	    </div>)
  }
})

JobHome.propTypes = {}
export default JobHome;