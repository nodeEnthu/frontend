import React, { Component } from 'react';
import Chat from 'components/Chat';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../../modules/chat';
import PropTypes from 'prop-types';

const socket = io('', { path: '/api/chat' });
const initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit

export default class ChatContainer extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}

ChatContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
}


