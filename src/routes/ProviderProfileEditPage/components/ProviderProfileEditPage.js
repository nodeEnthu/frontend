import React from 'react';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm';
import './providerProfileEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';


const ProviderProfileEditPage = React.createClass({
	submitForm(){
		this.refs.providerform.formSubmit();
	},
	contextTypes: {
        router: React.PropTypes.object.isRequired
    },
	onAllClear(){
		this.context.router.goBack();
	},
	render(){
		return(
			<div className="pageSettings">
				<ProviderEntryForm 	ref="providerform"
									{... this.props} 
									onAllClear = {this.onAllClear}
									mode = {"PROVIDER_PROFILE_EDIT"}
				/>
				<div style={{textAlign:'center'}}>
					<RaisedButton
						style={{width:'30%',color:'white'}}
						primary={true}
						onClick={this.submitForm}
						disableTouchRipple={true} 
					>
						Done
					</RaisedButton>
				</div>
			</div>
			)
	}
})
ProviderProfileEditPage.propTypes={

}
export default ProviderProfileEditPage;
