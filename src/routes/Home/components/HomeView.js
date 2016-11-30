import React from 'react'
import { IndexLink, Link } from 'react-router'
import FileIcons from '../assets/file-icons.png'
import Autosuggest from 'react-autosuggest'
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import store from 'store/createStore'
import IconButton from 'material-ui/IconButton'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import Spinner from 'react-spinkit'
import './HomeView.scss'
import { getCall,securedGetCall } from 'utils/httpUtils/apiCallWrapper';
const HomeView = React.createClass({
    getInitialState() {
        return {
            fetchingAddresses: false,
            showBackDrop:false
        };
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {

    },
    onSuggestionSelected(event,{suggestion}){
    	this.props.userAddressSearchChange(suggestion.address);
        this.props.userAddressUpdatePlaceId(suggestion.place_id);
    },
    goToPage(page) {
    	let self = this;
    	this.state.showBackDrop = true;
        if (page === 'search') {
        	if(this.props.globalState.core.get('userLoggedIn')){
        		const {searchText,place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
        		//register this at a new location if possible as the user needs to be logged in for this
           		// register the address as most recently used
           		securedGetCall('api/locations/registerMostRecentSearchLocation',{address:searchText,place_id:place_id})
            		.then(function(result){
            			self.state.showBackDrop = false;
            			self.context.router.push(page);
            		}); 
        	} else{
        		// user is not logged in ... add it to cookie so that it is saved in the session and we dont make another call
            	this.context.router.push(page);
        	}
        } else{
        	this.context.router.push(page);
        }
        
    },
    getLocationCordinates() {
        let self = this;
        this.setState({
            fetchingAddresses: true
        })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    const { latitude, longitude } = pos.coords;
                    getCall('api/locations/address', { latitude: latitude, longitude: longitude })
                        .then(function(response) {
                            self.props.userAddressSearchChange(response.data.address);
                            self.props.userAddressUpdatePlaceId(response.data.place_id);

                            self.setState({
                                fetchingAddresses: false
                            })
                        })
                },
                function(err) {
                    self.setState({
                        fetchingAddresses: true
                    })
                });
        } else {
            // show some error message
        }
    },
    render() {
        return (
            <div>
				<div className="splash-container pure-override-letter-spacing">
					<div className="banner-wrapper">
						<div className="pure-g">
							<div className = "pure-u-1 pure-u-md-1-2">
							    <div className="splash">
							        <h1 className="splash-head">
							        	Please enter address to find food close to you.
							        </h1>
							        <AsyncAutocomplete
							        	name={"home_view"} 
							        	userSearchText = {this.props.globalState.core.get('userAddressSearch').get('searchText')}
							        	apiUrl = {'/api/locations/addressTypeAssist'}
							        	getSuggestionValue={(suggestion)=>suggestion.address}
							        	onChange = {(event, value)=>this.props.userAddressSearchChange(value.newValue)}
							        	onSuggestionSelected = {this.onSuggestionSelected}
							        />
							        <IconButton
							        	style = {{
							        			padding:'0px',
							        			height:'0px',
							        			width:'0px',
							        			top:'6px',
							        			display:'inline-block',
							        			visibility:(this.state.fetchingAddresses)? 'hidden':'initial'							        		
							        		}}
							        	onClick = {this.getLocationCordinates}
							        >
							        	<CommunicationLocationOn/>
							        </IconButton>
							        <Spinner spinnerName='circle' 
							        	style = {{	display:'inline-block',
							        				visibility:(this.state.fetchingAddresses)?'initial':'hidden',
							        				top:'5px'
							        			}}
							        />
							        <p className="is-center">
							        	<button className="pure-button pure-button-primary"
							        		onClick={()=>this.goToPage('search')}>
							        		Get Started
							        	</button>
							        </p>
							    </div>
						    </div>
						    <div className = "pure-u-1 pure-u-md-1-2">
							   <div className="splash">
							        <div className="splash-head">
							        	Advertise your food right away in 3 easy steps
							        </div>
							        <p className="is-center">
							        	<button className="pure-button pure-button-primary"
							        		onClick={()=>this.goToPage('provider')}>
							        		Get Started
							        	</button>
							        </p>
							    </div>
						    </div>
						</div>
					</div>
				</div>
			</div>
        )
    }
})

HomeView.propTypes = {
    globalState: React.PropTypes.object.isRequired,
    userAddressSearchChange: React.PropTypes.func.isRequired,
    userAddressUpdatePlaceId: React.PropTypes.func.isRequired,
}


export default HomeView
