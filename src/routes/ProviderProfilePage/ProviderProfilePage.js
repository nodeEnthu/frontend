import React from 'react';
import ProviderProfile from 'components/ProviderProfile'

const ProviderProfilePage = React.createClass({
	getInitialState() {
	    return {
	          
	    };
	},
    render() {
        return (
            <div style={{position:'relative'}}>
  	        	<ProviderProfile {... this.props}
                                actionName="PROVIDER"
              />
	      	</div>
        );
    }
});
ProviderProfile.propTypes = {
  fetchMayBeSecuredData:React.PropTypes.func,
  providerProfile:React.PropTypes.object,
  updateCheckedOutQty:React.PropTypes.func,
  deleteCheckedOutItem:React.PropTypes.func,
  globalState:React.PropTypes.object,
  postSecuredData:React.PropTypes.func,
  openLoginModal:React.PropTypes.func,
  openModal:React.PropTypes.func,
  flushOutStaleReviewData:React.PropTypes.func
}
export default ProviderProfilePage;
