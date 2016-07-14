import React from 'react'
import { IndexLink, Link } from 'react-router'
import FileIcons from '../assets/file-icons.png'
import Autosuggest from 'react-autosuggest'
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import store from 'store/createStore'
import IconButton from 'material-ui/IconButton'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import Spinner from 'react-spinkit'

const HomeView = React.createClass({
    getInitialState() {
        return {
                fetchingGeoZips:false,
        };
    },
    contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
    componentDidMount() {
       
    },
    
    goToProviderProfile(){
    	this.context.router.push('/provider');
    },
    getLocationCordinates(){
    	let self = this;
    	this.setState({
    		fetchingGeoZips:true
    	})
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {     
            let latitude =  pos.coords.latitude,
            	longitude =  pos.coords.longitude;
            fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+latitude+'&lon='+longitude+'&addressdetails=1')
            	.then(function(data){
            		return data.json();
            	}).then(function(response){
	            	self.props.userZipSearchChange(response.address.postcode);
	            	self.setState({
			    		fetchingGeoZips:false
			    	})
            	})
        	},
	        function(err) {
	            this.setState({
    				fetchingGeoZips:true
    			})
	        });
        } else {
            // show some error message
        }
    },
    render() {
    	console.log("parent rerender",this.state);
        return (
            <div>
				<div className="splash-container counter-fixed-menu pure-override-letter-spacing">
					<div className="banner-wrapper">
						<div className="pure-g">
							<div className = "pure-u-1 pure-u-md-1-2">
							    <div className="splash">
							        <h1 className="splash-head">
							        	Please enter a zip code to find food close to you.
							        </h1>
							        <AsyncAutocomplete settings={{
							        	userSearchText : this.props.homepage.get('userZipSearch'),
							        	apiUrl:'/api/locations/zipcodeTypeAssist',
							        	action:this.props.userZipSearchChange
							        }}/>
							        <IconButton
							        	style = {{
							        			padding:'0px',
							        			height:'0px',
							        			width:'0px',
							        			marginLeft:'-30px',
							        			top:'6px',
							        			display:'inline-block',
							        			visibility:(this.state.fetchingGeoZips)? 'hidden':'initial'							        		
							        		}}
							        	onClick = {this.getLocationCordinates}
							        >
							        	<CommunicationLocationOn/>
							        </IconButton>
							        <Spinner spinnerName='circle' 
							        	style = {{	display:'inline-block',
							        				visibility:(this.state.fetchingGeoZips)?'initial':'hidden',
							        				top:'5px'
							        			}}
							        />
							        <p className="is-center">
							        	<button className="pure-button pure-button-primary">Get Started</button>
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
							        		onClick={this.goToProviderProfile}>
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
	globalState:React.PropTypes.object.isRequired,
   	homepage:React.PropTypes.object.isRequired,
   	userZipSearchChange:React.PropTypes.func.isRequired
}

export default HomeView
