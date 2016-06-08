import React, { Component, PropTypes } from 'react';
import classes from './providerentryform.scss';
import { email, maxLength, required } from './../../utils/formValidation';
const maxCount = 100;


class ProviderEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chars_left: maxCount,
            title: '',
            description: '',
            streetName: '',
            crosStreetName: '',
            city: '',
            emailId: '',
            allClear: false
        };
        this.mapFieldsToValidationType = {
            title: required,
            emailId: email,
            description: maxLength,
            city: required
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleChange(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        let validation = this.mapFieldsToValidationType[stateKeyName];
        let errorMsg = validation(input);
        if (errorMsg) {
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.setState({
                [errorMsgkey]: errorMsg
            });
        } else {
            this.setState({
                [stateKeyName]: input
            })
        }
    }

    handleFocus(event) {
        let stateKeyName = event.target.name;
        if (stateKeyName) {
            // clear the error msg if it exists
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.setState({
                [errorMsgkey]: null
            });
        }
    }

    setCount(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.setState({
            chars_left: maxCount - input.length
        })
    }

    formSubmit(event) {
        let self = this;
        let noErrorsInform = true;
        for (let key in this.mapFieldsToValidationType) {
            if (this.mapFieldsToValidationType.hasOwnProperty(key)) {
                let errorMsg = this.mapFieldsToValidationType[key](this.state[key]);
                //console.log(errorMsg + '  for key: '+ key +'  whose value is '+ this.state[key]);
                if (errorMsg) {
                    noErrorsInform = false;
                    let errorStateKey = [key] + 'ErrorMsg'
                    self.setState({
                        [errorStateKey]: errorMsg
                    });
                }
            }
        }
        if (!noErrorsInform) {
            this.setState({
                allClear: false
            })
        } else {
            this.setState({
                allClear: true
            })
        }
    }
    render() {
        let { chars_left, title, description, streetName, crosStreetName, city, emailId, titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailIdErrorMsg } = this.state;
        return (
            <form id="provider-form" className="pure-form">
	         	<fieldset className="pure-group">
			        <input type="text"  placeholder="title (required)" name="title" onBlur={this.handleChange} onFocus={this.handleFocus}/>
			        <span className = {classes["error-message"]}>{(titleErrorMsg)?'*'+titleErrorMsg:undefined}</span>
			        <textarea className = "pure-input-1"name="description" placeholder="Background (optional)" 
			        	onBlur={this.handleChange} 
			        	onFocus={this.handleFocus} 
			        	onChange={this.setCount.bind(this)} 
			        >	
			        </textarea>
			        <span className = {classes["error-message"]}>{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</span>
			        <div>{chars_left}/100</div>
			    </fieldset>
			    <div className = {classes["pull-left"]}>
			    	<div className ={classes["display-inline"]} style = {{position:'relative', top:'-7px'}}>
			    		Display your neighborhood address on map
			    	</div>
			    	<input type="checkbox"/>
				</div>
			    <fieldset className="pure-group">
			        <input type="text"  name="streetName"  placeholder="Street Name (optional)" />
			        <input type="text"  className = {classes["remove-margin-bottom"]} name="crosStreetName" placeholder="Cross Street Name (optional)"/>
			        <input type="text"  name="city"  placeholder="City (required)" 
			        	onBlur={this.handleChange} 
			        	onFocus={this.handleFocus}/>
			        <span className = {classes["error-message"]}>{(cityErrorMsg)?'*'+cityErrorMsg:undefined}</span>
			    </fieldset>

			    <div className = {classes["pull-left"]}>
			    	<div className ={classes["display-inline"]} style = {{position:'relative', top:'-7px'}}>Keep my email id private</div>
			    		<input type="checkbox" />
			    </div>
			    <fieldset className="pure-group">
			        <input type="text" name="emailId" placeholder="email (required)" 
			        	onBlur={this.handleChange} 
			        	onFocus={this.handleFocus}/>
			        <span className = {classes["error-message"]}>{(emailIdErrorMsg)?'*'+emailIdErrorMsg:undefined}</span>
			    </fieldset>
			</form>
        )
    }
}
export default ProviderEntryForm;
