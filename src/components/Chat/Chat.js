import React from 'react'
import classes from './Chat.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as actions from '../../routes/Chat/modules/chat'
import moment from 'moment'
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class'
import Hashids from 'hashids'
import { getCall } from 'utils/httpUtils/apiCallWrapper';

const Chat = createReactClass({
  getInitialState() {
    return{
      messageBeingTyped:undefined,
      roooms:{}
    }
  },
  client:undefined,
  componentDidMount() {
    this.client = new ActionheroClient;
    let self = this;
    const {user} = this.props.globalState.core.toJS();
    // autoenthu's id 592f5bcdb0a99b118604997b
    // gautam's id 595fc6d414e17fa86554b310
    // nomenclature followed it customer first and then provider .. remember its only the customer who will initiate a chat room 
    // easy to remember ... customer first
    var hashids = new Hashids();
    let roomName = hashids.encodeHex('592f5bcdb0a99b1','595fc6d414e17fa86554b310');
    this.client.on('say',function(messageBlock){
      const userId = messageBlock.userId;
      //let message = JSON.parse(messageBlock.message);
    })
    this.client.connect(function(error, details){
      if(error != null){
      }else{
            self.client.on('connected', function(){ console.log('connected!') })
            self.client.on('disconnected', function(){ console.log('disconnected :(') });
            getCall('/api/chat/createChatRoom', {roomName: roomName, userId:user._id, avatar: user.img, userName: user.name})
              .then(function(err, data){
                console.log('call from create chat room', data);
              });
            self.client.roomAdd("defaultRoom", function(error){ if(error){ console.log(error);} });
            self.client.on('say',function(message){console.log(message) })
      }
    });
  },
  sendMessage(){
    const {user} = this.props.globalState.core.toJS();
    this.client.say("defaultRoom", JSON.stringify({message:this.state.messageBeingTyped, clientId: user.name}) );
    this.setState({messageBeingTyped:undefined});
  },
  handleChange(event){
    this.setState({messageBeingTyped:event.target.value});
  },
  render(){
    const {dispatch} = this.props;
    return (
        <div> 
          <div className="container-chat clearfix" >
            <div className="people-list people-list">
              <ul className="list">
                <li className="clearfix">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                  <div className="about">
                    <div className="name">Vincent Porter</div>
                    <div className="status">
                      <i className="fa fa-circle fa-2 online"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix" >
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                <div className="chat-about">
                  <div className="chat-with">Chat with Vincent Porter</div>
                  <div className="chat-num-messages">already 902 messages</div>
                </div>
                <i className="fa fa-star"></i>
              </div> 
              
              <div className="chat-history">
                <ul>
                  <li className= "clearfix">
                    <div className="message-data align-right">
                      <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                      <span className="message-data-name">Olia</span> <i className="fa fa-circle me"></i>
                      
                    </div>
                    <div className="message other-message float-right">
                      Hi Vincent, how are you? How is the project coming along?
                    </div>
                  </li>
                  
                  <li>
                    <div className="message-data">
                      <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                      <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">
                      Are we meeting today? Project has been already finished and I have results to show you.
                    </div>
                  </li>
                  
                  <li className="clearfix">
                    <div className="message-data align-right">
                      <span className="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp;
                      <span className="message-data-name">Olia</span> <i className="fa fa-circle me"></i>
                      
                    </div>
                    <div className="message other-message float-right">
                      Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                    </div>
                  </li>
                  
                  <li>
                    <div className= "message-data">
                       <span className= "message-data-name"><i className= "fa fa-circle online"></i> Vincent</span>
                       <span className= "message-data-time" >10:20 AM, Today</span>
                    </div>
                    <div className= "message my-message">
                      Actually everything was fine. I am very excited to show this to our team.
                    </div>
                  </li>
                  
                  <li>
                    <i className= "fa fa-circle online"></i>
                    <i className= "fa fa-circle online"></i>
                    <i className="fa fa-circle online"></i>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"
                  onChange={this.handleChange}
                ></textarea>
                <i className= "fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                <button onClick={this.sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}); 

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  dispatch:PropTypes.func.isRequired,
}
export default Chat;
