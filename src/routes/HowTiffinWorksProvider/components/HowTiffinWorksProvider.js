// Libs
import React from 'react';
import { Link, IndexLink } from 'react-router';
import './howTiffinWorksProvider.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from 'layouts/CoreLayout/coreReducer';
import {Helmet} from "react-helmet";

const HowTiffinWorksProvider = createReactClass({
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
          case 'viewJobBoard':
            this.context.router.push('/job/apply/board') ;
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
                <title>Home chefs provide tiffin service</title>
                <meta name="description" content="Home chefs fulfil tiffin needs of your neighbours" />
                <meta name="keywords" content="fulfil tiffin needs, provide dabba service"/>
            </Helmet>
            <div className="ban-smal">
              <div className="wraper-container">
                Home chefs start providing <span>tiffin</span> service
              </div>
              <div className="get-started-button">
                <RaisedButton style={{fontSize:'14px'}} label="Your job board"
                            onClick={() =>this.checkLoginAndredirect('viewJobBoard')}
                            disableTouchRipple = {true}
              />
              </div>
            </div>
            <div className="how-se">
              <div className="wraper-container">  
                <div className="pure-u-1 pure-u-md-1-3">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinProvider/view.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>View Invitations & <span>Jobs</span></h4>
                        <p>Browse your job board to see invitations and tiffin requirements closeby</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-md-1-3">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinProvider/job.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Apply <span> </span></h4>
                        <p>Write brief description of how you can fulfil customer&#39;s tiffin requirement and apply</p>
                      </div>            
                    </div>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-md-1-3">
                  <div className="how-col">
                    <div className="how-bxx">
                      <div className="how-pic">
                      <img src="/shared/tiffinProvider/employee.png"/>
                      </div>
                      
                      <div className="how-pic-cont">
                        <h4>Get Hired <span></span></h4>
                        <p>Customer&#39;s selects you for their tiffin requirement and you have their contact information to get started</p>
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

export default HowTiffinWorksProvider;
