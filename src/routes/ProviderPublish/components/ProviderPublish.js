import React from 'react'
import './providerPublish.scss'
import ProviderProfile from 'components/ProviderProfile'
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import Stepper from 'components/Stepper'
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from 'layouts/CoreLayout/coreReducer';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const Provider = createReactClass ({
  getInitialState() {
    return {
      showSpinner:false
    }
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  publishProvider(){
    let self = this;
    const {user} = this.props.globalState.core.toJS();
    this.setState({showSpinner:true})
    securedPostCall('/api/providers/publish',{_creator:user._id})
      .then(function(res){
        if(res && res.data && res.data.status ==='ok'){
          self.setState({showSpinner:false});
          // refresh the page and the on Enter hook should automatically default it to the profile page
          // ... no.. I dont think thats a hack
          // this will make a call to get providers profile and store will be updated with most updated information
          window.location.reload();
        }
      })
  },
  render() {
    const {user} = this.props.globalState.core.toJS();
    return <div className="provider-publish">
              <Stepper
                steps={[{label:'Profile'},{label:'Food'},{label:'Publish'}]}
                activeStep={3}
              >
              </Stepper>
              <div className="is-center">
                <div style={{display:(this.state.showSpinner)?'block':'none'}}>
                    <img src= "/general/loading.svg"/>
                </div>
                <RaisedButton
                  label={"Publish"}
                  style={{width:'25%',marginBottom:"1em"}}
                  backgroundColor="#FF6F00"
                  labelStyle={{color:'white'}}
                  onTouchTap={this.publishProvider}
                  disableTouchRipple={true}
                />
              </div>
              <ProviderProfile   params = {{id:user._id}}
                              providerProfile = {this.props.providerPublish}
                              globalState = {this.props.globalState}
                              fetchMayBeSecuredData = {this.props.fetchMayBeSecuredData}
                              actionName = {"PROVIDER_ENTRY"}
                              mode = {"PROVIDER_ENTRY"} 
              />

          </div>
  }
})

Provider.propTypes= {
    globalState:PropTypes.object,
    fetchData:PropTypes.func,
    fetchSecuredData:PropTypes.func,
    providerPublish:PropTypes.object,
    fetchMayBeSecuredData:PropTypes.func,
    dispatch:PropTypes.func
  };
export default Provider;