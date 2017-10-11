// Libs
import React from 'react';
import Dialog from 'material-ui/Dialog';
import { Link, IndexLink } from 'react-router';
import './login.scss';
import FacebookLogin from 'components/Facebook/Facebook';
import GoogleLogin from 'components/GoogleLogin';
import * as actions from '../../layouts/CoreLayout/coreReducer';
import {getCall,postCall,securedGetCall} from 'utils/httpUtils/apiCallWrapper';
import getSearchAddressAndPlaceId from 'utils/getSearchAddressAndPlaceId'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import initializeOneSignal from 'utils/initializeOneSignal';

var Login = createReactClass({
    openModal() {
        const { dispatch } = this.props;
        dispatch(actions.openLoginModal());
    },
    closeModal() {
        const { dispatch } = this.props;
        dispatch(actions.closeLoginModal());
    },
    componentDidMount() {
    },
    contextTypes: {
      router: PropTypes.object.isRequired
    },
    successfullLogin(response) {
      let self = this;
      const {globalState,dispatch } = this.props;
      const {user,envVars} = globalState.core.toJS();
      const {searchText, place_id} = user;
      postCall('/api/users/signUp', JSON.stringify(response))
          .then(function(result) {
              let res = result.data;
              if (res.token) {
                  // user will be logged in for just this tab
                  sessionStorage.setItem('token', res.token);
                  dispatch(actions.addToken(res.token));
                  dispatch(actions.addUser(res.user));
                  dispatch(actions.userLoggedIn(true));
                  let userSearchAndPlaceId;
                  dispatch(actions.updateUser('firstTime',res.firstTime));
                  // check whether the person was looking for a new address before logging in 
                  if(searchText && place_id){
                    // register the new location
                    securedGetCall('/api/locations/registerMostRecentSearchLocation',{address:searchText,place_id:place_id})
                    userSearchAndPlaceId = {address:searchText, placeId:place_id}
                  } else userSearchAndPlaceId = getSearchAddressAndPlaceId(res.user);
                  dispatch(actions.updateUser('searchText',userSearchAndPlaceId.address));
                  dispatch(actions.updateUser('place_id',userSearchAndPlaceId.placeId));
                  // initialize one signal here .. 
                  //but first get the appId dependent upon the environment
                  initializeOneSignal(envVars.oneSignalAppId);              
                  // get the path to redirect to
                  let redirectPath = globalState.core.get('postLoginUrlRedirect');
                  if(redirectPath){
                    // special treatment for first time provider entry here as we dont know the objectID
                    switch(redirectPath){
                      case 'providerProfileEntry':
                        redirectPath = '/provider/'+res.user._id+'/providerProfileEntry';
                        break;
                      case 'postTiffinRequirement':
                        redirectPath= '/job/create';
                        break;

                    }
                    self.context.router.push(redirectPath);
                    // reset it back to empty
                    dispatch(actions.postLoginUrlRedirect(''));
                  }
                  
              }
          })
    },
    successfullFbLogin(response){
       response.provider = 'fb';
       this.successfullLogin(response);
    },
    successfullGmailLogin(response){
      // normalize the data coming back
      const BasicProfile = response.getBasicProfile();
      let normalizedResponse = {
        name: BasicProfile.getName(),
        email:BasicProfile.getEmail(),
        img:BasicProfile.getImageUrl(),
        provider: 'gmail',
        userID:BasicProfile.getId()
      };
      this.successfullLogin(normalizedResponse);
    },
    render: function() {
        const { loginModalOPen, envVars } = this.props.globalState.core.toJS();
        return (
              <div>
                  <a
                    onClick={this.openModal}
                    >Login
                  </a>
                <Dialog
                  title={ <div className="welcome-title">
                             <img className="welcome-img" src= "/general/logo-desktop.png"/>
                             <span className="welcome-text">welcomes you</span>
                          </div> 
                        }
                  style={{color:'black',height:'100%'}}
                  titleStyle={{backgroundColor:"#FF6F00",color:"white",fontSize:"100%"}}
                  open={loginModalOPen || false}
                  onRequestClose={()=>this.closeModal()}
                  contentClassName="happy-welcome"
                  style={{ width: '100%', maxWidth:''}}
                > 
                  <div style={{margin:'1em auto', textAlign:"center",color:"black",fontSize:"105%"}}>
                     <div className="pure-u-1">Please login with your facebook or gmail account</div>
                     <div className="pure-u-1">
                      <FacebookLogin
                        appId={envVars.facebookLoginId}
                        autoLoad={true}
                        fields="id,email,name,link,picture"
                        callback={this.successfullFbLogin} 
                      />
                    </div>
                    <div className="pure-u-1">
                      <GoogleLogin
                        clientId={envVars.googleLoginId}
                        buttonText="Login"
                        callback={this.successfullGmailLogin} 
                      />
                    </div> 
                  </div>
                  <div className="pure-u-1 disclaimer-text">
                    by logging in you agree to our <Link to="/termsandconditions" onClick={()=>this.closeModal()}>terms and conditions</Link>
                  </div>
                </Dialog>
              </div>
        );
    }
});

export default Login;
