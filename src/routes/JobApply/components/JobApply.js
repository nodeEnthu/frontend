import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './jobApply.scss';
import JobSummary from 'components/JobSummary'
import {securedGetCall, securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import PhoneVerification from 'components/PhoneVerification';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import {fullWhite} from 'material-ui/styles/colors';

const JobApply = createReactClass({
	getInitialState() {
		return{
			providerId:undefined,
			invitedJobs:[],
			invitedJobsExpanded0:true,
			verified:false,
			phone:undefined,
			code:undefined
		};
	},
	componentDidMount() {
		// make the calls 1. to get all the invite list
		const {user}  = this.props.globalState.core.toJS();
		if(user.phone){
			this.setState({phone:user.phone, verified:true, providerId: user._id});
		}
		this.refreshPage();
	},
	refreshPage(){
		let self = this;
		securedGetCall('/api/providers/get/job/invites')
			.then(function(res){
				self.setState({invitedJobs:res.data});
			})
	},
	resolveAddress(address){
		if (address) address = address.replace(/,[^,]+$/, "");
		return address || '';
	},
	handleExpandChange(stateKey){
		this.setState({[stateKey]:!this.state[stateKey]})
	},
	changePhoneAttr(obj){
	    this.setState({[obj.storeKey]:obj.payload});
	    if(obj.storeKey === 'verified' && obj.payload === true && this.state.phone)
	      this.props.updateUser('phone',this.state.phone);
	    if(obj.storeKey === 'phone'){
	      let {phone} = this.props.globalState.core.get('user').toJS();
	      if(obj.payload === phone) this.setState({verified: true});
	      else this.setState({verified: false});
	    }
	},
	apply(jobId,index){
		const {user}  = this.props.globalState.core.toJS();
		let self = this;
		securedPostCall('/api/job/apply',{jobId:jobId, _id:user._id, coverLetter:this.state['coverLetter'+index]})
		.then(function(res){
			self.refreshPage();
		})
	},
	coverLetterChange(stateKey,value){
		this.setState({[stateKey]:value});
	},
  	render(){
  		const {invitedJobs,verified,phone,code,providerId} = this.state;
  		let self = this;
	    return (
	    <div className="job-apply">
	    	<div className="apply-wrapper">
	    		<h2>
	    			Your job invitations:
	    		</h2>
	    		{
	    			invitedJobs.map(function(job,index){
	    				return (<Card key={index+'job'}
	    							expanded={self.state['invitedJobsExpanded'+index]}
	    							onExpandChange={()=>self.handleExpandChange('invitedJobsExpanded'+index)}
	    							style={{marginTop:'0.5em'}}
	    						>
					               <CardHeader
							          	title={job.title}
							          	subtitle={'at '+self.resolveAddress(job.address)}
							          	avatar="http://lorempixel.com/400/200/sports/"
							           	actAsExpander={true}
          								showExpandableButton={true}
							        >
							        </CardHeader>
						       {
			                		(job && job.applicants &&job.applicants.indexOf(providerId)=== -1)?
			                		undefined
			                		:
			                		<div style={{textAlign:'right', margin:'0 1em 1em 0'}}>
			                			<CardActions>
									      <FlatButton
				                		 	label="Applied"
				                		 	labelPosition="after"
				                		 	icon={<ActionThumbUp color={fullWhite} />}
									      	backgroundColor="#a4c639"
									      	hoverColor="#8AA62F"
									      	labelStyle={{color:"white"}}

									    />
									    </CardActions>
									</div>
				            	}
							        <CardText
							        	expandable={true}
							        >
					                	<JobSummary jobDetails={job}/>
					                {
			                			(job && job.applicants &&job.applicants.indexOf(providerId)=== -1)?
				                		<CardText>
					                		<div style={{fontSize:'115%', fontWeight:400, marginBottom:'0.25em'}}>
					                			Apply for this job:
					                		</div>
					                		<Divider />
					                		<form className="pure-form">
							                  	<div style={{margin:'0.5em 0'}}>Your verified contact number for customer:</div>
							                  	<PhoneVerification
							                      phone={phone}
							                      code={code}
							                      changePhoneAttr={self.changePhoneAttr}
							                      verified={verified}
							                      style={{marginTop:'0.5em'}}
							                  	/>
							                    
							              	</form>
							                <form className="pure-form" style={{marginTop:'0.5em'}}>
							                	<textarea 	style={{minHeight:'5em'}}className="pure-u-1" 
							                				placeholder="Write something to get this job" 
							                				value={self.state['coverLetter'+index] || ''}
							                				onChange={(event)=>self.coverLetterChange('coverLetter'+index, event.target.value)}
							                	>
							                 	</textarea>
							                </form>
							               	{
						                      (!verified)?
						                      <div className="error">Please provide one time verified contact number for provider</div>:undefined
						                    }
							                <CardActions style={{textAlign:'right'}}>
							                   <RaisedButton primary={true} disabled={!verified || !self.state['coverLetter'+index]} label="Apply" onClick={()=>self.apply(job._id, index)}/>
							                </CardActions>
							            </CardText>
							            :
							            undefined
					                }	
								    </CardText>
					            </Card>)
	    			})
	    		}
		    	
	        </div>
	    </div>)
  }
})

JobApply.propTypes = {
	globalState: PropTypes.object.isRequired,
	updateUser:PropTypes.func
}
export default JobApply;