import React, { Component } from 'react';
import Chat from 'components/Chat';
import { connect } from 'react-redux';
import * as actions from '../../modules/chat';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class'

const ChatContainer =  createReactClass({
	getInitialState() {
		return{
		}
	},
	
	render() {
	    return <Chat/>
			    
	}
});

ChatContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  globalState:PropTypes.object.isRequired
}

export default ChatContainer;
