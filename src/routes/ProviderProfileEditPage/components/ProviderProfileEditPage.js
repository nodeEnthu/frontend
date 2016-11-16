import React from 'react';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm';
import classes from './providerProfileEditPage.scss';
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
			<div className={classes["pageSettings"]}>
				<ProviderEntryForm 	ref="providerform"
									{... this.props} 
									onAllClear = {this.onAllClear}
									mode = {"editMode"}
				/>
				<div style={{textAlign:'center'}}>
					<RaisedButton
						style={{width:'30%',color:'white'}}
						primary={true}
						onClick={this.submitForm} 
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
