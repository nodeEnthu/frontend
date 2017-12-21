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
import async from 'async'
import {unionBy} from 'lodash'
import ActionStars from 'material-ui/svg-icons/action/stars'
import Alert from 'react-s-alert';
const JobApply = createReactClass({
	getInitialState() {
		return{
			providerId:undefined,
			jobs:[],
			invitedJobsExpanded0:true,
			verified:false,
			phone:undefined,
			code:undefined,
			loadingResults:true
		};
	},
	contextTypes: {
      router: PropTypes.object.isRequired 
    },
	componentDidMount() {
		const {user}  = this.props.globalState.core.toJS();

		if(user.userType ==='consumer') this.context.router.push('/jobs/list');

		else if(user.userType ==='provider' && !user.published) {
			this.context.router.push(`/provider/${user._id}/providerProfileEntry`);
			Alert.warning('Please enroll as a chef and then click on "Jobs Board" in left nav to see jobs close to you', {
	            position: 'bottom',
	        });
		}
		else{
			if(user.phone){
				this.setState({phone:user.phone, verified:true, providerId: user._id, loadingResults:true});
			}else{
				this.setState({providerId: user._id});
			}
			this.refreshPage();
		}
	},
	refreshPage(){
		let self = this;
		async.parallel([function(cb){
			securedGetCall('/api/providers/get/job/invites')
			.then(function(res){
				cb(null,res.data);
			})
		},
		function(cb){
			securedGetCall('/api/job/get/closeby')
			.then(function(res){
				cb(null,res.data.results);
			})
		}],function(err,resultArr){
			// create a unique list
			let result = _.unionBy(resultArr[1], resultArr[0], "_id");
			self.setState({loadingResults:false});
			self.setState({jobs:result});
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
  		let {jobs,verified,phone,code,providerId,loadingResults} = this.state;
  		let {user}  = this.props.globalState.core.toJS();
  		let self = this;
  		if (loadingResults)
  			return (
  				<div className="is-center">
  					<img src= "/general/loading.svg"/>
  				</div>)
	    return (
	    <div className="job-apply">
	    	<div className="apply-wrapper">
	    		<h2>
	    			Your job board
	    		</h2>
	    		{	
	    			(jobs.length >0)?
	    			jobs.map(function(job,index){
	    				return (<Card key={index+'job'}
	    							expanded={self.state['invitedJobsExpanded'+index]}
	    							onExpandChange={() =>self.handleExpandChange('invitedJobsExpanded'+index)}
	    							style={{marginTop:'0.5em'}}
	    						>
					               <CardHeader
							          	title={job.title}
							          	subtitle={'at '+self.resolveAddress(job.address)}
							          	avatar={(job.invitees.indexOf(providerId)>-1)? <ActionStars style={{color:'red'}}/>:undefined }
							           	actAsExpander={true}
          								showExpandableButton={true}
							        >
							        </CardHeader>
						       {
			                		(job && job.applicants && job.applicants.indexOf(providerId) > -1 && job.hirees.indexOf(providerId) === -1)?
			                		
			                		<div style={{textAlign:'right', margin:'0 1em 1em 0'}}>
			                			<CardActions>
									      <FlatButton
				                		 	label="Applied"
				                		 	labelPosition="after"
									      	backgroundColor="#FDD835"
									      	hoverColor="#FBC02D"
									      	labelStyle={{color:"white"}}

									    />
									    </CardActions>
									</div>
									: undefined
				            	}
				            	{
			                		(job && job.applicants && job.hirees.indexOf(providerId)> -1)?
			                		<div style={{textAlign:'right', margin:'0 1em 1em 0'}}>
			                			<CardActions>
									      <FlatButton
				                		 	label="Hired"
				                		 	labelPosition="after"
				                		 	icon={<ActionThumbUp color={fullWhite} />}
									      	backgroundColor="#a4c639"
								      		hoverColor="#8AA62F"
									      	labelStyle={{color:"white"}}
									    />
									    </CardActions>
									</div>
									: 
									undefined
				            	}
							        <CardText
							        	expandable={true}
							        >
					                	<JobSummary jobDetails={job}/>
					                {
			                			(job && job.applicants && job.applicants.indexOf(providerId)=== -1 && job.hirees.indexOf(providerId) === -1)?
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
							                				placeholder="Explain pricing, various food options available on different days and pick-up/delivery timings" 
							                				value={self.state['coverLetter'+index] || ''}
							                				onChange={(event) =>self.coverLetterChange('coverLetter'+index, event.target.value)}
							                	>
							                 	</textarea>
							                </form>
							               	{
						                      (!verified)?
						                      <div className="error">Please provide one time verified contact number for provider</div>:undefined
						                    }
							                <CardActions style={{textAlign:'right'}}>
							                	<RaisedButton 
							                   		primary={true} 
							                   		disabled={!verified || !self.state['coverLetter'+index]} 
							                   		label="Apply" onClick={() =>self.apply(job._id, index)}
							                   		disableTouchRipple = {true}
							                   	/>
							                </CardActions>
							            </CardText>
							            :
							            undefined
					                }	
								    </CardText>
					            </Card>)
	    					})
							:
							<div>
								<div className="is-center">
									<img src="/general/noresult.png"/>
								</div>
								<p>
									Sorry you have no results!
								</p>
								<p>
									Our research shows provider profiles:
								</p>
								<div className="no-order-list">
								    <p>1. With verified phone number</p>
								    <p>2. With pictures that showcase their business</p>
								    <p>3. With detailed description of food items</p>
								    <p>4. That get shared on social media</p>
								    <p>5. Which take fast action on their received orders</p>
								</div>
							    <p> receive most orders</p>
							    <div className="is-center">
								   	<RaisedButton
			                		 	label="View your profile"
			                		 	primary={true}
			                		 	onClick={() =>self.context.router.push('/providerProfile/'+user._id)}
							            disableTouchRipple = {true}
								    />
								</div>
							</div>
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