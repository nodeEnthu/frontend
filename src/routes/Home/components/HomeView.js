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
import Stepper from 'components/Stepper';
const HomeView = React.createClass({
    getInitialState() {
        return {
            fetchingAddresses: false,
            showBackDrop:false,
            showAddressError:false,
            addressErrorMessage:''
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
    checkAddress(){
        const {place_id,searchText} = this.props.globalState.core.get('userAddressSearch').toJS();
        let validAddress = (place_id &&searchText)? true:false;
        let addressErrorMessage;
        if(!validAddress){
            addressErrorMessage = (!place_id && searchText)? 'Please select one of the suggested options':'Please enter address';
        }
        return {validAddress: validAddress,addressErrorMessage:addressErrorMessage };
    },
    goToPage(page) {
    	let self = this;
    	this.state.showBackDrop = true;
        if (page === 'search') {
            let checkValidAddress = this.checkAddress();
            if(checkValidAddress.validAddress){
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
                    // user is not logged in ...
                    this.context.router.push(page);
                }
            }else{
                this.setState({
                    showAddressError:true,
                    addressErrorMessage:checkValidAddress.addressErrorMessage
                })
            }

        } else {
            if(!this.props.globalState.core.get('userLoggedIn')){
                // set the page to go to after login
                this.props.postLoginUrlRedirect('provider');
                this.props.openLoginModal();
            }else this.context.router.push(page);
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
        let {showAddressError,addressErrorMessage} = this.state;
        return (
            <div className="home">
				<div className="splash-container pure-override-letter-spacing">
                    <div className="banner-wrapper">
                        <h1 className="promotion-heading">
                            Find the best professionals in your neighborhood
                        </h1>
                        <div className="pure-g">
                            <div className = "pure-u-1 pure-u-md-1-3 search-wrapper">
                                <div className="splash move-right">
                                    <div className="category-wrapper">
                                        <span>Im looking for</span>
                                        <select defaultValue ="food" name="select-category">
                                            <option value="food">
                                                Food
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className = "pure-u-md-2-3 pure-u-1">
                               <div className="splash move-left">
                                    <div className="address-wrapper">
                                        <span style={{marginRight:"10px"}}>in</span>
                                        <div className="address-sub-wrapper"> 
                                            <AsyncAutocomplete
                                                name={"home_view"} 
                                                userSearchText = {this.props.globalState.core.get('userAddressSearch').get('searchText')}
                                                apiUrl = {'/api/locations/addressTypeAssist'}
                                                getSuggestionValue={(suggestion)=>suggestion.address}
                                                onChange = {(event, value)=>{
                                                                                this.setState({
                                                                                    showAddressError:false
                                                                                });
                                                                                this.props.userAddressSearchChange(value.newValue)}
                                                                            }
                                                onSuggestionSelected = {this.onSuggestionSelected}
                                            />
                                            <div className="icon-locate">
                                                <img src="iconLocate.png"></img>
                                            </div>
                                            <div className="locate-me">Locate me</div>
                                        </div>
                                        <div className="search-button">
                                            <img src="iconSearch.png"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pure-g steps">
                    <div className="pure-u-1 steps-text">
                        3 easy steps to find the best professional
                    </div>
                    <div className="step pure-u-md-1-3 pure-u-1">
                        <img src="shared/home/icon-SearchBig.png">
                        </img>
                        <div className="step-heading">
                            Step 1 - <span className="step-summary">Search</span>
                        </div>
                        <div className="step-text">
                            Search for the service and provider
                        </div>
                    </div>
                    <div className="step pure-u-md-1-3 pure-u-1">
                        <img src="shared/home/icon-QuoteBig.png">
                        </img>
                        <div className="step-heading" >
                            Step 2 - <span className="step-summary">Browse</span>
                        </div>
                        <div className="step-text">
                            Browse different provider profiles
                        </div>
                    </div>
                    <div className="step pure-u-md-1-3 pure-u-1">
                        <img src="shared/home/icon-HireBig.png">
                        </img>
                        <div className="step-heading">
                            Step-3 - <span className="step-summary">Order</span>
                        </div>
                        <div className="step-text">
                            Order and receive a confirmation email from provider
                        </div>
                    </div>
                </div>
                <div className="pure-g list-business">
                    <div className="pure-u-md-1-2 pure-u-1">
                        <img src="shared/home/cookPhoto.jpg"></img>
                    </div>
                    <div className="pure-u-md-1-2 pure-u-1 your-business">
                        <div className="business-heading">
                            List your business with us
                        </div>
                        <div className="business-promotion">
                            <p>
                                Start showcasing your profile and accepting orders quickly with our
                                easy form based page builder
                            </p>
                            <p>
                                We are starting off with food with a vision of expanding this service to 
                                other categories like electricians, plumbers etc as well
                            </p>
                            <p className="business-signup" onClick={()=>this.goToPage('providerEntry')}>
                                Sign up now
                            </p>
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
    openLoginModal:React.PropTypes.func.isRequired,
    postLoginUrlRedirect:React.PropTypes.func.isRequired
}


export default HomeView
