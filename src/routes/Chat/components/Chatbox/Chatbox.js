import React, { Component } from 'react';
import Chat from 'components/Chat';
import { connect } from 'react-redux';
import * as actions from '../../modules/chat';
import PropTypes from 'prop-types';
import Script from 'react-load-script'
import createReactClass from 'create-react-class'

const ChatContainer =  createReactClass({
	getInitialState() {
		return{
			scriptLoaded: false
		}
	},
	actionheroClient:undefined,
	handleScriptLoad(){
		this.actionheroClient = new ActionheroClient;
		this.setState({ scriptLoaded: true });
	},
	render() {
		let {scriptLoaded} = this.state;
	    return (
	    	<div>
		    	<Script 
			        url="api/chat/static/actionheroClient"
			        onCreate={this.handleScriptCreate}
			        onError={this.handleScriptError}
			        onLoad={this.handleScriptLoad}
			     />
			    {
			    	(scriptLoaded)?
			    	<Chat {...this.props} client={this.actionheroClient}/>
			    	:
			    	undefined
			    }
		    </div>
	    );
	}
});

ChatContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  globalState:PropTypes.object.isRequired
}

export default ChatContainer;
