import React from 'react';
import './phoneVerification.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const PhoneVerification = createReactClass({
  render(){
    return(
        <div id="wrapper">
          <div id="dialog">
            <button className="close">×</button>
            <h3>Please enter the 4-digit verification code we sent via SMS:</h3>
            <span>we want to make sure its you before we contact our movers</span>
            <div id="form">
              <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
              <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" /><input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" /><input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
              <button className="btn btn-primary btn-embossed">Verify</button>
            </div>
            <div>
              Didnt receive the code?<br />
              <a href="#">Send code again</a><br />
              <a href="#">Change phone number</a>
            </div>
             <img src="http://jira.moovooz.com/secure/attachment/10424/VmVyaWZpY2F0aW9uLnN2Zw==" alt="test" />
          </div>
        </div>
      )
  }
})

PhoneVerification.propTypes = {
  
}

export default PhoneVerification;