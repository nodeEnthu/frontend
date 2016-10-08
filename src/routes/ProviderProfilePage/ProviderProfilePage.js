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
	        	<ProviderProfile{... this.props}/>
	      	</div>
        );
    }
});
ProviderProfile.propTypes = {
  fetchMayBeSecuredData:React.PropTypes.func.isRequired,
  providerProfile:React.PropTypes.object.isRequired
}
export default ProviderProfilePage;
