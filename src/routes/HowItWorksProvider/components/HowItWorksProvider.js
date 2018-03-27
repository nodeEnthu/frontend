// Libs
import React from 'react';
import { Link, IndexLink } from 'react-router';
import './howItWorksProvider.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from 'layouts/CoreLayout/coreReducer'
import {postCall} from 'utils/httpUtils/apiCallWrapper';
import {Helmet} from "react-helmet";

const HowItWorksProvider = createReactClass({
    componentDidMount() {
    },
    contextTypes: {
      router: PropTypes.object.isRequired
    },
    componentDidMount() {
      // check for the promotion
      let refId = this.context.router.location.query.refId;
      if(refId){
        postCall('/api/providers/analytics/provider/promo/click',{refId:refId});
      }
    },
    checkLoginAndredirect(action){
      const {user} = this.props.globalState.core.toJS();
      if (user && user._id){
        switch(action){
          case 'providerProfileEntry':
            this.context.router.push('/provider/'+user._id+'/providerProfileEntry'+ this.context.router.location.search) ;
            break;
          default:
            break;
        }
      }
      else{
        this.props.dispatch(actions.postLoginUrlRedirect(action));
        this.props.dispatch(actions.openLoginModal());
      }
    },
    render: function() {
        return (
          <div className="home">
            <Helmet>
                <title>Become a home chef</title>
                <meta name="description" content="Become a home chef and provide healthy food to your neighbours" />
                <meta name="keywords" content="provide home cooked food, become home chef, provide tiffin service"/>
            </Helmet>
            <div className="ban-smal">
              <div className="wraper-container">
                <h1>Become a home chef and start providing food to your <span>neighbours</span></h1>
              </div>
              <div className="get-started-button">
                <RaisedButton style={{fontSize:'14px'}} label="Become a home chef"
                            onClick={() =>this.checkLoginAndredirect('providerProfileEntry')}
                            disableTouchRipple = {true}
              />
              </div>
            </div>
            <div className="reco-text">
              <div>
                <span>We are excited</span> for you to join our close knit community of home chefs. 
                A place where you can sell healthy home cooked food to your neighbours for <span>free and retain 100% of your earnings</span>.
                Here are some pointers to get the most out of our platform.
              </div>
              <ol className="list-numbered">
                <li>Deliver food atleast within <span>1km radius</span>. Most customers want home delivery</li>
                <li>Provide accurate pictures of you/your business and food items </li>
                <li>Provider phone number while enrolling</li>
                <li>Be quick in taking actions on orders you receive (you will get a sms)</li>
                <li>Regularly check job board (tiffin needs from customers closeby)</li>
              </ol>
            </div>
            <div className="how-se">
              <h2>Enroll in <span>3 steps</span></h2>
              <div className="wraper-container">  
                <div className="pure-u-1 pure-u-md-1-3">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/home/chef.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Create <span>Profile</span></h4>
                        <p>Provide information about your business to get started</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-md-1-3">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/home/rice.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Add<span> food items </span></h4>
                        <p>Tell us about the food items you want to provide</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-md-1-3">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/home/thumb-up.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Preview<span> & publish</span></h4>
                        <p>Review your information and click publish to go live. You are now ready to receive orders</p>
                      </div>            
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        );
    }
});

export default HowItWorksProvider;
