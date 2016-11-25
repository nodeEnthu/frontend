import React from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'
import Login from '../Login/Login'
import './Header.scss'
export  class Header extends React.Component {
    constructor(props) {
        super(props);
        this.removeToken = this.removeToken.bind(this);
    }
    removeToken(){
      this.props.dispatch(actions.addToken(''));
      sessionStorage.removeItem('token');
      location.reload();
    }
    componentDidMount() {
           
    }
    render() {
        const { globalState } = this.props;
        const {img} = globalState.core.get('user').toJS();
        return (
            <div className="header">
            <div className="home-menu pure-menu pure-menu-horizontal">
              <span className="pure-menu-heading">fillurtummy</span>
              <ul className="pure-menu-list">
                  <li className="pure-menu-item">
                    <IndexLink to='/' className="pure-menu-link">
                      Home
                    </IndexLink>
                  </li>
                  {(globalState.core.get('token').length>0 )?
                    <li className="pure-menu-item">
                        <a className="pure-menu-link"
                          onClick = {this.removeToken}
                          >Logout</a>
                    </li>
                    :
                    undefined
                  }
                  <li className="pure-menu-item">
                    {(globalState.core.get('token').length>0 )?
                      <div>
                        <img  src={img} 
                              style = {{
                                borderRadius:24+'px',
                                width:'40px',
                                display:'inline-block'
                              }}
                              onClick={this.handleTouchTap}
                        />
                      </div>
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

