import React from 'react';
import Phone, {formatPhoneNumber, parsePhoneNumber, isValidPhoneNumber} from 'react-phone-number-input'
import './phoneVerification.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import CheckMark from 'components/CheckMark'
import RaisedButton from 'material-ui/RaisedButton';
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';

const PhoneVerification = createReactClass({
  getInitialState() {
    return{
      phoneNumberValid:false,
      showVerificationSpinner:false,
      showAuthSpinner:false,
      showVerificationCodeInputBox:false,
      verificationSuccess:false,
      verificationFail:false
    }
  },
  changePhoneNumber(value){
      this.props.changePhoneAttr({storeKey:'phone', payload:value});
      let isValid = isValidPhoneNumber(value);
      this.setState({phoneNumberValid:isValid});
      if(isValid){
          this.props.changePhoneAttr({storeKey:'phoneErrorMsg', payload:null});
      }else{
          this.props.changePhoneAttr({storeKey:'phoneErrorMsg', payload:'Please enter valid number'});
      }
  },
  changeCodeVal(value){
    this.props.changePhoneAttr({storeKey:'code', payload:value});
  },
  sendAuthCode(){
      let self = this;
      let {phoneNumberValid} = this.state;
      let {phone}= this.props;
      let ino = formatPhoneNumber( parsePhoneNumber( phone ), 'International' );
      if(phoneNumberValid){
          this.setState({showVerificationSpinner:true});
          securedPostCall('/api/message/send/code/provider',{phone:ino})
              .then(function(response){
                  if(response.data.status === 'ok'){
                      self.setState({showVerificationCodeInputBox:true, showVerificationSpinner:false});
                  }
              })
      }
  },
  verifyAuthCode(){
      let self = this;
      let {code, phone, verified}= this.props;
      this.setState({showAuthSpinner:true});
      securedPostCall('/api/message/verify/code',{code:code, phone:phone})
          .then(function(response){
              self.setState({showVerificationCodeInputBox:false, showAuthSpinner:false});
              if(response.data.status === 'ok'){
                  self.setState({verificationSuccess:true});
                  self.props.changePhoneAttr({storeKey:'verified', payload:true});
              }else self.setState({verificationFail:true});
          })
     
  },
  resetPhoneVerification(){
      this.setState({showSpinner:false,
          phoneNumberValid:false,
          showVerificationSpinner:false,
          showAuthSpinner:false,
          showVerificationCodeInputBox:false,
          verificationSuccess:false,
          verificationFail:false}
      );
  },
  render(){
    let {phone, phoneErrorMsg,code,verified} = this.props;
    let {phoneNumberValid,showAuthSpinner, showVerificationSpinner, showVerificationCodeInputBox, verificationSuccess, verificationFail} = this.state;
    return(
      <div>
        <div className="pure-u-1">
          <Phone
              country="IN"
              placeholder="phone number"
              value={phone}
              disabled={verificationSuccess || showVerificationCodeInputBox}
              onChange={ value => this.changePhoneNumber(value) }
          />
           {/*<div className = "error-message">{(phoneErrorMsg)?'*'+phoneErrorMsg:undefined}</div>*/}
        </div>
      {
        (!showVerificationSpinner && !showVerificationCodeInputBox && !showAuthSpinner && !verificationSuccess && !verificationFail && !verified)?
        <div className="pure-u-1 is-center">
            <RaisedButton 
                label="Send me the phone verification code"
                backgroundColor="#FF6F00"
                labelStyle={{color:'white'}}
                onTouchTap={this.sendAuthCode}
                disableTouchRipple={true}
                disabled={!phoneNumberValid}
                disabledLabelColor="darkgrey"
            />
        </div>
        :undefined
      }
      {
        (showVerificationSpinner)?
        <div className="display-inline" style={{position:'relative'}}>
            <img style={{position: 'relative', width: '24px', top:'5px', left:'5px'}}src= "/general/loading.svg"/>
        </div>
        :
        undefined
      }
        <div className="pure-u-1">
          {
              (showVerificationCodeInputBox && !verificationSuccess && !verificationFail)?
              <div className="display-inline codebox">
                  <input type="text" name="code" placeholder="4 digit code" value={code || ''}
                      onChange={(e)=>this.changeCodeVal(e.target.value)}
                  />
              </div>
              :
              undefined
          }

          {
            (!showVerificationSpinner && showVerificationCodeInputBox && !showAuthSpinner && !verificationSuccess && !verificationFail)?
              <RaisedButton 
                  label="verify"
                  backgroundColor="#FF6F00"
                  labelStyle={{color:'white'}}
                  style={{marginLeft:'1em', display:'inline-block'}}
                  onTouchTap={this.verifyAuthCode}
                  disableTouchRipple={true}
                  disabled={!phoneNumberValid}
                  disabledLabelColor="darkgrey"
              />
            :
            undefined
          }
          {
            (showAuthSpinner && !verificationSuccess && !verificationFail)?
            <div className="display-inline" style={{position:'relative'}}>
                <img style={{position: 'relative', width: '24px', top:'5px', left:'5px'}}src= "/general/loading.svg"/>
            </div>
            :
            undefined
          }
          {
            (verificationSuccess)?
            <div style={{position:'relative'}}>
              <CheckMark style={{width:'5%',minWidth:'35px', display:'inline-block'}}/>
              <span style={{position:'absolute', top:'10px'}}>Your phone number is verified</span>
            </div>
            :
            undefined
          }
          {
            (verificationFail)?
            <div style={{position:'relative'}}>
                <span>Sorry! wrong code</span>
                <div className="display-inline">
                    <RaisedButton 
                        label="Try again"
                        backgroundColor="#FF6F00"
                        labelStyle={{color:'white'}}
                        style={{marginLeft:'3em'}}
                        onTouchTap={this.resetPhoneVerification}
                        disableTouchRipple={true}
                    />
                </div>
            </div>
            :
            undefined
          }
        </div>
      </div>
    )
  }
})

PhoneVerification.propTypes = {
  
}

export default PhoneVerification;