import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './jobInvite.scss';
import {securedGetCall,securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import {fullWhite} from 'material-ui/styles/colors';

const JobInvite = createReactClass({
	getInitialState() {
		return{
			providers:[],
		};
	},
	contextTypes: {
        router: PropTypes.object.isRequired
    },
	componentDidMount() {
		const {jobDetails} = this.props;
		let self = this;
		securedGetCall('/api/job/invite/providers',{latitude:jobDetails.loc.coordinates[1], longitude:jobDetails.loc.coordinates[0]})
      		.then(function(res){
	        	self.setState({providers: res.data.results});
	      	});	
	},
	resolveAddress(address){
		if (address) address = address.replace(/,[^,]+$/, "");
		return address || '';
	},
	sendInvite(providerId){
		const {jobDetails, refreshPage} = this.props;
		securedPostCall('/api/job/send/invite',{jobId: jobDetails._id, providerId:providerId})
			.then(function(res){
				if(res.data.status === 'ok'){
					// provider was invited
					refreshPage();
				}
			})
	},
  	render(){
  		let self = this;
  		const {disabledInvites, jobDetails} = this.props;
  		const {providers} = this.state;
	    return (
	    <div className="job-invite">
	    	<div className="reco-wrapper">
				<h3>
					Providers close to you:
				</h3>
			</div>
			{
				providers.map(function(provider,index){
					return <Card key={provider._id} >
						        <CardHeader
						          title={<Link to={`/providerProfile/${provider._id}`}>{provider.title}</Link>}
						          subtitle={self.resolveAddress(provider.shortAddress) +' '+ provider.distance.toFixed(2) +' kms away'}
						          avatar={provider.imgUrl}
						          style={{paddingBottom:0}}
						          onClick={()=>self.context.router.push('/providerProfile/'+provider._id)}
						        >
						        </CardHeader>
						        <CardText style={{paddingTop:'0.5em', paddingBottom:'0'}}>
						          {provider.description}
						        </CardText>
						        <CardActions style={{textAlign:'right', margin:'0 1em 1em 0'}}>
						        	{
					                	(jobDetails.applicants.indexOf(provider._id)=== -1)?
					                	<RaisedButton style={{background:'#FFC107', color:'white'}} 
						      				disabled={(disabledInvites.indexOf(provider._id) > -1)}
						      				label={(disabledInvites.indexOf(provider._id) > -1)? 'Invited': 'send Invitation'} 
						      				disabledBackgroundColor="green"
						      				disabledLabelColor="white"
						      				onClick={()=>self.sendInvite(provider._id)}
							      		/>
					                	:
				                		
									    <FlatButton
				                		 	label="Applied"
				                		 	labelPosition="after"
									      	backgroundColor="#a4c639"
									      	hoverColor="#8AA62F"
									      	labelStyle={{color:"white"}}
									    />   
						            }
							    </CardActions>
					      	</Card>
				})
			}
			
	    </div>)
  	}
})

JobInvite.propTypes = {}
export default JobInvite;