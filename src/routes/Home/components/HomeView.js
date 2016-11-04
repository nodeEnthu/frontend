import React from 'react'
import { IndexLink, Link } from 'react-router'
import FileIcons from '../assets/file-icons.png'
import Autosuggest from 'react-autosuggest'
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import store from 'store/createStore'
import IconButton from 'material-ui/IconButton'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import Spinner from 'react-spinkit'
import classes from './HomeView.scss'
import classNames from 'classnames';
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
                        	self.props.userAddressUpdateDetect(true);
                            self.props.userAddressSearchChange(response.data.address);
                            self.props.userAddressUpdatePlaceId(response.data.place_id);

                            self.setState({
                                fetchingAddresses: false
                            })
                        })
                },
                function(err) {
                    this.setState({
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
				<div className={classNames(classes["splash-container"],classes["pure-override-letter-spacing"])}>
					<div className={classes["banner-wrapper"]}>
						<div className="pure-g">
							<div className = "pure-u-1 pure-u-md-1-2">
							    <div className={classes["splash"]}>
							        <h1 className={classes["splash-head"]}>
							        	Please enter address to find food close to you.
							        </h1>
							        <AsyncAutocomplete settings={{
							        	userSearchText : this.props.globalState.core.get('userAddressSearch'),
							        	apiUrl:'/api/locations/addressTypeAssist',
							        	action:this.props.userAddressSearchChange,
							        	setPlaceId:this.props.userAddressUpdatePlaceId,
							        	detectChange:this.props.userAddressUpdateDetect,
							        	globalState:this.props.globalState,
							        	onSuggestionSelected:()=>this.goToPage('search')
							        }}/>
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
							        <p className={classes["is-center"]}>
							        	<button className="pure-button pure-button-primary"
							        		onClick={()=>this.goToPage('search')}>
							        		Get Started
							        	</button>
							        </p>
							    </div>
						    </div>
						    <div className = "pure-u-1 pure-u-md-1-2">
							   <div className={classes["splash"]}>
							        <div className={classes["splash-head"]}>
							        	Advertise your food right away in 3 easy steps
							        </div>
							        <p className={classes["is-center"]}>
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
				{/*<div className="content-wrapper">
				    <div className="content">
				        <h2 className="content-head is-center">Excepteur sint occaecat cupidatat.</h2>

				        <div className="pure-g">
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">

				                <h3 className="content-subhead">
				                    <i className="fa fa-rocket"></i>
				                    Get Started Quickly
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
				                <h3 className="content-subhead">
				                    <i className="fa fa-mobile"></i>
				                    Responsive Layouts
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
				                <h3 className="content-subhead">
				                    <i className="fa fa-th-large"></i>
				                    Modular
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
				                <h3 className="content-subhead">
				                    <i className="fa fa-check-square-o"></i>
				                    Plays Nice
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				        </div>
				    </div>

				    <div className="ribbon l-box-lrg pure-g">
				        <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
				            <img className="pure-img-responsive" alt="File Icons" width="300" src={FileIcons}></img>
				        </div>
				        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">

				            <h2 className="content-head content-head-ribbon">Laboris nisi ut aliquip.</h2>

				            <p>
				                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				                consequat. Duis aute irure dolor.
				            </p>
				        </div>
				    </div>

				    <div className="content">
				        <h2 className="content-head is-center">Dolore magna aliqua. Uis aute irure.</h2>

				        <div className="pure-g">
				            <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
				                <form className="pure-form pure-form-stacked">
				                    <fieldset>

				                        <label for="name">Your Name</label>
				                        <input id="name" type="text" placeholder="Your Name"></input>


				                        <label for="email">Your Email</label>
				                        <input id="email" type="email" placeholder="Your Email"></input>

				                        <label for="password">Your Password</label>
				                        <input id="password" type="password" placeholder="Your Password"></input>

				                        <button type="submit" className="pure-button">Sign Up</button>
				                    </fieldset>
				                </form>
				            </div>

				            <div className="l-box-lrg pure-u-1 pure-u-md-3-5">
				                <h4>Contact Us</h4>
				                <p>
				                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				                    consequat.
				                </p>

				                <h4>More Information</h4>
				                <p>
				                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				                    tempor incididunt ut labore et dolore magna aliqua.
				                </p>
				            </div>
				        </div>

				    </div>

				    <div className="footer l-box is-center">
				        View the source of this layout to learn more. Made with love by the YUI Team.
				    </div>

				</div>*/}
			</div>
        )
    }
})

HomeView.propTypes = {
    globalState: React.PropTypes.object.isRequired,
    userAddressSearchChange: React.PropTypes.func.isRequired,
    userAddressUpdatePlaceId: React.PropTypes.func.isRequired,
    userAddressUpdateDetect:React.PropTypes.func.isRequired
}

export default HomeView
