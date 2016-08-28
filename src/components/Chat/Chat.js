import React from 'react'
import classes from './Chat.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import * as actions from '../../routes/Chat/modules/chat'
import moment from 'moment'
import fetch from 'isomorphic-fetch'
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
        <div className={classNames(classes["container-chat"], classes["clearfix"])} >
          <div className={classes["people-list"]} id="people-list">
            <div className={classes["search"]}>
              <input type="text" placeholder="search" />
              <i className={classNames(classes["fa"], classes["fa-search"])}></i>
            </div>
            <ul className={classes["list"]}>
              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>
              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>
              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>
              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>

              <li className={classes["clearfix"]}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className={classes["about"]}>
                  <div className={classes["name"]}>Vincent Porter</div>
                  <div className={classes["status"]}>
                    <i className={classNames(classes["fa"], classes["fa-circle"],classes["online"])}></i> online
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className={classes["chat"]}>
            <div className={classNames(classes["chat-header"], classes["clearfix"])} >
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
              
              <div className={classes["chat-about"]}>
                <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
              </div>
              <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
            </div> 
            
            <div className={classes["chat-history"]}>
              <ul>
                <li className={classes["clearfix"]}>
                  <div className={classNames(classes["message-data"], classes["falign-right"])} >
                    <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                    <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                    
                  </div>
                  <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                    Hi Vincent, how are you? How is the project coming along?
                  </div>
                </li>
                
                <li>
                  <div className={classes["message-data"]}>
                    <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                    <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                  </div>
                  <div className={classNames(classes["message"], classes["my-message"])}>
                    Are we meeting today? Project has been already finished and I have results to show you.
                  </div>
                </li>
                
                <li className={classes["clearfix"]}>
                  <div className={classNames(classes["message-data"], classes["align-right"])} >
                    <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                    <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                    
                  </div>
                  <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                    Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                  </div>
                </li>
                
                <li>
                  <div className={classes["message-data"]}>
                     <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                     <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                  </div>
                  <div className={classNames(classes["message"], classes["my-message"])}>
                    Actually everything was fine. I am very excited to show this to our team.
                  </div>
                </li>
                
                <li>
                  <div className={classes["message-data"]}>
                    <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                     <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                  </div>
                  <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                  <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                  <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                </li>
              </ul>
            </div>
            <div className={classNames(classes["chat-message"],classes["clearfix"])} >
              <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"
                onChange={this.handleChange}
              ></textarea>
              <i className={classNames(classes["fa"],classes["fa-file-o"])}></i> &nbsp;&nbsp;&nbsp;
              <i className={classNames(classes["fa"],classes["fa-file-image-o"])}></i>
              <button onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        </div>
    );
  }
}; 

Chat.propTypes = {
  chat: React.PropTypes.object.isRequired,
  dispatch:React.PropTypes.func.isRequired,
  socket:React.PropTypes.object.isRequired
}
export default Chat;
