/*
* this will only happen when a person is already onlineand someone else initiates a chat 
* a) provider receives a message from the customer
* b) customer/provider initiates a chat and then closes a window
*/
import React from 'react'
import './popupChat.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as actions from '../../routes/Chat/modules/chat'
import moment from 'moment'
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class'
import Hashids from 'hashids'
import { getCall } from 'utils/httpUtils/apiCallWrapper'
import ChatWindow from 'components/ChatWindow'

const PopupChat = createReactClass({
  getInitialState() {
    return{
      messageBeingTyped:undefined,
      providerId: this.props.providerId,
      showChatBox:false,
      providerName:this.props.providerName
    }
  },
  startChat(){
    let {room,chatWindowOpen,dispatch,resetNewMessageFlag } = this.props;
    dispatch(chatWindowOpen(room,!this.state.showChatBox));
    this.setState({showChatBox:!this.state.showChatBox});
  },
  toggle(){
    let {room,chatWindowOpen,dispatch,resetNewMessageFlag } = this.props;
    this.setState({showChatBox:false});
    dispatch(chatWindowOpen(room,false));
  },
  handleChange(event){
    this.setState({messageBeingTyped:event.target.value});
  },
  render(){
    let {providerName, showChatBox} = this.state;
    const {user,img,position,globalState,room} = this.props;
    const {chats} = globalState.core.toJS();
    return (
      <div>
          <div className="chat-circle btn btn-raised" onClick={this.startChat} 
           style={{backgroundImage: `url(${img})`, backgroundPosition:'center', left : position }}
          >
            {
              (!chats[room].windowOpen && chats[room].newMessage)?
              <div className="notification-bell"></div>:
              undefined
            }
            <div className="chat-overlay"></div>
          </div>
        
        <ChatWindow toggle={this.toggle} 
                    showChatBox={this.state.showChatBox} 
                    room={this.props.room} 
                    user = {user} 
                    globalState = {this.props.globalState}
        />
      </div>
    );
  }
}); 

PopupChat.propTypes = {
  img: PropTypes.string,
  user: PropTypes.object,
  position:PropTypes.number,
  chatWindowOpen:PropTypes.func,
  resetNewMessageFlag: PropTypes.func,
  dispatch:PropTypes.func
}
export default PopupChat;
