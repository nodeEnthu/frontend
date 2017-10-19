import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './jobProposals.scss';
import {securedGetCall,securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import {fullWhite} from 'material-ui/styles/colors';
import ProviderSummaryCard from './../../../components/ProviderSummaryCard'

const JobProposals = createReactClass({
	getInitialState() {
		return{
			applications:[],
		};
	},
	contextTypes: {
        router: PropTypes.object.isRequired
    },
	componentDidMount() {
		const {jobDetails} = this.props;
		let self = this;
		securedGetCall('/api/job/get/applicants',{jobId:jobDetails._id})
	  		.then(function(res){
	        	self.setState({applications: res.data});
	      	});		
	},
	resolveAddress(address){
		if (address) address = address.replace(/,[^,]+$/, "");
		return address || '';
	},
	sendHire(providerId){
		const {jobDetails, refreshPage} = this.props;
		securedPostCall('/api/job/send/hire',{jobId: jobDetails._id, providerId:providerId})
			.then(function(res){
				if(res.data.status === 'ok'){
					// provider was invited
					refreshPage();
				}
			})
	},
  	render(){
  		let self = this;
  		const {applications} = this.state;
  		const {jobDetails} = this.props;
	    return (
	    <div className="job-invite">
	    	<div className="reco-wrapper">
				<h3>
					Providers who applied for this job:
				</h3>
			</div>
			{
				applications.map(function(application,index){
					return <Card key={index} >
						        <CardHeader
						          title={<Link to={`/providerProfile/${application._creator._id}`}>{application._creator.title}</Link>}
						          subtitle={self.resolveAddress(application._creator.fullAddress)}
						          titleStyle={{textDecoration: 'underline', textDecorationColor: '#FF6F00'}}
						          avatar={application._creator.imgUrl}
						          style={{paddingBottom:0}}
						          onClick={()=>self.context.router.push('/providerProfile/'+application._creator._id)}
						        >
						        </CardHeader>
						        <CardText style={{paddingTop:'0.5em', paddingBottom:'0'}}>
						        	<ProviderSummaryCard provider={application._creator}/>
						        </CardText>
						        <CardText style={{paddingTop:'0.5em', paddingBottom:'0'}}>
						          {application.coverLetter}
						        </CardText>
						        <CardActions style={{textAlign:'right', marginBottom:'1em'}}>
						        	{
					                	(jobDetails.hirees.indexOf(application._creator._id) >= 0)?
					                	<FlatButton
				                		 	label="Hired"
				                		 	labelPosition="after"
				                		 	icon={<ActionThumbUp color={fullWhite} />}
									      	backgroundColor="#a4c639"
									      	hoverColor="#8AA62F"
									      	labelStyle={{color:"white"}}
									    /> 
					                	:
									    <RaisedButton 
					                		label = "Hire me"
						      				onClick={()=>self.sendHire(application._creator._id)}
							                disableTouchRipple = {true}
							      		/>   
						            }
				                	
							    </CardActions>
					      	</Card>
				})
			}
			
	    </div>)
  	}
})

JobProposals.propTypes = {}
export default JobProposals;