import React, { Component, PropTypes } from 'react';
import './fooditementryform.scss';
import { email, maxLength, required, regexTime, regexDate } from './../../utils/formUtils/formValidation';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import classNames from 'classnames';
import DatePicker from 'material-ui/DatePicker';
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import Snackbar from 'material-ui/Snackbar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimeInput from 'react-time-input';
import { securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { CUISINE_TYPES} from './../../routes/Search/constants/searchFilters'
import ImageUploader from 'components/ImageUploader'
import s3ImageUpload from 'utils/uploader/s3ImageUpload';
import Spinner from 'react-spinkit'
import moment from 'moment';
import * as actions from 'layouts/CoreLayout/coreReducer';

const maxCount = 100;

const FoodItemEntryForm= React.createClass({
    componentDidMount() {
        //scroll to the top
        window.scrollTo(0, 23);
        // check whether its an edit to an already present provider to prefil the form
        if(this.props.params.id){
            this.props.fetchData('/api/foodItem/'+this.props.params.id , 'foodItemCall','FOOD_ITEM')
                .then((res)=>{
                });
        }
    },
    componentWillUnmount() {
        this.props.removeFoodItemInfo();
        this.props.showHideSpinner({storeKey:'foodItemEntrySpinner',payload:false});
    },
    mapFieldsToValidationType:{
        name: required,
        placeOrderBy: required,
        serviceDate: required,
        cuisineType: required,
        price:required
    },
    addTimeOffset(orignalDate){
        return new Date(orignalDate.getTime()+orignalDate.getTimezoneOffset()*60000) ;
    },
    changeStoreTimeAndDateVals(date, storeKey){
        this.props.addFoodItemInfo({
            storeKey: storeKey,
            payload: date
        })
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
    toggle(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: !this.props.foodItemEntryForm.get(stateKeyName)
        })
    },
    toggleFlags(stateKeyName) {
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: !this.props.foodItemEntryForm.get(stateKeyName)
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
    onTimeChangeHandler(stateKeyName,value){
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: value
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
        this.props.addFoodItemInfo({
            storeKey: 'allClear',
            payload: noErrorsInform
        })
        if (!noErrorsInform) {
            self.props.addFoodItemInfo({
                storeKey: 'snackBarMessage',
                payload: 'Please fill the required fields'
            });
            this.toggleFlags('snackBarOpen');
            //scroll to the top
            window.scrollTo(0, 23);
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
                        .then(()=>self.props.onAllClear());
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
            requestBody.publishStage=(addAnother)? 1 : 2;
        }
        if(submitFoodItem){
            return securedPostCall('/api/providers/addOrEditFoodItem', requestBody)
                .then(function(response) {
                    // if its a provider entry stage 
                    if(self.props.mode ==="PROVIDER_ENTRY"){
                        console.log(response.data);
                        self.props.dispatch(actions.userFoodItemUpdate(response.data._id));
                    }
                    // open the snackbar
                    self.toggleFlags('snackBarOpen');
                    self.props.addFoodItemInfo({
                        storeKey: 'snackBarMessage',
                        payload: 'Item successfully added to your menu'
                    });
                    // delete all the prior information
                    self.props.removeFoodItemInfo();
                    //scroll to the top
                    window.scrollTo(0, 23);
                })
        }
    },
    render() {
        let { name,imgUrl,nameErrorMsg, description, cuisineType,cuisineTypeErrorMsg, price,priceErrorMsg,descriptionErrorMsg, placeOrderBy, placeOrderByErrorMsg, serviceDate, serviceDateErrorMsg, pickUpStartTime, pickUpEndTime, organic, vegetarian, glutenfree, lowcarb, vegan, nutfree, oilfree, nondairy, indianFasting, allClear, snackBarOpen, snackBarMessage} = this.props.foodItemEntryForm.toJS();
        let showSpinner = false;
        if(this.props.spinner){
            let {foodItemEntrySpinner} = this.props.spinner.toJS();
            showSpinner = (foodItemEntrySpinner)? true:false;
        }
        serviceDate = (serviceDate)? new Date(serviceDate): new Date();
        serviceDate =  this.addTimeOffset(serviceDate);
        placeOrderBy = (placeOrderBy)? new Date(placeOrderBy): new Date();
        return (
            (serviceDate)?
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
                                        return <option key={cuisine.type}>{cuisine.type}</option>
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
                            <div>
                                <div className = "pure-u-1 pure-u-md-1-2">
                                    <label>*Order ready date</label>
                                        <DatePicker
                                            container="inline"
                                            className="width-max"
                                            name="serviceDate"
                                            textFieldStyle={{width:'100%'}}
                                            inputStyle={{marginTop:'0px',height:'2.25em',border: '1px solid #ccc',boxShadow: 'inset 0 1px 3px #ddd',padding: '.5em .6em'}}
                                            underlineStyle={{display: 'none'}}
                                            hintText=""
                                            autoOk={true}
                                            value={serviceDate}
                                            onBlur={this.handleChange} 
                                            onFocus={this.handleFocus}
                                            onTouchTap={(event)=>event.preventDefault()}
                                            onChange={(event,date)=>this.changeStoreTimeAndDateVals(date,'serviceDate')}
                                            formatDate={(date)=> date.toDateString()}
                                        />
                                        <span className = "error-message">{(serviceDateErrorMsg)?'*'+serviceDateErrorMsg:undefined}</span>
                                </div>
                                <div className = "pure-u-1 pure-u-md-1-2" >
                                    <label>People can order</label>
                                    <select id="order-by-date" 
                                        name="placeOrderBy"
                                        className="width-max"
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus}
                                        onChange={this.changeStoreVal}
                                        value={placeOrderBy}
                                    >
                                        <option value={serviceDate}>Same Day</option>
                                        <option value={this.daysBeforeOrderDate(serviceDate,1)}>Atleast 1 day before</option>        
                                        <option value={this.daysBeforeOrderDate(serviceDate,2)}>Atleast 2 days before</option>     
                                        <option value={this.daysBeforeOrderDate(serviceDate,3)}>Atleast 3 days before</option>
                                    </select>
                                    <span className = "error-message">{(placeOrderByErrorMsg)?'*'+placeOrderByErrorMsg:undefined}</span>
                                </div>
                            </div> 
                       
                            <div>
                                <div className = "pure-u-1 pure-u-md-1-2">
                                    <label>Pick-up start time (hh:mm)</label>
                                    <TimeInput
                                        placeholder="pick-up start time"
                                        name="pickUpStartTime"
                                        className="width-max"
                                        onTimeChange={(value)=>this.onTimeChangeHandler('pickUpStartTime',value)}
                                        value={pickUpStartTime}
                                        initTime={pickUpStartTime}
                                    /> 
                                </div>
                                <div className = "pure-u-1 pure-u-md-1-2">
                                    <label>Pick-up end time (hh:mm)</label>
                                    <TimeInput
                                        placeholder="pick-up end time"
                                        name="pickUpEndTime"
                                        className="width-max"
                                        onTimeChange={(value)=>this.onTimeChangeHandler('pickUpEndTime',value)}
                                        value={pickUpEndTime}
                                        initTime={pickUpEndTime}
                                    />   
                                </div>
                            </div>
                            <legend className="pull-left">
                                Tag your food:
                            </legend>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="organic" 
                                    checked={organic} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#organic</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="glutenfree" 
                                    checked={glutenfree} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#gluten-free</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="nutfree"
                                    checked={nutfree} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#nut-free</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="vegetarian"
                                    checked={vegetarian} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#vegetarian</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="nondairy"
                                    checked={nondairy} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#non-dairy</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="indianFasting"
                                    checked={indianFasting} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#indian-fasting</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="lowcarb"
                                    checked={lowcarb} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#low-carb</span>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <input style = {{display:'inline', width:'20px'}}type ="checkBox" name="oilfree"
                                    checked={oilfree} onChange={this.toggle}/><span style={{marginRight:'20px'}}>#oil-free</span>
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
                        <Snackbar
                          open={snackBarOpen || false}
                          message={snackBarMessage || ''}
                          autoHideDuration={5000}
                          onRequestClose={()=>{this.toggleFlags('snackBarOpen')}} 
                        />
                    </div>
                    :
                    undefined
                }
                <div style={{margin:'0 auto', textAlign:'center'}}>
                    <Spinner spinnerName='circle' 
                        style = {{  display:'inline-block',
                                    display:(showSpinner)?'block':'none',
                                    marginBottom:'1em'
                                }}
                    />
                </div>  
            </div>
            :
            <div></div>
        )
    }
})
FoodItemEntryForm.propTypes = {
    onAllClear : React.PropTypes.func.isRequired, 
    foodItemEntryForm : React.PropTypes.object.isRequired,
    addFoodItemInfo : React.PropTypes.func.isRequired, 
    fetchData : React.PropTypes.func.isRequired,
    removeFoodItemInfo: React.PropTypes.func.isRequired,
    params:React.PropTypes.object,
    dispatch:React.PropTypes.func,
    mode:React.PropTypes.string
};
export default FoodItemEntryForm;
