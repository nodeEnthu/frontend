// Libs
import React from 'react';
import Dialog from 'material-ui/Dialog';
import { Link, IndexLink } from 'react-router';

import FacebookLogin from 'components/Facebook/Facebook';
import GoogleLogin from 'components/GoogleLogin';
import * as actions from '../../layouts/CoreLayout/coreReducer';
import {getCall,postCall,securedGetCall} from 'utils/httpUtils/apiCallWrapper';
import getSearchAddressAndPlaceId from 'utils/getSearchAddressAndPlaceId'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';


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
      const {searchText, place_id} = globalState.core.get('user').toJS();
      postCall('/api/users/signUp', JSON.stringify(response))
          .then(function(result) {
              let res = result.data;
              if (res.token) {
                  dispatch(actions.addToken(res.token));
                  dispatch(actions.addUser(res.user));
                  dispatch(actions.userLoggedIn(true));
                  let userSearchAndPlaceId;
                  dispatch(actions.updateUser('firstTime',res.firstTime));
                  // check whether the person was looking for a new address before logging in 
                  if(searchText && place_id){
                    // register the new location
                    securedGetCall('api/locations/registerMostRecentSearchLocation',{address:searchText,place_id:place_id})
                    userSearchAndPlaceId = {address:searchText, placeId:place_id}
                  } else userSearchAndPlaceId = getSearchAddressAndPlaceId(res.user);
                  dispatch(actions.updateUser('searchText',userSearchAndPlaceId.address));
                  dispatch(actions.updateUser('place_id',userSearchAndPlaceId.placeId));
                  sessionStorage.setItem('token', res.token);
                  if(self.context.router.location.pathname === '/'){
                    // get the path to redirect to
                    let redirectPath = globalState.core.get('postLoginUrlRedirect');

                    if(redirectPath){
                      // special treatment for first time provider entry here as we dont know the objectID
                      redirectPath = (redirectPath ==='providerProfileEntry')? '/provider/'+res.user._id+'/providerProfileEntry':redirectPath;
                      self.context.router.push(redirectPath);
                      // reset it back to ''
                      dispatch(actions.postLoginUrlRedirect(''));
                    } else{
                      // now based on the userType take an action
                      if (res.user.userType === 'provider'){
                         self.context.router.push('/providerProfile/'+res.user._id);
                      }
                    }
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
        const { loginModalOPen } = this.props.globalState.core.toJS();
        return (
              <div>
                  <a
                    onClick={this.openModal}
                    >Login
                  </a>
                <Dialog
                  open={loginModalOPen || false}
                  onRequestClose={()=>this.closeModal()}
                >
                  <div ref="subtitle"
                    style={{
                      textAlign:'center'
                    }}>
                    Please login with your facebook or gmail account
                  </div>
                    <div style={{textAlign:"center"}}>
                      <FacebookLogin
                        appId="116207178810953"
                        autoLoad={true}
                        fields="id,email,name,link,picture"
                        callback={this.successfullFbLogin} 
                      />
                      <GoogleLogin
                        clientId="1038006636920-ilhv28295jr3l244jhvf79u9j115bl9e.apps.googleusercontent.com"
                        buttonText="Login"
                        callback={this.successfullGmailLogin} 
                      />
                    </div>                  
                </Dialog>
              </div>
        );
    }
});

export default Login;
