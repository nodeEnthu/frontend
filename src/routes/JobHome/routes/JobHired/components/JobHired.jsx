import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './jobHired.scss';
import {securedGetCall,securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import {fullWhite} from 'material-ui/styles/colors';
import ProviderSummaryCard from './../../../components/ProviderSummaryCard'

const JobHired = createReactClass({
	getInitialState() {
		return{
			hirees:[],
		};
	},
	contextTypes: {
        router: PropTypes.object.isRequired
    },
	componentDidMount() {
		const {jobDetails} = this.props;
		let self = this;
		securedGetCall('/api/job/get/hirees',{jobId:jobDetails._id})
	  		.then(function(res){
	        	self.setState({hirees: res.data});
	      	});		
	},
	resolveAddress(address){
		if (address) address = address.replace(/,[^,]+$/, "");
		return address || '';
	},
  	render(){
  		let self = this;
  		const {hirees} = this.state;
  		const {jobDetails} = this.props;
	    return (
	    <div className="job-hired">
	    	<div className="reco-wrapper">
				<h3>
					Providers hired:
				</h3>
			</div>
			{
				hirees.map(function(hire,index){
					return <Card key={index} >
						        <CardHeader
						          title={<Link to={`/providerProfile/${hire._id}`}>{hire.title}</Link>}
						          subtitle={self.resolveAddress(hire.fullAddress)}
						          avatar={hire.imgUrl}
						          style={{paddingBottom:0}}
						          titleStyle={{textDecoration: 'underline', textDecorationColor: '#FF6F00'}}
						          onClick={()=>self.context.router.push('/providerProfile/'+hire._id)}
						        >
						        </CardHeader>
						        <CardText style={{paddingTop:'0.5em', paddingBottom:'0'}}>
						        	<ProviderSummaryCard provider={hire}/>
						        </CardText>
						        <CardActions style={{textAlign:'right',marginBottom:'1em'}}>
				                	<FlatButton
			                		 	label="Hired"
			                		 	labelPosition="after"
			                		 	icon={<ActionThumbUp color={fullWhite} />}
								      	backgroundColor="#a4c639"
								      	hoverColor="#8AA62F"
								      	labelStyle={{color:"white"}}
								    /> 
							    </CardActions>
					      	</Card>
				})
			}
			
	    </div>)
  	}
})

JobHired.propTypes = {}
export default JobHired;