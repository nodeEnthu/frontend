import React from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'
import Login from '../Login/Login'
import classes from './Header.scss'
import classNames from 'classnames'
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
            <div className={classes["header"]}>
            <div className={classNames(classes["home-menu"], "pure-menu","pure-menu-horizontal")}>
              <a className="pure-menu-heading" href="">Your Site</a>
              <ul className="pure-menu-list">
                  <li className="pure-menu-item pure-menu-selected">
                    <IndexLink to='/' className="pure-menu-link">
                      Home
                    </IndexLink>
                  </li>
                  <li className="pure-menu-item">
                      <Link to='/providerProfile/12345' className="pure-menu-link">Tour</Link>
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
