import React from 'react';
import ProviderProfile from 'components/ProviderProfile'

const ProviderProfilePage = React.createClass({
	getInitialState() {
	    return {
	          
	    };
	},
    render() {
        return (
            <div>
	        	<ProviderProfile {... this.props}
                              actionName="PROVIDER"
            />
	      	</div>
        );
    }
});
ProviderProfile.propTypes = {
  fetchMayBeSecuredData:React.PropTypes.func.isRequired,
  providerProfile:React.PropTypes.object.isRequired,
  updateCheckedOutQty:React.PropTypes.func.isRequired,
  deleteCheckedOutItem:React.PropTypes.func.isRequired,
  globalState:React.PropTypes.object.isRequired,
  postSecuredData:React.PropTypes.func.isRequired,
  openLoginModal:React.PropTypes.func.isRequired,
  openModal:React.PropTypes.func.isRequired
}
export default ProviderProfilePage;
