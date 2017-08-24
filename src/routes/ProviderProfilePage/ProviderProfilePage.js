import React from 'react';
import ProviderProfile from 'components/ProviderProfile'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const ProviderProfilePage = createReactClass({
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
  fetchMayBeSecuredData:PropTypes.func,
  providerProfile:PropTypes.object,
  updateCheckedOutItem:PropTypes.func,
  deleteCheckedOutItem:PropTypes.func,
  alreadyScrolled:PropTypes.func,
  globalState:PropTypes.object,
  postSecuredData:PropTypes.func,
  openLoginModal:PropTypes.func,
  openModal:PropTypes.func,
  flushOutStaleReviewData:PropTypes.func,
}
export default ProviderProfilePage;
