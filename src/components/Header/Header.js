import React from 'react'
import { Link, IndexLink } from 'react-router';
import FacebookLogin from 'components/Facebook/Facebook'
import {connect} from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.successfulLogin = this.successfulLogin.bind(this);
    }
    successfulLogin(response) {
      console.log("fb was invoked",response);
      const {dispatch} = this.props;
      response.provider = 'fb';
      fetch('/api/users/signUp', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(response)
          })
          .then(function(res) {
              return res.json(); })
          .then(function(data) { 
              if(data.token){
                dispatch(actions.addToken(data.token))
              } 
           })
    }
    render() {
      const {globalState} = this.props;
      console.log(globalState.core.get('token'));
      console.log("getting re-rendered");
        return (
          <div className="header">
            <div className="home-menu pure-menu pure-menu-horizontal">
              <a className="pure-menu-heading" href="">Your Site</a>
              <ul className="pure-menu-list">
                  <li className="pure-menu-item pure-menu-selected">
                    <IndexLink to='/' className="pure-menu-link">
                      Home
                    </IndexLink>
                  </li>
                  <li className="pure-menu-item">
                      <Link to='/providerProfile' className="pure-menu-link">Tour</Link>
                  </li>
                  <li className="pure-menu-item">
                      <Link to='/provider' className="pure-menu-link">Provider</Link>
                  </li>
                  <li className="pure-menu-item">
                    {globalState.core.get('token').length>0?
                      undefined
                      :
                      <FacebookLogin
                      appId="116207178810953"
                      autoLoad={true}
                      fields="id,email,name,link,picture"
                      callback={this.successfulLogin} 
                      />
                     }
                     
                  </li>
              </ul>
          </div>
        </div>
        );
    }
};

function mapStateToProps(state) {
  return {
    globalState: state
  };
}
export default connect(mapStateToProps)(Header)
