import React, { Component, PropTypes } from 'react';
import './fooditementryform.scss';
import { email, maxLength, required, regexTime, regexDate } from './../../utils/formUtils/formValidation';
import Toggle from 'react-toggle';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import TimePicker from 'material-ui/TimePicker';
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import Snackbar from 'material-ui/Snackbar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chip from 'material-ui/Chip';
import TimeInput from 'react-time-input';
import { securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import { CUISINE_TYPES} from './../../routes/Search/constants/searchFilters'
import moment from 'moment';
const maxCount = 100;

const FoodItemEntryForm= React.createClass({
    componentDidMount() {
        //scroll to the top
        window.scrollTo(0, 23);
        // check whether its an edit to an already present provider
        if(this.props.params.id){
            this.props.fetchData('/api/foodItem/'+this.props.params.id , 'foodItemCall','FOOD_ITEM')
            .then((res)=>{
                this.props.addFoodItemInfo({
                    storeKey:'firstItem',
                    payload:true
                }) 
            })
        }
    },
    getInitialState() {
        return {
            chipDeleted: false
        };
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
        let orignalDate = date.toDate();
        this.props.addFoodItemInfo({
            storeKey: storeKey,
            payload: this.addTimeOffset(orignalDate)
        })
    },
    handleDeleteChip() {
        this.setState({
            chipDeleted: true
        })
    },
    handleChange(event) {
        console.log(event);
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
                console.log('handleChange',stateKeyName);

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
    formSubmit(event) {
        if (this.validateForm()) {
            let self = this;
            this.submitFoodItem()
                .then(()=>self.props.onAllClear());
        }
    },
    submitFoodItem() {
        let result = false;
        let self = this;
        // send it to server and clear out some of the item specific info
        return securedPostCall('/api/providers/addOrEditFoodItem', this.props.foodItemEntryForm.toJS())
                .then(function(response) {
                    // show the chip for last food item entered
                    self.props.addFoodItemInfo({
                        storeKey: 'firstItem',
                        payload: false
                    });
                    self.setState({
                            chipDeleted: false,
                            lastItemAdded: response.data.name
                        })
                        // open the snackbar
                    self.props.addFoodItemInfo({
                        storeKey: 'snackBarMessage',
                        payload: 'Item successfully added to your menu'
                    });
                    self.toggleFlags('snackBarOpen');
                    //scroll to the top
                    window.scrollTo(0, 23);
                    // remove name , desc and image from last item ...keep the others as defaults for new item
                    self.props.removeFoodItemInfo({
                        storeKeys: ['name', 'description']
                    });
                })
       
    },
    render() {
        let { name, nameErrorMsg, description, cuisineType,cuisineTypeErrorMsg, price,priceErrorMsg,descriptionErrorMsg, placeOrderBy, placeOrderByErrorMsg, serviceDate, serviceDateErrorMsg, pickUpStartTime, pickUpEndTime, deliveryFlag, organic, vegetarian, glutenfree, lowcarb, vegan, nutfree, oilfree, nondairy, indianFasting, allClear, snackBarOpen, snackBarMessage, firstItem } = this.props.foodItemEntryForm.toJS();
        let resolvedServiceDate = null;
        if(serviceDate){
            resolvedServiceDate = (serviceDate instanceof Date)? moment(serviceDate):moment(new Date(serviceDate));
        } 
        function daysBeforeOrderDate(days){
            let newDate = new Date(serviceDate.toString());
            newDate.setDate(newDate.getDate()-days);
            return newDate;
        }
        return (
            (serviceDate)?
            <div>
                {
                    (!firstItem && !this.state.chipDeleted)?
                        <div style={{display: 'flex',flexWrap: 'wrap'}}>
                            <span style={{position:'relative',top:'10px'}}>Last Item Entered</span>
                            <Chip
                              onRequestDelete={this.handleDeleteChip}
                              style={{margin: 4,appearance:'initial'}}
                            >
                              {this.state.lastItemAdded}
                            </Chip>
                        </div>
                    :
                    undefined

                }
                <form className="pure-form pure-form-stacked">
                    <fieldset className="pure-group">
                        <div className="pure-g">
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
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                    onChange={this.changeStoreVal}
                                    value={cuisineType}
                                    style={{width:'100%'}}
                                >
                                    <option value=''></option>
                                    {CUISINE_TYPES.map((cuisine)=>{
                                        return <option key={cuisine.type}>{cuisine.type}</option>
                                    })}
                                </select>
                                <span className = "error-message">{(cuisineTypeErrorMsg)?'*'+cuisineTypeErrorMsg:undefined}</span>
                            </div>
                            
                            <div  className="pure-u-1 pure-u-md-1-2">
                                <label>*Price</label>
                                <input type="text"  placeholder="*price" name="price" value={price}
                                    onChange={this.changeStoreVal}
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                />
                                <span className = "error-message">{(priceErrorMsg)?'*'+priceErrorMsg:undefined}</span>
                            </div>
                        </div> 
                    </fieldset>
                    <fieldset className = "pure-group">
                        <div className="pure-g">
                            <div className = "pure-u-1 pure-u-md-1-2">
                                <label>*Order ready date</label>
                                    <DatePicker
                                        selected={resolvedServiceDate}
                                        name="serviceDate"
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus}
                                        onChange={(date)=>this.changeStoreTimeAndDateVals(date,'serviceDate')}
                                    />
                            </div>
                            <span className = "error-message">{(serviceDateErrorMsg)?'*'+serviceDateErrorMsg:undefined}</span>
                            <div className = "pure-u-1 pure-u-md-1-2" >
                                <label>People can order</label>
                                <select id="order-by-date" 
                                    name="placeOrderBy"
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus}
                                    onChange={this.changeStoreVal}
                                    value={placeOrderBy}
                                    style={{width:'100%'}}
                                >
                                    <option value={0}>Same Day</option>
                                    <option value={1}>Atleast 1 day before</option>        
                                    <option value={2}>Atleast 2 days before</option>     
                                    <option value={3}>Atleast 3 days before</option>
                                </select>
                                <span className = "error-message">{(placeOrderByErrorMsg)?'*'+placeOrderByErrorMsg:undefined}</span>
                            </div>
                        </div> 
                    </fieldset>
                    {(true)?
                        <div>
                            <fieldset className="pure-group">
                                <div className = "pure-g">
                                    <div className = "pure-u-1 pure-u-md-1-2">
                                        <label>Pick-up start time (hh:mm)</label>
                                        <TimeInput
                                            placeholder="pick-up start time"
                                            name="pickUpStartTime"
                                            onTimeChange={(value)=>this.onTimeChangeHandler('pickUpStartTime',value)}
                                            value={pickUpStartTime}
                                            style={{width:'100%'}}
                                            initTime={pickUpStartTime}
                                        /> 
                                    </div>
                                    <div className = "pure-u-1 pure-u-md-1-2">
                                        <label>Pick-up end time (hh:mm)</label>
                                        <TimeInput
                                            placeholder="pick-up end time"
                                            name="pickUpEndTime"
                                            onTimeChange={(value)=>this.onTimeChangeHandler('pickUpEndTime',value)}
                                            value={pickUpEndTime}
                                            style={{width:'100%'}}
                                            initTime={pickUpEndTime}
                                        />   
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        :
                        undefined
                    }
                   
                    <fieldset className="pure-group">
                        Enable delivery for this item
                        <Toggle
                            defaultChecked={deliveryFlag}
                            onChange={()=>{this.toggleFlags('deliveryFlag')}} 
                            className = "input-hidden"
                        />
                    </fieldset>
                   
                    
                    <fieldset className="pure-group">
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
                    </fieldset>
                </form>
                {
                    (this.props.mode != 'editMode')?
                    <div>
                        <IconButton
                        onClick = {this.submitFoodItem}
                        style={{top:'6px'}}
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
    mode:React.PropTypes.string
};
export default FoodItemEntryForm;
