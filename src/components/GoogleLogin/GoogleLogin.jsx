import React, {Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

class GoogleLogin extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    offline: PropTypes.bool,
    scope: PropTypes.string,
    cssClass: PropTypes.string,
    redirectUri: PropTypes.string,
    cookiePolicy: PropTypes.string,
    loginHint: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    buttonText: 'Login with Google',
    scope: 'profile email',
    redirectUri: 'postmessage',
    cookiePolicy: 'single_host_origin',
  };

  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    const { clientId, scope, cookiePolicy, loginHint } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        scope,
      };
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init(params);
      });
    });
  }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const { offline, redirectUri, callback } = this.props;
    if (offline) {
      const options = {
        'redirect_uri': redirectUri,
      };
      auth2.grantOfflineAccess(options)
        .then((data) => {
          callback(data);
        });
    } else {
      auth2.signIn({
      'scope': 'profile email'
      })
        .then((response) => {
          callback(response);
        });
    }
  }

  render() {
    const { cssClass, buttonText, children } = this.props;
    return (
      <button className="pure-button"
            style={{background:"#dd4b39", 
              color:"white",
              width:"12em",
              height:"3em",
              marginTop:'1.5em'
            }}
            onClick={this.onBtnClick}
        >
            <i className="fa fa-google">
            </i> &nbsp;&nbsp; Google login
        </button>
    );
  }
}

export default GoogleLogin;