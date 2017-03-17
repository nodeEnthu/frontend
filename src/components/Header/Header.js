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
        const {user} = globalState.core.toJS();
        return (
            <div className="header">
              <div className="frame">
                <img className = "logo" src="logo.png"></img>
              </div>
              <nav id="nav" role="navigation"> <a href="#nav" title="Show navigation">Show navigation</a><a href="#" title="Hide navigation">Hide navigation</a>
                <ul>
                  {(globalState.core.get('token').length>0 && user&& user.name && user.userType==='provider')?
                    undefined
                    :
                    <li>
                      <IndexLink to='/'>
                        Home
                      </IndexLink>
                    </li>
                  }
                  {(globalState.core.get('token').length>0 && user&& user.name)?
                    <li>
                      <Link to='/search' >
                        Search
                      </Link>
                    </li>
                    :
                    undefined
                  }
                  {(globalState.core.get('token').length>0 )?
                    <div style={{display:'inline-block'}}>
                      <li>
                        <Link to={'/user/'+user._id+'/order-summary'} >
                          Orders
                        </Link>
                      </li>
                      <li >
                          <a onClick = {this.removeToken}>Logout</a>
                      </li>
                    </div>
                    :
                    undefined
                  }
                  <li>
                    <a href="">LIST YOUR BUSINESS</a>
                  </li>
                  <li>
                    <a href="">
                      LOGIN
                    </a>
                  </li>
                </ul>
              </nav>
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

