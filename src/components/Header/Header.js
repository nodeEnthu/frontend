import React from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'
import Login from '../Login/Login'
import './Header.scss'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const Header =createReactClass ({
    getInitialState() {
      return {leftNavOpen:false}
    },
    handleToggle(){
      this.setState({leftNavOpen:true});
    },
    removeToken(){
      this.props.dispatch(actions.addToken(''));
      sessionStorage.removeItem('token');
      location.reload();
    },
    contextTypes: {
      router: PropTypes.object.isRequired
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
    goToPage(link){
      this.context.router.push(link);
      this.setState({leftNavOpen:false});
    },
    goToHomePage(user){
      if(user.userType === 'provider'){
        this.context.router.push('/providerProfile/'+user._id)
      } 
    },
    render() {
        const { globalState } = this.props;
        const {user} = globalState.core.toJS();
        return (
              <AppBar
                title=""
                onLeftIconButtonTouchTap={()=>this.handleToggle()}
                titleStyle={{flex :'0 0 0'}}
              >
                <div className="frame">
                  <img className = "logo" src="/general/logo.png"></img>
                </div>

                <Drawer
                  docked={false}
                  width={200}
                  open={this.state.leftNavOpen}
                  onRequestChange={(leftNavOpen) => this.setState({leftNavOpen})}
                >
                  <div style={{height:'2em'}}></div>
                  {(globalState.core.get('token').length>0 && user&& user.name && user.userType==='provider')?
                    undefined
                    :
                    <MenuItem leftIcon={<ActionHome/>} onTouchTap={()=>this.goToPage('/')}>
                      Home
                    </MenuItem>
                  }
                  {(globalState.core.get('token').length>0 && user&& user.name)?
                    <MenuItem leftIcon={<ActionSearch/>} onTouchTap={()=>this.goToPage('/search')}>
                      Search
                    </MenuItem>
                    :
                    undefined
                  }
                  {(globalState.core.get('token').length>0 )?
                    <MenuItem leftIcon={<ActionChromeReaderMode/>} onTouchTap={()=>this.goToPage('/user/'+user._id+'/order-summary/#')}>
                      Orders
                    </MenuItem>
                    :
                    undefined
                  }
                  {(globalState.core.get('token').length>0 )?
                    <MenuItem leftIcon={<ActionPowerSettingsNew/>}>
                        <a onClick = {this.removeToken}>Logout</a>
                    </MenuItem>
                    :
                    undefined
                  }
                  {((user && (user.userType === 'consumer' || !user.published)) || !globalState.core.get('token').length)?
                    <MenuItem leftIcon={<ActionPermIdentity/>} onTouchTap={this.checkLoginAndredirect}>
                        List yourself
                    </MenuItem>
                    :
                    undefined
                  }
                </Drawer>
                <nav id="sub-nav" role="navigation">
                    <ul>
                      <li>
                        {(globalState.core.get('token').length>0 )?
                          undefined
                          :
                          <Login{...this.props}/>
                         } 
                      </li>
                      <li className="profile-pic" onClick={()=>this.goToHomePage(user)}>
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
              </AppBar>
                
        );
    }
});

function mapStateToProps(state) {
    return {
        globalState: state,
    };
}
export default connect(mapStateToProps)(Header)

