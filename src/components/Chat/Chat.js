import React from 'react'
import classes from './Chat.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as actions from '../../routes/Chat/modules/chat'
import moment from 'moment'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types';

export class Chat extends React.Component{
  constructor(props){
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { socket,dispatch } = this.props;
    socket.emit('chat mounted', { user: "username", channel: "Lobby" });
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
  }
  sendMessage(){
    const {text} = this.props.chat.toJS();
    let randomUser = Math.random();
    const reqBody={
      text:text,
      user:randomUser.toString(),
      time: moment().format('LT')
    }
    this.props.dispatch(actions.createMessage(JSON.stringify(reqBody)));
  }
  handleChange(event){
    let input = event.target.value;
    const {socket}= this.props;
    socket.emit('typing', { user: "username", channel: "Lobby" });
    this.props.dispatch(actions.addMessage(input));
  }
  render(){
    const {dispatch} = this.props;
    return (
        <div className="container-chat clearfix" >
          <div className="people-list people-list">
            <div className="search">
              <input type="text" placeholder="search" />
              <i className="fa fa-search"></i>
            </div>
            <ul className="list">
              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>
              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>
              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>
              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
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
                <div className="chat-num-messages">already 1 902 messages</div>
              </div>
              <i className="fa fa-star"></i>
            </div> 
            
            <div className="chat-history">
              <ul>
                <li className= "clearfix">
                  <div className="message-data falign-right">
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
                  <div className= "message-data">
                    <span className= "message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                     <span className= "message-data-time">10:31 AM, Today</span>
                  </div>
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
    );
  }
}; 

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  dispatch:PropTypes.func.isRequired,
  socket:PropTypes.object.isRequired
}
export default Chat;
