import React from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../layouts/CoreLayout/coreReducer'
import Login from '../Login/Login'
import './Header.scss'
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';


const Header =createReactClass ({
    getInitialState() {
      return {
        leftNavOpen:false,
        deleteAccntModalOpen:false,
        deleteText:'',
        showSpinner:false,
        accntDeleted:false,
        deleteResult:''
      }
    },
    handleModalOpen (){
      this.setState({deleteAccntModalOpen: true});
    },
    handleModalClose(){
      this.setState({deleteAccntModalOpen: false});
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
      this.setState({leftNavOpen:false});
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
    closeModal(){
       this.props.dispatch(actions.updateUser('firstTime', false));
    },
    deleteAccnt(userId){
      let self = this;
      this.setState({showSpinner:true,deleteResult: 'Deleting your profile'});
      securedPostCall('/api/providers/remove',{userId:userId, _id:userId})
        .then(function(res){
          self.setState({showSpinner:false});
          if(res && res.data && res.data.message && res.data.message === 'done' ){
            self.setState({accntDeleted:true,deleteResult: 'Account successfully deleted'});
            setTimeout(function(){
              self.context.router.push('/');
              self.removeToken();
            },2000);
          } else{
            self.setState({accntDeleted:false,deleteResult: 'Oops! something went wrong. Plese try again later'});
          }
          self.context.router.push('/');
          
        })
    },
    render() {
        const { globalState } = this.props;
        const {user} = globalState.core.toJS();
        user.title = user.title || 'someRandomString'; // name of the business
        let {deleteText,deleteAccntModalOpen, showSpinner, accntDeleted} = this.state;
        return (
              <AppBar
                title=""
                onLeftIconButtonTouchTap={()=>this.handleToggle()}
                titleStyle={{flex :'0 0 0'}}
              >
                <div className="frame" onClick={()=>this.context.router.push('/')}>
                  <img className = "logo show-desktop" src="/general/logo-desktop.png"></img>
                  <img className = "logo show-mobile" src="/general/logo-mobile.png"></img>
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
                  {(globalState.core.get('token').length>0 && user && user.name && user.place_id)?
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
                        Become a cook
                    </MenuItem>
                    :
                    undefined
                  }
                  {(globalState.core.get('token').length>0 )?
                    <MenuItem style ={{position: 'absolute', bottom:'0'}} leftIcon={<ActionDelete/>}>
                        <a onClick = {this.handleModalOpen}>Delete account</a>
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
                      {(!globalState.core.get('token').length || (user && user.published === false))?
                        <li onClick={this.checkLoginAndredirect}>
                            <a style={{padding: (globalState.core.get('token').length)? '0 4em': '0 0.75em'}} href="javascript:void(0)">Become a cook</a>
                        </li>
                        :
                        undefined
                      }
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
                  <Dialog 
                    open={deleteAccntModalOpen}
                    onRequestClose={this.handleClose}
                    className="is-center"
                  >
                    <p>Are you sure you want to  delete your account ?</p>
                    <p> Please be aware that you will loose all your data <strong>permanently</strong></p>
                    <p className="is-center"> Still want to go ahead with it ?</p>
                    {
                      (user && user.userType === 'provider')?
                      <form className="pure-form pure-form-stacked">
                        <textarea className = "pure-u-1" value={deleteText} placeholder="Please type in your profile/business name to confirm." onChange={(event)=>this.setState({deleteText:event.target.value})}/>
                      </form>
                      :
                      undefined
                    }
                    
                    <div style={{display:(this.state.showSpinner)?'block':'none'}}>
                        <img src= "/general/loading.svg"/>
                    </div>
                  { (accntDeleted === false && !showSpinner)?
                    <div>
                      <RaisedButton label="No"
                        onTouchTap={()=>this.setState({deleteAccntModalOpen:false})}
                      />
                      <div className="pure-u-1-12">
                      </div>
                      {
                        (user.title || user.userType === 'consumer')?
                        <RaisedButton 
                          backgroundColor="red" 
                          label="Yes" 
                          onTouchTap={(event)=>this.deleteAccnt(user._id)}
                          disabled={(this.state.deleteText.toUpperCase() != user.title.toUpperCase() && user.userType != 'consumer')}
                        />
                        :undefined
                      }
                    </div>
                    :
                    undefined
                  }
                  {
                    (accntDeleted)?
                    <div>Your account has been successfully deleted !</div>
                    :
                    undefined
                  }    
                      
                  </Dialog>
                  <div className="is-center">
                    <Dialog
                      modal={true}
                      title={ <div className="welcome-title">
                                 <img className="welcome-img" src= "/general/logo-desktop.png"/>
                                 <span className="welcome-text">welcomes you</span>
                              </div> 
                            }
                      style={{color:'black'}}
                      titleStyle={{backgroundColor:"#FF6F00",color:"white",fontSize:"100%"}}
                      open={user.firstTime || false}
                      contentClassName="happy-welcome"
                      style={{ width: '100%', maxWidth:''}}
                    > 
                      <div style={{margin:'1em auto', textAlign:"center",color:"black",fontSize:"105%"}}>
                         Hello {user.name}, your email on file is {user.email} 
                      </div>
                      
                      
                      <div className="is-center">
                        <RaisedButton
                          label="Close"
                          primary={true}
                          onTouchTap={this.closeModal}
                          className="is-center"
                          style={{marginTop:'1.5em'}}
                          disableTouchRipple={true}
                        />
                      </div>
                    </Dialog>
                  </div>

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

