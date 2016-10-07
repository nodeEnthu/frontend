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

export default ProviderProfilePage;
