import React from 'react'
import { IndexLink, Link } from 'react-router'
import Autosuggest from 'react-autosuggest'
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import store from 'store/createStore'
import IconButton from 'material-ui/IconButton'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import './HomeView.scss'
import { getCall,securedGetCall } from 'utils/httpUtils/apiCallWrapper';
import Stepper from 'components/Stepper';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

const HomeView = createReactClass({
    getInitialState() {
        return {
            fetchingAddresses: false,
            goTosearchPageDelaySpinner:false,
            showBackDrop:false,
            showAddressError:false,
            addressErrorMessage:''
        };
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    componentDidMount() {

    },
    onSuggestionSelected(event,{suggestion}){
        this.setState({addressErrorMessage:undefined});
    	this.props.updateUser('searchText',suggestion.address);
        this.props.updateUser('place_id',suggestion.place_id);
    },
    checkAddress(){
        const {place_id,searchText} = this.props.globalState.core.get('user').toJS();
        let validAddress = (place_id &&searchText)? true:false;
        let addressErrorMessage;
        if(!validAddress){
            addressErrorMessage = (!place_id && searchText)? '*Please select one of the suggested options':'*Please enter address';
        }
        return {validAddress: validAddress,addressErrorMessage:addressErrorMessage };
    },
    goToPage(page) {
    	let self = this;
    	this.state.showBackDrop = true;
        if (page === 'search') {
            let checkValidAddress = this.checkAddress();
            if(checkValidAddress.validAddress){
                this.setState({goTosearchPageDelaySpinner:true});
                if(this.props.globalState.core.get('userLoggedIn')){
                    const {searchText,place_id} = this.props.globalState.core.get('user').toJS();
                    //register this at a new location if possible as the user needs to be logged in for this
                    // register the address as most recently used
                    securedGetCall('api/locations/registerMostRecentSearchLocation',{address:searchText,place_id:place_id})
                        .then(function(result){
                            self.state.showBackDrop = false;
                            self.setState({showBackDrop:false,goTosearchPageDelaySpinner:false});
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
            const {user} = this.props.globalState.core.toJS();
            if(!this.props.globalState.core.get('userLoggedIn')){
                // set the page to go to after login
                this.props.postLoginUrlRedirect('providerProfileEntry');
                this.props.openLoginModal();
            }else this.context.router.push('/provider/'+user._id+'/providerProfileEntry');
        }
        
    },
    getLocationCordinates() {
        let self = this;
        this.setState({fetchingAddresses: true})
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    const { latitude, longitude } = pos.coords;
                    getCall('api/locations/address', { latitude: latitude, longitude: longitude })
                        .then(function(response) {
                            self.props.updateUser('searchText',response.data.address);
                            self.props.updateUser('place_id',response.data.place_id);
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
        let {showAddressError,addressErrorMessage,fetchingAddresses,goTosearchPageDelaySpinner} = this.state;
        let {user} = this.props.globalState.core.toJS();
        return (
            <div className="home">
				<div className="splash-container pure-override-letter-spacing">
                    <div className="banner-wrapper">
                        <h1 className="promotion-heading">
                            Find the best chefs in your neighborhood
                        </h1>
                        <div className="search-sec-wrapper">
                            <div className = "pure-u-1 pure-u-md-1-3 search-wrapper">
                                <div className="splash move-right">
                                    <div className="category-wrapper">
                                        <span>Im looking for</span>
                                        <select defaultValue ="food" name="select-category">
                                            <option value="food">
                                                Food providers
                                            </option>
                                        </select>
                                        <span className="display-none-small" style={{margin:"0 10px"}}>in</span>
                                    </div>
                                </div>
                            </div>
                            <div className = "pure-u-md-2-3 pure-u-1">
                               <div className="splash move-left">
                                    <div className="address-wrapper">
                                        <div className="address-sub-wrapper"> 
                                            <AsyncAutocomplete
                                                name={"home_view"} 
                                                userSearchText = {this.props.globalState.core.get('user').get('searchText')}
                                                apiUrl = {'/api/locations/addressTypeAssist'}
                                                getSuggestionValue={(suggestion)=>suggestion.address}
                                                onChange = {(event, value)=>{
                                                                                this.setState({
                                                                                    showAddressError:false
                                                                                });
                                                                                this.props.updateUser('searchText',value.newValue);
                                                                                this.props.updateUser('place_id',null);
                                                                            }
                                                            }
                                                onSuggestionSelected = {this.onSuggestionSelected}
                                            />
                                            <div className="icon-locate" onClick={this.getLocationCordinates}>
                                                <img src={(fetchingAddresses)?"general/loading.svg": "iconLocate.png"}></img>
                                            </div>
                                            <div className="locate-me display-none-small">Locate me</div>
                                        </div>
                                        <div className="search-button" onClick={()=>this.goToPage("search")}>
                                            <img src={(goTosearchPageDelaySpinner)?"general/loading.svg": "iconSearch.png"}></img>
                                        </div>
                                    </div>
                                    {(addressErrorMessage)?<div>{addressErrorMessage}</div>:undefined}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub-content-wrapper">
                    <div className="how-se">
                        <h2>I&#39;m a <span>customer</span></h2>
                        <div className="wraper-container">
                            <div className="pure-u-1 pure-u-md-1-3">
                                <div className="how-col">
                                    <div className="how-bxx">
                                        <div className="how-pic">
                                            <img src="shared/home/magnifying-glass.png"/>
                                        </div>
                                        <div className="how-pic-cont">
                                            <h4>Search <span></span></h4>
                                            <p>Search for the service and provider</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-u-1 pure-u-md-1-3">
                                <div className="how-col">
                                    <div className="how-bxx">
                                        <div className="how-pic">
                                            <img src="shared/home/earth-globe.png"/>
                                        </div>
                                        <div className="how-pic-cont">
                                            <h4>Browse <span> </span></h4>
                                            <p>Browse different provider profiles</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-u-1 pure-u-md-1-3">
                                <div className="how-col">
                                    <div className="how-bxx">
                                        <div className="how-pic">
                                            <img src="shared/home/hand-shake.png"/>
                                        </div>
                                        <div className="how-pic-cont">
                                            <h4>Order <span></span></h4>
                                            <p>Order and receive confirmation email from provider</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="how-se how-second">
                        <h2>I&#39;m a <span>provider</span></h2>
                        <div className="wraper-container">
                            <div className="pure-u-1 pure-u-md-1-3">
                                <div className="how-col">
                                    <div className="how-bxx">
                                        <div className="how-pic">
                                            <img src="shared/home/chef.png"/>
                                        </div>
                                        <div className="how-pic-cont">
                                            <h4>Create <span> Profile</span></h4>
                                            <p>Click "BECOME A CHEF" on top nav bar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-u-1 pure-u-md-1-3">
                                <div className="how-col">
                                    <div className="how-bxx">
                                        <div className="how-pic">
                                            <img src="shared/home/rice.png"/>
                                        </div>
                                        <div className="how-pic-cont">
                                            <h4>Add <span>  Food Items</span></h4>
                                            <p>Add food item(s) you wish to provide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-u-1 pure-u-md-1-3">
                                <div className="how-col">
                                    <div className="how-bxx">
                                        <div className="how-pic">
                                            <img src="shared/home/thumb-up.png"/>
                                        </div>
                                        <div className="how-pic-cont">
                                            <h4>Preview & <span> Publish</span></h4>
                                            <p>You&#39;re DONE! start getting orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-business">
                        <div className="pure-u-md-1-2 pure-u-1 cook-photo">
                             <img className="gallery-img portrait" src="shared/home/cookPhoto.jpg"/>
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
			</div>
        )
    }
})

HomeView.propTypes = {
    globalState: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    openLoginModal:PropTypes.func.isRequired,
    postLoginUrlRedirect:PropTypes.func.isRequired
}


export default HomeView
