import React from 'react'
import './messageWindow.scss'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import RaisedButton from 'material-ui/RaisedButton';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import CheckMark from 'components/CheckMark'

const MessageWindow = createReactClass({
  getInitialState() {
      return {
        messageModalOpen: false,
        openModalAfterLogin:false,
        message:'',
        errorMessage:'',
        showSpinner:false,
        showCheckMark:false,
        showCrossMark:false
      };
  },
  componentWillReceiveProps(nextProps){
    // this is to add the food item to checkout after user tried to do it in guest mode
    let {openModalAfterLogin} = this.state;
    // that means user tried to open the message me modal before logging in
    if(nextProps.globalState.core.get('userLoggedIn') && openModalAfterLogin) {
      // resetting it back
      this.setState({openModalAfterLogin:false});
      // check if the user is in its own profile before adding to the cart
      if(nextProps.globalState.core.get('user').get('_id') != this.props.id){
        this.setState({messageModalOpen: true});
      }
    }
  },
  checkLoginAndOpenModal(event){
    const {globalState, openLoginModal} = this.props;
     if(this.props.globalState.core.get('userLoggedIn')){
      this.setState({messageModalOpen: true});
     }else{
      this.setState({openModalAfterLogin:true});
      openLoginModal(true);
     }
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  closeModal(){
    this.setState(
      {messageModalOpen: false,
        openModalAfterLogin:false,
        message:'',
        errorMessage:'',
        showSpinner:false,
        showCheckMark:false,
        showCrossMark:false});
  },
  componentWillUnmount(){
  },
  updateMessage(event){
    this.setState({message: event.target.value});
  },
  handleFocus(){
    this.setState({errorMessage:undefined});
  },
  handleBlur(event){
    if(!event.target.value){
      this.setState({errorMessage:'Please type your message'});
    }
  },
  sendMessageToProvider(event){
    let self = this;
    event.preventDefault();
    if(!this.state.message){
      this.setState({errorMessage:'Please type your message'});
    }else{
      this.setState({showSpinner:true});
      let reqBody = {
                      message:this.state.message, 
                      providerEmail:this.props.provider.email, 
                      customerEmail:this.props.globalState.core.get('user').get('email'),
                      customerName: this.props.globalState.core.get('user').get('name'),
                    };
      securedPostCall('/api/message/provider', reqBody)
        .then(function(result){
          self.setState({showSpinner:false, showCheckMark:true});
        });
    }
  },
  render(){
    let {messageModalOpen, message, errorMessage, showCheckMark, showCrossMark} = this.state;
    const {user} = this.props.globalState.core.toJS();
    return <div className="message-window">
            <FlatButton
              backgroundColor="#16987e"
              label="Send me a message"
              labelStyle={{color:'white'}}
              style={{height:'24px',lineHeight:'24px',minWidth:'80px', display:'inline-block', bottom:'5px', left:'1em'}}
              onTouchTap={this.checkLoginAndOpenModal}
              disableTouchRipple={true}
            />
            <FullscreenDialog
              open={messageModalOpen}
              onRequestClose={this.closeModal}
             >
              <div className="message-container">  
                <form id="contact">
                  <h4>Message for {this.props.provider.title}</h4>
                  <fieldset>
                    <input placeholder="Your name" type="text" value={user.name} disabled={true}/>
                  </fieldset>
                  <fieldset>
                    <input placeholder="Your Email Address" type="email" value={user.email} disabled={true}/>
                  </fieldset>
                  <fieldset>
                    <textarea placeholder="Type your Message Here...." autoFocus value={message} 
                      onChange={this.updateMessage}
                      onFocus={this.handleFocus}
                      onBlur = {this.handleBlur}
                    >    
                    </textarea>
                    <span className = "error-message">{(errorMessage)?'*'+errorMessage:undefined}</span>

                  </fieldset>
                  <div className="is-center loading-action">
                    <div style={{display:(this.state.showSpinner)?'block':'none'}}>
                        <img src= "/general/loading.svg"/>
                    </div>

                    <div style={{display:(showCheckMark)?'block':'none'}} className="order-result">
                      <CheckMark style={{width:'15%',margin:"0 auto"}}/>
                      <div className="action-taken-message">Success! Your message has been sent to the provider</div>
                    </div>

                    <div style={{display:(showCrossMark)?'block':'none'}} className="order-result">
                      Oops! thats embarassing ... something went wrong. We are alooking into it. Sorry for the inconvenience!
                    </div>

                  </div>
                  {
                    (!showCrossMark && !showCheckMark)?
                    <fieldset>
                      <button type="submit" name="Send your message" id="contact-submit" onClick={(e) => this.sendMessageToProvider(e)}>Submit</button>
                    </fieldset>
                    :
                    undefined
                  }
                  
                </form>
              </div>
            </FullscreenDialog>
          </div>
  }
})
MessageWindow.propTypes={
  globalState:PropTypes.object,
  provider:PropTypes.object,
  openLoginModal: PropTypes.func,
  id: PropTypes.string
}

export default MessageWindow
