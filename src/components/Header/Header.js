import React from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'
import Login from '../Login/Login'
import './Header.scss'
const Header =React.createClass ({
    removeToken(){
      this.props.dispatch(actions.addToken(''));
      sessionStorage.removeItem('token');
      location.reload();
    },
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    checkLoginAndredirect(){
      const {user} = this.props.globalState.core.toJS();
      if (user && user._id){
        this.context.router.push('/provider/'+user._id+'/providerProfileEntry' )
      }
      else{
        this.props.dispatch(actions.postLoginUrlRedirect('providerProfileEntry'));
        this.props.dispatch(actions.openLoginModal());
      }
    },
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
                  {((user && user.userType === 'consumer') || !globalState.core.get('token').length)?
                    <li>
                      <a href="javascript:void(0)" onClick={this.checkLoginAndredirect}>
                        LIST YOURSELF
                      </a>
                    </li>
                    :
                    undefined
                  }
                  
                  
                </ul>
              </nav>
              <nav id="sub-nav" role="navigation">
                <ul>
                  <li>
                    {(globalState.core.get('token').length>0 )?
                      undefined
                      :
                      <Login{...this.props}/>
                     } 
                  </li>
                  <li className="profile-pic">
                  {(user.img)?
                    <img src={user.img} 
                      style = {{
                        borderRadius:24+'px',
                        width:'40px',
                        display:'inline-block'
                      }}
                    />
                    :
                    undefined
                  } 
                  </li>
                </ul>
              </nav>
        </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        globalState: state,
    };
}
export default connect(mapStateToProps)(Header)

