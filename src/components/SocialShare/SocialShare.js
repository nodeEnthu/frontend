import React from 'react';
import './socialShare.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import SocialShared from 'components/SocialShare';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';
const {FacebookShareButton, GooglePlusShareButton,TwitterShareButton, WhatsappShareButton} = ShareButtons;
const SocialShareSS = createReactClass({
  getInitialState() {
    return({
      link:this.props.link
    });
  },
  render(){
    const {link} = this.state;
    return(
      <div style={{display:'block', textAlign:'center'}}>
        <FacebookShareButton
          url={link}
          quote={"home cooking passion"}
          style={{display:'inline-block'}}
        >
          <a href={link} className="icon-button facebook">
            <i className="fa fa-facebook icon-facebook" aria-hidden="true"></i><span></span>
          </a>
        </FacebookShareButton>
        <WhatsappShareButton
          url={link}
          title={"home cooking passion"}
          separator=": "
          style={{display:'inline-block'}}
        >
          <a href={link} className="icon-button whatsapp">
            <i className="fa fa-whatsapp icon-whatsapp" aria-hidden="true"></i><span></span>
          </a>
        </WhatsappShareButton>
        <TwitterShareButton
            url={link}
            title={"home cooking passion"}
            style={{display:'inline-block'}}
        >
          <a href={link} className="icon-button twitter">
            <i className="fa fa-twitter icon-twitter" aria-hidden="true">
            </i><span></span>
          </a>
        </TwitterShareButton>
        <GooglePlusShareButton
          url={link}
          style={{display:'inline-block'}}
          title={"home cooking passion"}
        >
          <a href={link} className="icon-button google-plus">
            <i className="fa fa-google-plus icon-google-plus" aria-hidden="true"></i><span></span>
          </a>
        </GooglePlusShareButton>
      </div>
      )
  }
})

SocialShareSS.propTypes = {
  link:PropTypes.string
}

export default SocialShareSS;