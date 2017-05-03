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
                <img className = "logo" src="/general/logo.png"></img>
              </div>
              <nav id="nav" role="navigation"> <a href="#nav" title="Show navigation">Show navigation</a><a href="#" title="Hide navigation">Hide navigation</a>
                <ul>
                  {(globalState.core.get('token').length>0 && user&& user.name && user.userType==='provider')?
                    undefined
                    :
                    <li>
                      <IndexLink to='/'>
                        HOME
                      </IndexLink>
                    </li>
                  }
                  {(globalState.core.get('token').length>0 && user&& user.name)?
                    <li>
                      <Link to='/search' >
                        SEARCH
                      </Link>
                    </li>
                    :
                    undefined
                  }
                  {(globalState.core.get('token').length>0 )?
                    <li>
                      <Link to={'/user/'+user._id+'/order-summary'} >
                        ORDERS
                      </Link>
                    </li>
                    
                    :
                    undefined
                  }
                  {(globalState.core.get('token').length>0 )?
                    <li>
                        <a onClick = {this.removeToken}>LOGOUT</a>
                    </li>
                    :
                    undefined
                  }
                  {(user && user.userType === 'customer')?
                    <li>
                      <Link to={'/provider/'+user._id+'/providerProfileEntry'} >
                        LIST YOURSELF
                      </Link>
                    </li>
                    :
                    undefined
                  }
                  
                  <li>
                    {(globalState.core.get('token').length>0 )?
                      undefined
                      :
                      <Login{...this.props}/>
                     } 
                  </li>
                </ul>
              </nav>
              <div className="profile-pic">
                <img src={user.img} 
                      style = {{
                        borderRadius:24+'px',
                        width:'40px',
                        display:'inline-block'
                      }}
                />
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

