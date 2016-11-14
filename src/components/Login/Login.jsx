// Libs
import React from 'react';
import Modal from 'react-modal';
import FacebookLogin from 'components/Facebook/Facebook';
import GoogleLogin from 'components/GoogleLogin';
import * as actions from '../../layouts/CoreLayout/coreReducer';
import {getCall,postCall,securedGetCall} from 'utils/httpUtils/apiCallWrapper';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth:'50%',
        minHeight:'60%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


var Login = React.createClass({
    openModal() {
        const { dispatch } = this.props;
        dispatch(actions.openLoginModal());
    },
    closeModal() {
        const { dispatch } = this.props;
        dispatch(actions.closeLoginModal());
    },
    componentDidMount() {
      let token = sessionStorage.getItem('token');
      const { dispatch } = this.props;
      if (token) {
          // send an ajax call to get the user back 
          // this makes sure user is authenticated with us
          securedGetCall('/api/users/me')
              .then(function(result) {
                  dispatch(actions.addUser(result.data));
                  dispatch(actions.addToken(token));
                  dispatch(actions.userAddressSearchChange(result.data.userSeachLocations[result.data.deliveryAddressIndex].searchText))
              })
      }
    },
    successfullLogin(response) {
        const { dispatch } = this.props;
        postCall('/api/users/signUp', JSON.stringify(response))
            .then(function(result) {
                if (result.data.token) {
                    dispatch(actions.addToken(result.data.token));
                    dispatch(actions.addUser(result.data.user));
                    dispatch(actions.userLoggedIn(true));
                    sessionStorage.setItem('token', result.data.token);
                }
            })
    },
    successfullFbLogin(response){
       response.provider = 'fb';
       this.successfullLogin(response);
    },
    successfullGmailLogin(response){
      // normalize the data coming back
      let normalizedResponse = {
        name: response.wc.wc,
        email:response.wc.hg,
        img:response.wc.Ph,
        provider: 'gmail',
        userID:response.wc.Ka
      };
      this.successfullLogin(normalizedResponse);
    },
    render: function() {
        const { loginModalOPen } = this.props.globalState.core.toJS();
        return (
              <div className="pure-menu-item">
                  <a className="pure-menu-link"
                    onClick={this.openModal}
                    >Login</a>
                <Modal
                  isOpen={loginModalOPen}
                  onRequestClose={this.closeModal}
                  style={customStyles} >
                  <div ref="subtitle"
                    style={{
                      textAlign:'center',
                      marginBottom:'10%'
                    }}
                  >Please login with your facebook or gmail account</div>
                  <div style = {{width:'70%', margin:'0 auto'}}>
                    <FacebookLogin
                      style = {{textAlign:'center'}}
                      appId="116207178810953"
                      autoLoad={true}
                      fields="id,email,name,link,picture"
                      callback={this.successfullFbLogin} 
                    />
                  </div>
                  <div style = {{width:'70%', margin:'0 auto', marginTop:'20px'}}>
                    <GoogleLogin
                      clientId="1038006636920-ilhv28295jr3l244jhvf79u9j115bl9e.apps.googleusercontent.com"
                      buttonText="Login"
                      callback={this.successfullGmailLogin} 
                    />
                  </div>
                </Modal>
              </div>
        );
    }
});

export default Login;
