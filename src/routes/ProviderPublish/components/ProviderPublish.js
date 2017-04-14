import React from 'react'
import './providerPublish.scss'
import ProviderProfile from 'components/ProviderProfile'
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';

const Provider = React.createClass ({
  render() {
    const {user} = this.props.globalState.core.toJS();
    return <ProviderProfile   params = {{id:user._id}}
                              providerProfile = {this.props.providerPublish}
                              globalState = {this.props.globalState}
                              fetchMayBeSecuredData = {this.props.fetchMayBeSecuredData}
                              actionName = {"PROVIDER_ENTRY"}
                              mode = {"PROVIDER_ENTRY"} 
            />
  }
})

Provider.propTypes= {
    globalState:React.PropTypes.object,
    fetchData:React.PropTypes.func,
    fetchSecuredData:React.PropTypes.func,
    providerPublish:React.PropTypes.object,
    fetchMayBeSecuredData:React.PropTypes.func
  };
export default Provider;