import React from 'react'
import './foodItemEditPage.scss'
import RaisedButton from 'material-ui/RaisedButton'
import FoodEntryForm from 'components/FoodItemEntryForm/FoodItemEntryForm';

const FoodItemEditPage = React.createClass({
	submitForm(){
		this.refs.foodItemEntryForm.formSubmit();
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
				<div>
					<FoodEntryForm 	foodItemEntryForm = {this.props.foodItemEntryForm}
									onAllClear = {this.onAllClear}
									fetchData = {this.props.fetchData}
									addFoodItemInfo = {this.props.addFoodItemInfo}
									removeFoodItemInfo = {this.props.removeFoodItemInfo}
									params={this.props.params}
									ref="foodItemEntryForm"
									mode = {"editMode"}
					/>
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
FoodItemEditPage.propTypes={
    foodItemEntryForm:React.PropTypes.object.isRequired,
	fetchData:React.PropTypes.func.isRequired,
    addFoodItemInfo:React.PropTypes.func.isRequired,
    removeFoodItemInfo:React.PropTypes.func.isRequired
}
export default FoodItemEditPage;