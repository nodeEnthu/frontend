import React from 'react'
import classes from './foodItemEditPage.scss'
import RaisedButton from 'material-ui/RaisedButton'
import FoodEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm';

const FoodItemEditPage = React.createClass({
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
				<div style={{textAlign:'center'}}>
					<FoodEntryForm 	foodItemEntryForm = {this.props.foodItemEntryForm}
									onAllClear = {this.onAllClear}
									fetchData = {this.props.fetchData}
									addFoodItemInfo = {this.props.addFoodItemInfo}
									removeFoodItemInfo = {this.props.removeFoodItemInfo}
									params={this.props.params}
					/>
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
FoodItemEditPage.propTypes={
    foodItemEntryForm:React.PropTypes.object.isRequired,
	fetchData:React.PropTypes.func.isRequired,
    addFoodItemInfo:React.PropTypes.func.isRequired,
    removeFoodItemInfo:React.PropTypes.func.isRequired
}
export default FoodItemEditPage;
