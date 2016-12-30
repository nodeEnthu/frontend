import React from 'react';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm';
import './providerProfileEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';


const ProviderProfileEditPage = React.createClass({
	submitForm(){
		this.props.showHideSpinner({storeKey:'providerEntrySpinner',payload:true});
		this.refs.providerform.formSubmit();
	},
	contextTypes: {
        router: React.PropTypes.object.isRequired
    },
	onAllClear(){
		this.props.showHideSpinner({storeKey:'providerEntrySpinner',payload:false});
		this.context.router.goBack();
	},
	render(){
		const {providerEntrySpinner} = this.props.spinner.toJS();
		return(
			<div className="pageSettings">
				<ProviderEntryForm 	ref="providerform"
									{... this.props} 
									onAllClear = {this.onAllClear}
									mode = {"PROVIDER_PROFILE_EDIT"}
									showHideSpinner={this.props.showHideSpinner}
									spinner={this.props.spinner}
				/>
				<div style={{textAlign:'center'}}>
					<RaisedButton
						style={{width:'30%',color:'white'}}
						primary={true}
						onClick={this.submitForm}
						disabled={providerEntrySpinner}
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
	showHideSpinner:React.PropTypes.func,
	spinner:React.PropTypes.object
}
export default ProviderProfileEditPage;
