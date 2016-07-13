import React from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'
import Login from '../Login/Login'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { globalState } = this.props;
        const {img} = globalState.core.get('user').toJS();
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
                    {(globalState.core.get('token').length>0 )?
                      <img src={img} 
                        style = {{
                          borderRadius:24+'px',
                          width:'40px',
                          displat:'inline-block'
                        }}
                      />
                      :
                      <Login{...this.props}/>
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
