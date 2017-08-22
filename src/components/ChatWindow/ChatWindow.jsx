import React from 'react'
import './chatWindow.scss'
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class'
import { getCall } from 'utils/httpUtils/apiCallWrapper'

const ChatWindow = createReactClass({
  getInitialState() {
    return{
      messageBeingTyped:''
    }
  },
  typeMessage(event){
    this.setState({messageBeingTyped:event.target.value})
  },
  submitMessage(){
    const {user,room,providerAvatar} = this.props;
    const message = {message:this.state.messageBeingTyped, userId: user._id, userName:user.name}
    if(providerAvatar){
      message.providerAvatar = providerAvatar;
    }
    console.log(room,message);
    ahClient.say(room, JSON.stringify(message) );
    this.setState({messageBeingTyped:undefined});
  },
  render(){
    const {showChatBox,img, globalState,position} =  this.props;
    const {messageBeingTyped} = this.state;
    const {chats} = globalState.core.toJS();
    let resolvedMessages = (chats[this.props.room] && chats[this.props.room].messages )?chats[this.props.room].messages : [];
    return (
        <div className="chat-box" style={{display:(showChatBox)? 'block':'none'}}>
          <div className="chat-box-header" onClick={this.props.toggle}>
            Chat
          </div>
          <div className="chat-box-body">
            <div className="chat-box-overlay">
            </div>
            <div className="chat-logs">
              {resolvedMessages.map(function(message,index){
                  return <div key={index}>{message}</div>
                }
              )}
            </div>
          </div>
          <div className="chat-input">
            <input type="text" className="chat-input" placeholder="Send a message..." onChange={this.typeMessage} value = {messageBeingTyped || ' '}/>
            <button className="chat-submit" onClick={this.submitMessage}><i className="material-icons">send</i></button>
          </div>
        </div>
  
    );
  }
}); 

ChatWindow.propTypes = {
  toggle: PropTypes.func.isRequired,
  showChatBox:PropTypes.bool.isRequired,
  user:PropTypes.object.isRequired,
  providerAvatar:PropTypes.string
}
export default ChatWindow;
