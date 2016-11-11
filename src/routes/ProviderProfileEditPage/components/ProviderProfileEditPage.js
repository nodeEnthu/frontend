import React from 'react';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm';
import classes from './providerProfileEditPage.scss'

const ProviderProfileEditPage = React.createClass({
	render(){
		return(
			<div className={classes["pageSettings"]}>
				<ProviderEntryForm {... this.props}/>
			</div>
			)
	}
})
export default ProviderProfileEditPage;
