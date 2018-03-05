// Libs
import React from 'react';
import { Link, IndexLink } from 'react-router';
import './howTiffinWorksCustomer.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from 'layouts/CoreLayout/coreReducer'
import {Helmet} from "react-helmet";

const HowTiffinWorksCustomer = createReactClass({
    componentDidMount() {
    },
    contextTypes: {
      router: PropTypes.object.isRequired
    },
    checkLoginAndredirect(action){
      const {user} = this.props.globalState.core.toJS();
      // user is logged in
      if (user && user._id){
        switch(action){
          case 'postTiffinRequirement':
            this.context.router.push('/job/create') ;
            break;
        }
      }
      else{
        this.props.dispatch(actions.postLoginUrlRedirect(action));
        this.props.dispatch(actions.openLoginModal());
      }
      this.setState({leftNavOpen:false});
    },
    render: function() {
        return (
          <div className="home">
            <Helmet>
                <title>Post your tiffin needs</title>
                <meta name="description" content="Post your tiffin needs and hire home chefs" />
                <meta name="keywords" content="tiffin, dabba, want tiffin service"/>
            </Helmet>
            <div className="ban-smal">
              <div className="wraper-container">
                Post your <span>tiffin need</span> and hire home chefs right away!
              </div>
              <div className="get-started-button">
                <RaisedButton style={{fontSize:'14px'}} label="Get started"
                              onClick={() => this.checkLoginAndredirect('postTiffinRequirement')}
                              disableTouchRipple = {true}

                />
              </div>
            </div>
            
            <div className="how-se">
              <div className="wraper-container">  
                <div className="pure-u-1 pure-u-lg-1-4 pure-u-md-1-2">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinCustomer/briefcase.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Tiffin  <span>need</span></h4>
                        <p>Fill up a simple form listing your tiffin need and get started</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-lg-1-4 pure-u-md-1-2">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinCustomer/waiter.png"/>
                      </div>
                      <div className="how-pic-cont">
                        <h4>INVITE   <span> PROVIDERS</span></h4>
                        <p>Invite home chefs close to you from the list we provide. Providers can also search for tiffin requirements close to them and send proposals</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-lg-1-4 pure-u-md-1-2">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinCustomer/user.png"/>
                      </div>
                      <div className="how-pic-cont">
                        <h4>View  <span>Proposals</span></h4>
                        <p> View all the proposals for your job listing</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-lg-1-4 pure-u-md-1-2">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinCustomer/job-1.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Hire  <span></span></h4>
                        <p>Hire the home chef and contact them. At this point, chef gets your contact number to start communication process</p>
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

HowTiffinWorksCustomer.propTypes={
  globalState: PropTypes.object,
  dispatch:PropTypes.func
}
export default HowTiffinWorksCustomer;
