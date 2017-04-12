import React, { Component, PropTypes } from 'react';
import './fooditementryform.scss';
import { email, maxLength, required, regexTime, regexDate } from 'utils/formUtils/formValidation';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import classNames from 'classnames';
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import { securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { DATES, CUISINE_TYPES,DIET_TYPES} from 'routes/Search/constants/searchFilters';
import {daysOfTheWeek,timeOfDay} from './constants';
import ImageUploader from 'components/ImageUploader'
import s3ImageUpload from 'utils/uploader/s3ImageUpload';
import moment from 'moment';
import * as actions from 'layouts/CoreLayout/coreReducer';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';



const maxCount = 100;

const FoodItemEntryForm= React.createClass({
    componentDidMount() {
        if(this.props.params.foodId){
            this.props.fetchData('/api/foodItem/'+this.props.params.foodId , 'foodItemCall','FOOD_ITEM')
        }
    },
    mapFieldsToValidationType:{
        name: required,
        placeOrderBy: required,
        cuisineType: required,
        price:required
    },
    addTimeOffset(orignalDate){
        return new Date(orignalDate.getTime()+orignalDate.getTimezoneOffset()*60000) ;
    },

    changeStoreTimeAndDateVals(date, storeKey,isInputChecked){
        let {availability,oneTime} = this.props.foodItemEntryForm.toJS();
        availability = availability || [];
        if(!isInputChecked){
            availability.splice(availability.indexOf(date),1);
        }
        else{
            if(availability.indexOf(date) === -1) { availability.push(date);}
        }
        // completely overwrite whats in store
        this.props.addFoodItemInfo({storeKey: storeKey,payload: availability});
    },

    daysBeforeOrderDate(referenceDate,days){
        return moment(referenceDate).subtract(days, "days").toDate();
    },
    handleChange(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        let validation = this.mapFieldsToValidationType[stateKeyName];
        let errorMsg;
        
        if (validation) {
            errorMsg = validation(input);
        }
        if (errorMsg) {
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.props.addFoodItemInfo({
                storeKey: errorMsgkey,
                payload: errorMsg
            });
        } else {
            this.props.addFoodItemInfo({
                storeKey: stateKeyName,
                payload: input
            })
        }
    },
    toggle(stateKeyName,val) {
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: val
        })
    },
    handleFocus(event) {
        let stateKeyName = event.target.name;
        if (stateKeyName) {
            // clear the error msg if it exists
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.props.addFoodItemInfo({
                storeKey: errorMsgkey,
                payload: null
            });
        }
    },
    setCount(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.setState({
            description: input,
            chars_left: maxCount - input.length
        })
        this.addFoodItemInfo.providerEntryForm.chars_left = maxCount - input.length; // hacky again
        this.addFoodItemInfo.providerEntryForm.description = input; // hacky again
    },
    changeStoreVal(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: input
        });
    },
    validateForm() {
        let self = this;
        let noErrorsInform = true;
        for (let key in this.mapFieldsToValidationType) {
            if (this.mapFieldsToValidationType.hasOwnProperty(key)) {
                let errorMsg = this.mapFieldsToValidationType[key](this.props.foodItemEntryForm.get(key));
                //console.log(errorMsg + '  for key: ' + key + '  whose value is ' + this.props.foodItemEntryForm.get(key));
                if (errorMsg) {
                    noErrorsInform = false;
                    let errorStateKey = [key] + 'ErrorMsg';
                    self.props.addFoodItemInfo({
                        storeKey: errorStateKey,
                        payload: errorMsg
                    })
                }
            }
        }
        return noErrorsInform;
    },
    onImageChange(blob,imgUrl,fileConfig){
        this.props.addFoodItemInfo({
            storeKey:'imgChanged',
            payload:true
        });
        this.props.addFoodItemInfo({
            storeKey:'imgUrl',
            payload:imgUrl
        });
        this.setState({imgBlob:blob, fileConfig:fileConfig});
    },
    formSubmit() {
        if (this.validateForm()) {
            let self = this;
            this.props.showHideSpinner({storeKey:'foodItemEntrySpinner',payload:true});
            let reqBody =this.props.foodItemEntryForm.toJS();
            if (reqBody.imgChanged) {
                this.props.addFoodItemInfo({
                    storeKey:'imgChanged',
                    payload:false
                });
                // upload and assume its gonna pass
                s3ImageUpload(this.state.fileConfig,this.state.imgBlob,function(){
                    self.submitFoodItem()
                        .then(()=>{
                                    self.props.onAllClear(); 
                                    self.props.removeFoodItemInfo();
                                }
                            );
                });
            }else{
                this.submitFoodItem()
                    .then(()=>self.props.onAllClear());  
            }
            
        }
    },
    submitFoodItem(addAnother) {
        let result = false;
        let self = this;
        let requestBody=this.props.foodItemEntryForm.toJS();
        let submitFoodItem= true;
        if(addAnother){
            submitFoodItem = this.validateForm();
        }
        // send it to server and clear out some of the item specific info
        if(this.props.mode ==="PROVIDER_ENTRY"){
            requestBody.publishStage=2;
        }
        if(submitFoodItem){
            return securedPostCall('/api/providers/addOrEditFoodItem', requestBody)
                .then(function(response) {
                    // if its a provider entry stage 
                    if(self.props.mode ==="PROVIDER_ENTRY"){
                        self.props.dispatch(actions.userFoodItemUpdate(response.data._id));
                    }
                    // delete all the prior information
                    self.props.removeFoodItemInfo();
                    //scroll to the top
                    window.scrollTo(0, 23);
                })
        }
    },
    render() {
        let self = this;
        let { name,imgUrl,nameErrorMsg, description, cuisineType,cuisineTypeErrorMsg, price,priceErrorMsg,descriptionErrorMsg,availability, placeOrderBy, placeOrderByErrorMsg, pickUpStartTime, pickUpEndTime, organic, vegetarian, glutenfree, lowcarb, vegan, nutfree, oilfree, nondairy, indianFasting} = this.props.foodItemEntryForm.toJS();
        placeOrderBy = (placeOrderBy)? new Date(placeOrderBy): new Date();
        console.log(availability);
        return (
            <div className="food-item-entry">
                <div className="is-center">
                    <ImageUploader
                        onImageChange = {this.onImageChange}
                        initialImgUrl={imgUrl}
                        onImageUploadStart = {this.onImageUploadStart}
                    />
                </div>
                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <div>
                            <input type="text"  className="pure-u-1" placeholder="*title" name="name" value={name}
                                onChange={this.changeStoreVal}
                                onBlur={this.handleChange} 
                                onFocus={this.handleFocus}
                            />
                            <span className = "error-message">{(nameErrorMsg)?'*'+nameErrorMsg:undefined}</span>
                            <textarea className = "pure-u-1" name="description" placeholder="description" value={description}
                                onBlur={this.handleChange} 
                                onFocus={this.handleFocus} 
                                onChange={this.changeStoreVal}
                            >   
                            </textarea>
                            <span className = "error-message">{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</span>
                            <div  className="pure-u-1 pure-u-md-1-2">
                                <label>*Cuisine-type</label>
                                <select id="cuisine-type" 
                                    placeholder="Cuisine type"
                                    name="cuisineType"
                                    className="width-max"
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                    onChange={this.changeStoreVal}
                                    value={cuisineType}
                                >
                                    <option value=''></option>
                                    {CUISINE_TYPES.map((cuisine)=>{
                                        return <option key={cuisine.value}>{cuisine.value}</option>
                                    })}

                                </select>
                                <span className = "error-message">{(cuisineTypeErrorMsg)?'*'+cuisineTypeErrorMsg:undefined}</span>
                            </div>
                            <div className="pure-u-1 pure-u-md-1-2">
                                <label>*Price</label>
                                <input type="text"  placeholder="*price" name="price" value={price}
                                    className="width-max"
                                    onChange={this.changeStoreVal}
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                />
                                <span className = "error-message">{(priceErrorMsg)?'*'+priceErrorMsg:undefined}</span>
                            </div>
                            <legend></legend>
                            <div className="pure-u-1">
                                <label>Select date(s)</label>
                                {DATES(8,"dd, MMM D",'add').map(function(date,index){
                                                return <div key={index} className="pure-u-1-3 pure-u-md-1-6" style={{paddingBottom : '0.25em'}}>
                                                        <div className="parent-box">
                                                                <div className="child-box-1">
                                                                    {date.title}
                                                                </div>
                                                                <div className="child-box-2">
                                                                    <Checkbox
                                                                        onCheck={(event,isInputChecked)=>self.changeStoreTimeAndDateVals(date.value, 'availability',isInputChecked)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                            })}
                                
                            </div>
                           
                          
                            <div className = "pure-u-1 pure-u-md-1-2">
                                <label>Pick-up start time (hh:mm)</label>
                                <select
                                    placeholder="pick-up start time"
                                    type="text"
                                    name="pickUpStartTime"
                                    className="width-max"
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                    onChange={this.changeStoreVal}
                                    value={pickUpStartTime}
                                >
                                    <option value=''></option>
                                    {timeOfDay().map(function(time,index){
                                        return <option key={index} value={time.value}>{time.label}</option>
                                    })}
                                </select>
                            </div>
                            <div className = "pure-u-1 pure-u-md-1-2">
                                <label>Pick-up end time (hh:mm)</label>
                                <select
                                    placeholder="pick-up end time"
                                    type="text"
                                    name="pickUpEndTime"
                                    className="width-max"
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                    onChange={this.changeStoreVal}
                                    value={pickUpEndTime}
                                >
                                    <option value=''></option>
                                    {timeOfDay().map(function(time,index){
                                        return <option key={index} value={time.value}>{time.label}</option>
                                    })}
                                </select>  
                            </div>

                            <div className="pure-u-1">
                                <legend className="pull-left">
                                    Tag your food:
                                </legend>
                                {DIET_TYPES.map(function(diet,index){
                                                return <div key={index} className="pure-u-1-3 pure-u-md-1-6" style={{paddingBottom : '0.25em'}}>
                                                        <div className="parent-box">
                                                                <div className="child-box-1">
                                                                    {diet.value}
                                                                </div>
                                                                <div className="child-box-2">
                                                                    <Checkbox
                                                                        onCheck={(event,isInputChecked)=>self.toggle(diet.value ,isInputChecked)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                            })}
                                
                            </div>
                        </div>
                    </fieldset>
                </form>
                {
                    (this.props.mode != 'editMode')?
                    <div>
                        <IconButton
                        onClick = {()=>this.submitFoodItem('addAnother')}
                        style={{top:'6px'}}
                        disableTouchRipple={true}
                        >
                            <ContentAddBox/>
                        </IconButton>
                        <div style={{display:'inline-block'}}>
                            Add another item
                        </div>
                    </div>
                    :
                    undefined
                }
                <div style={{margin:'0 auto', textAlign:'center'}}>
                    
                </div>  
            </div>
        )
    }
})
FoodItemEntryForm.propTypes = {
    foodItemEntryForm : React.PropTypes.object.isRequired,
    addFoodItemInfo : React.PropTypes.func.isRequired, 
    fetchData : React.PropTypes.func.isRequired,
    removeFoodItemInfo: React.PropTypes.func.isRequired,
    params:React.PropTypes.object,
    dispatch:React.PropTypes.func,
    mode:React.PropTypes.string
};
export default FoodItemEntryForm;
