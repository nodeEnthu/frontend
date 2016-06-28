import React, { Component, PropTypes } from 'react';
import Chat from 'components/Chat';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../../modules/chat';

const socket = io('', { path: '/api/chat' });
const initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit

class ChatContainer extends Component {
  componentWillMount() {
    // const { dispatch, user } = this.props;
    // dispatch(actions.fetchMessages(initialChannel));
    // dispatch(actions.fetchChannels(user.username));
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}

// ChatContainer.propTypes = {
//   // messages: PropTypes.array.isRequired,
//   // user: PropTypes.object.isRequired,
//   // dispatch: PropTypes.func.isRequired,
//   // channels: PropTypes.array.isRequired,
//   // activeChannel: PropTypes.string.isRequired,
//   // typers: PropTypes.array.isRequired
// }


