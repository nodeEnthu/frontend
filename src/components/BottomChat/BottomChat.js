import React from 'react'
import './bottomChat.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as actions from '../../routes/Chat/modules/chat'
import moment from 'moment'
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class'
import Hashids from 'hashids'
import { getCall } from 'utils/httpUtils/apiCallWrapper'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ChatWindow from 'components/ChatWindow'
import CommunicationChat from 'material-ui/svg-icons/communication/chat';

const BottomChat = createReactClass({
  getInitialState() {
    return{
      messageBeingTyped:undefined,
      providerId: this.props.providerId,
      roomName:undefined,
      showChatBox:false,
      providerName:this.props.providerName,
      providerAvatar:this.props.providerAvatar
    }
  },
  startChatWithProvider(){
    const {showChatBox,roomName,providerId, providerAvatar} = this.state;
    this.props.chatWindowOpen(roomName,!showChatBox);
    this.setState({showChatBox:!this.state.showChatBox});
    const {user} = this.props.globalState.core.toJS();
    getCall('/api/chat/startChat',{
      roomName: roomName,
      providerId: providerId,
      userId:user._id,
      avatar:user.img,
      userName:user.name,
      providerAvatar:providerAvatar
    })
  },
  toggle(){
    const {showChatBox,roomName} = this.state;
    this.setState({showChatBox:!this.state.showChatBox});
    this.props.chatWindowOpen(roomName,!showChatBox);
  },
  componentDidMount() {
    let self = this;
    const {user} = this.props.globalState.core.toJS();
    var hashids = new Hashids();
    let roomName = hashids.encodeHex(user._id,this.state.providerId);
    ahClient.roomAdd(roomName, function(error){ if(error){ } });
    this.setState({roomName:roomName,providerId:this.props.providerId});
  },
  handleChange(event){
    this.setState({messageBeingTyped:event.target.value});
  },
  render(){
    let {providerName, showChatBox} = this.state;
    const {user} = this.props.globalState.core.toJS();    
    return (
      <div>
        <div className="chat-circle">
          <IconButton tooltip="Chat with me"
                      onClick={this.startChatWithProvider}
                      style={{bottom:'10px',right:'10px'}}
          >
            <CommunicationChat />
          </IconButton>
        </div>
        <ChatWindow toggle={this.toggle} 
                    showChatBox={this.state.showChatBox} 
                    room={this.state.roomName} 
                    user={user} 
                    globalState = {this.props.globalState}
                    providerAvatar = {this.props.providerAvatar}/>
      </div>
    );
  }
}); 

BottomChat.propTypes = {
  providerId: PropTypes.string.isRequired,
  providerName:PropTypes.string.isRequired,
  providerAvatar:PropTypes.string.isRequired,
  globalState:PropTypes.object.isRequired,
  chatWindowOpen:PropTypes.func
}
export default BottomChat;
