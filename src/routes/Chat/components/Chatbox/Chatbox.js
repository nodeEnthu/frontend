import React, { Component } from 'react';
import Chat from 'components/Chat';
import { connect } from 'react-redux';
import * as actions from '../../modules/chat';
import PropTypes from 'prop-types';
console.log(Primus);
export default class ChatContainer extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <Chat {...this.props}/>
    );
  }
}

ChatContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
}


