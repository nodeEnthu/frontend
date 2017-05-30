import React from 'react';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm';
import './providerProfileEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';


const ProviderProfileEditPage = React.createClass({
	render(){
		return(<ProviderEntryForm 	{... this.props} 
					mode = {"PROVIDER_PROFILE_EDIT"}
                	params = {{id:this.props.params.id}}
                	nextLabel={"SAVE CHANGES"}
                	linkToRedirectOnAllClear={"/providerProfile/"+this.props.params.id}
				/>
			)
	}
})
ProviderProfileEditPage.propTypes={
	
}
export default ProviderProfileEditPage;
