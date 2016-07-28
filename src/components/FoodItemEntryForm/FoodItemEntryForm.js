import React, { Component, PropTypes } from 'react';
import classes from './fooditementryform.scss';
import { email, maxLength, required, regexTime, regexDate } from './../../utils/formValidation';
import Toggle from 'react-toggle';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

const maxCount = 100;

class FoodItemEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.mapFieldsToValidationType = {
            name: required,
            placeOrderBy: required,
            placeOrderBy: regexDate,
            serviceDate: required,
            serviceDate: regexDate,
            //pick-up options
            pickUpDate: regexDate,
            timeRangeToPickUpStartTime: regexTime,
            timeRangeToPickUpEndTime: regexTime,
            // delivery options
            devliveryDate: regexDate,
            timeRangeToDeliverStartTime: regexTime,
            timeRangeToDeliverEndTime: regexTime,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.changeStoreVal = this.changeStoreVal.bind(this);
        this.changeStoreTimeAndDateVals = this.changeStoreTimeAndDateVals.bind(this);
        this.toggle = this.toggle.bind(this);
        this.changeDateTime = this.changeDateTime.bind(this);
        this.applyDeliveryFlag = this.applyDeliveryFlag.bind(this);
    }
    changeStoreTimeAndDateVals = (time) => {
        console.log(event,time)
        this.props.addFoodItemInfo({
            storeKey: 'pickUpStartTime',
            payload: time
        })
    };
    handleChange(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        let actionObj = {
            storeKey: stateKeyName,
            payload: input
        }
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
        }
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: input
        })

    }
    toggle(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: !this.props.foodItemEntryForm.get(stateKeyName)
        })
    }
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
    }

    setCount(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.setState({
            description: input,
            chars_left: maxCount - input.length
        })
        this.addFoodItemInfo.providerEntryForm.chars_left = maxCount - input.length; // hacky again
        this.addFoodItemInfo.providerEntryForm.description = input; // hacky again
    }

    changeStoreVal(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addFoodItemInfo({
            storeKey: stateKeyName,
            payload: input
        });
    }

    formSubmit(event) {
        let self = this;
        let noErrorsInform = true;
        for (let key in this.mapFieldsToValidationType) {
            if (this.mapFieldsToValidationType.hasOwnProperty(key)) {
                let errorMsg = this.mapFieldsToValidationType[key](this.props.addFoodItemInfo.get(key));
                console.log(errorMsg + '  for key: ' + key + '  whose value is ' + this.props.addFoodItemInfo.get(key));
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
    }
    changeDateTime(name, moment) {
        //check for the new one
        if (!moment || moment === '') {
            this.props.addFoodItemInfo({
                storeKey: name + 'ErrorMsg',
                payload: 'Please enter a valid date'
            })
        } else {
            this.props.addFoodItemInfo({
                storeKey: name + 'ErrorMsg',
                payload: null
            })
            this.props.addFoodItemInfo({
                storeKey: name,
                payload: moment
            })
        }
    }
    applyDeliveryFlag(){
        this.props.addFoodItemInfo({
                storeKey: 'deliveryFlag',
                payload: !this.props.foodItemEntryForm.get('deliveryFlag')
            })
    }
    render() {
        let {
            name,
            nameErrorMsg,
            description,
            descriptionErrorMsg,
            placeOrderBy,
            placeOrderByErrorMsg,
            serviceDate,
            serviceDateErrorMsg,
            deliveryAddtnlComments,
            pickUpFlag,
            pickUpStartTime,
            pickUpEndTime,
            pickUpAddtnlComments,
            deliveryFlag,
            deliveryRadius,
            organic,
            vegetarian,
            glutenfree,
            lowcarb,
            vegan,
            nutfree,
            oilfree,
            nondairy,
            indianFasting,
            allClear,
            pickUpAddtnlCommentsErrorMsg
        } = this.props.foodItemEntryForm.toJS();
        return (
            <div>
                <form className="pure-form">
                    <fieldset className="pure-group">
                        <input type="text"  className="pure-u-1" placeholder="title (required)" name="name" value={this.props.foodItemEntryForm.get('title')}
                        onChange={this.changeStoreVal}
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus}
                    />
                        <span className = {classes["error-message"]}>{(nameErrorMsg)?'*'+nameErrorMsg:undefined}</span>
                        <textarea className = "pure-u-1" name="description" placeholder="Background (optional)" value={description}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus} 
                            onChange={this.changeStoreVal} 
                        >   
                        </textarea>

                        <span className = {classes["error-message"]}>{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</span>
                       {/* <div>{chars_left}/100</div>*/}
                    </fieldset>
                    <fieldset className = "pure-group">
                        <div className = "pure-u-1-2">
                             <DatePicker
                                hintText="Order by date"
                                value={placeOrderBy}
                                onChange={this.changeStoreTimeAndDateVals}
                                inputStyle={{boxShadow:'none'}}
                              />
                            <span className = {classes["error-message"]}>{(placeOrderByErrorMsg)?'*'+placeOrderByErrorMsg:undefined}</span>
                        </div>
                        <div className = "pure-u-1-2">
                              <DatePicker
                                hintText="Order ready date"
                                value={placeOrderBy}
                                onChange={this.changeStoreTimeAndDateVals}
                                inputStyle={{boxShadow:'none'}}
                              />

                            <span className = {classes["error-message"]}>{(placeOrderByErrorMsg)?'*'+placeOrderByErrorMsg:undefined}</span>
                        </div>
                        <div className = "pure-u-1-2">
                            <span className = {classes["error-message"]}>{(serviceDateErrorMsg)?'*'+serviceDateErrorMsg:undefined}</span>
                        </div>
                    </fieldset>
                    <fieldset className="pure-group">
                        For pick-up
                        <Toggle
                            defaultChecked={pickUpFlag}
                            onChange={this.applyDeliveryFlag} 
                            className = {classes["input-hidden"]}
                        />
                    </fieldset>
                    <fieldset className="pure-group">
                        For delivery
                        <Toggle
                            defaultChecked={deliveryFlag}
                            onChange={this.applyDeliveryFlag} 
                            className = {classes["input-hidden"]}
                        />
                    </fieldset>
                    <fieldset className="pure-group">
                        <div className = "pure-u-1-2">
                            <TimePicker
                              format="ampm"
                              hintText="Pick-up start time"
                              inputStyle={{boxShadow:'none'}}
                              value={pickUpStartTime}
                              onChange={this.changeStoreTimeAndDateVals}
                            />
                        </div>
                         <div className = "pure-u-1-2 ">
                             <TimePicker
                                inputStyle={{boxShadow:'none'}}
                                hintText="Pick-up end time"
                                onChange={this.changeStoreTimeAndDateVals}
                                value={pickUpStartTime}
                              />
                        </div>
                        <textarea className = "pure-u-1" name="pickUpAddtnlComments" 
                            placeholder="Pick-up comments. Please add comments like pick-up timings and your approximate location" value={pickUpAddtnlComments}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus} 
                            onChange={this.changeStoreVal} 
                        >
                        </textarea>
                        <span className = {classes["error-message"]}>{(pickUpAddtnlCommentsErrorMsg)?'*'+pickUpAddtnlCommentsErrorMsg:undefined}</span>
                    </fieldset>
                    
                    <fieldset className="pure-group">
                        <legend className={classes["pull-left"]}>
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
            </div>
        )
    }
}
FoodItemEntryForm.propTypes = {
    providerEntryState: React.PropTypes.object.isRequired,
};
export default FoodItemEntryForm;
