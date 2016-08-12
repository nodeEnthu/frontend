import React from 'react';
import ProviderProfile from 'components/ProviderProfile'

const ProviderProfilePage = React.createClass({
    render() {
        return (
            <div>
	        	<ProviderProfile{... this.props}/>
	      	</div>
        );
    }
});

export default ProviderProfilePage;
