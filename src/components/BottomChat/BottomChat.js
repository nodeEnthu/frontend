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
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import async from 'async'
const BottomChat = createReactClass({
  getInitialState() {
    return{
      providerId: this.props.providerId,
      roomName:undefined,
      providerName:this.props.providerName,
      providerAvatar:this.props.providerAvatar
    }
  },
  startChatWithProvider(){
    const {showChatBox,roomName,providerId, providerAvatar} = this.state;
    const {user} = this.props.globalState.core.toJS();
    if(ahClient.rooms.indexOf(roomName) === -1){
      async.series([
        function createRoom(cb){
          getCall('/api/chat/createChatRoom',{roomName: roomName});
          cb();
        }, 
        function addSelfToRoom(cb){
          ahClient.roomAdd(roomName, function(error){ 
            if(error){ 
            } cb();
          });
        }, 
        function sendMessageToSelfAndProvider(cb){
          getCall('/api/chat/startChat',{
              roomName: roomName,
              providerId: providerId,
              userId:user._id,
              avatar:user.img,
              userName:user.name,
              providerAvatar:providerAvatar
            }).then(function(){
              cb();
            })
        }],function (){
            // do nothing here
         }
      )

    }
  },
  componentDidMount() {
    let self = this;
    const {user} = this.props.globalState.core.toJS();
    var hashids = new Hashids(user._id);
    let roomName = hashids.encodeHex(this.state.providerId);
    this.setState({roomName:roomName,providerId:this.props.providerId});
  },
  render(){
    return (
        <div className="chat-circle">
          <IconButton tooltip="Chat with me"
                      onClick={this.startChatWithProvider}
                      style={{bottom:'10px',right:'10px'}}
          >
            <CommunicationChat />
          </IconButton>
        </div>
    );
  }
}); 

BottomChat.propTypes = {
  providerId: PropTypes.string.isRequired,
  providerName:PropTypes.string.isRequired,
  providerAvatar:PropTypes.string.isRequired,
  globalState:PropTypes.object.isRequired
}
export default BottomChat;
