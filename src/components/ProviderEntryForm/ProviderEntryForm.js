import React, { Component, PropTypes } from 'react';
import classes from './providerentryform.scss';
import { email, maxLength, required } from './../../utils/formValidation';
import Toggle from 'react-toggle';
const maxCount = 100;

class ProviderEntryForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = this.props.providerEntryForm;
        this.mapFieldsToValidationType = {
            title: required,
            emailId: email,
            description: maxLength,
            city: required
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleBaconChange = this.handleBaconChange.bind(this);
    }
    
    handleToggle() {
        this.setState({
            active: !this.state.active
        })
    }
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
            this.setState({
                [errorMsgkey]: errorMsg
            });
            this.setState({
                stateKeyName: input
            });
            this.props.providerEntryForm[stateKeyName] = input; // hacky again
            this.props.providerEntryForm[errorMsgkey] = errorMsg // hacky again
        } else {
            this.setState({
                [stateKeyName]: input
            })
            this.props.providerEntryForm[stateKeyName] = input; // hacky again
        }
    }
    handleBaconChange(){
        this.state.handleBaconChange = !this.state.handleBaconChange;
    }
    toggle(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.setState({
            [stateKeyName]: !this.state[stateKeyName]
        })
        this.props.providerEntryForm[stateKeyName] = !this.props.providerEntryForm[stateKeyName]; // hacky again
    }
    handleFocus(event) {
        let stateKeyName = event.target.name;
        if (stateKeyName) {
            // clear the error msg if it exists
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.setState({
                [errorMsgkey]: null
            });
            this.props.providerEntryForm[errorMsgkey] = null; // hacky again
        }
    }

    setCount(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.setState({
            description: input,
            chars_left: maxCount - input.length
        })
        this.props.providerEntryForm.chars_left = maxCount - input.length; // hacky again
        this.props.providerEntryForm.description = input; // hacky again
    }

    changeTitle(event) {
        let input = event.target.value;
        this.props.addProviderTitle(input);
    }

    formSubmit(event) {
        let self = this;
        let noErrorsInform = true;
        for (let key in this.mapFieldsToValidationType) {
            if (this.mapFieldsToValidationType.hasOwnProperty(key)) {
                let errorMsg = this.mapFieldsToValidationType[key](this.state[key]);
                console.log(errorMsg + '  for key: ' + key + '  whose value is ' + this.state[key]);
                if (errorMsg) {
                    noErrorsInform = false;
                    let errorStateKey = [key] + 'ErrorMsg'
                    self.setState({
                        [errorStateKey]: errorMsg
                    });
                    this.props.providerEntryForm[errorStateKey] = errorMsg;
                }
            }
        }
        if (!noErrorsInform) {
            this.setState({
                allClear: false
            })
            this.props.providerEntryForm.allClear = false;
        } else {
            this.setState({
                allClear: true
            })
            this.props.providerEntryForm.allClear = true;
        }
    }
    render() {
        let { chars_left, title, description, streetName, crosStreetName, city, emailId, titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailIdErrorMsg, keepEmailPrivateFlag, keepAddressPrivateFlag } = this.state;
        return (
            <div>
              
           
            <form className="pure-form">

                <fieldset className="pure-group">
                    <input type="text"  className="pure-u-1" placeholder="title (required)" name="title" value={this.props.providerEntryForm.get('title')}
                    onChange={this.changeTitle}
                    onBlur={this.handleChange} 
                    onFocus={this.handleFocus}
                />
                    <span className = {classes["error-message"]}>{(titleErrorMsg)?'*'+titleErrorMsg:undefined}</span>
                    <textarea className = "pure-u-1"name="description" placeholder="Background (optional)" value={description}
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus} 
                        onChange={this.setCount.bind(this)} 
                    >   
                    </textarea>

                    <span className = {classes["error-message"]}>{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</span>
                    <div>{chars_left}/100</div>
                </fieldset>
                <fieldset className="pure-group">
                    <legend className={classes["pull-left"]}>
                        Display your neighbouring address
                        {/*<Toggle
                            defaultChecked={this.state.baconIsReady}
                            name="keepAddressPrivateFlag"
                            onChange={this.handleBaconChange} 
                            className = {classes["input-hidden"]}
                        />*/}
                        <input style = {{display:'inline', width:'10%'}} type ="checkBox" name="keepAddressPrivateFlag" 
                            checked={keepAddressPrivateFlag} onChange={this.toggle}/>
                    </legend>

                    <input type="text"  style = {{marginBottom:0.5+'em'}} name="streetName"  placeholder="Street Name (optional)" />
                    <input type="text"  style = {{marginBottom:0.5+'em'}} name="crosStreetName" placeholder="Cross Street Name (optional)"/>
                    <input type="text"  name="city"  placeholder="City (required)" style = {{marginBottom:0.5+'em'}}
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus}/>
                    <span className = {classes["error-message"]}>{(cityErrorMsg)?'*'+cityErrorMsg:undefined}</span>
                </fieldset>
                <fieldset className="pure-group">
                    <legend className={classes["pull-left"]}>
                        Keep my email private
                        <input style = {{display:'inline', width:'10%'}}type ="checkBox" name="keepEmailPrivateFlag"
                            checked={keepEmailPrivateFlag} onChange={this.toggle}/>
                    </legend>
                    <input type="text" name="emailId" placeholder="email (required)" style = {{marginBottom:0.5+'em'}} 
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus}/>
                    <span className = {classes["error-message"]}>{(emailIdErrorMsg)?'*'+emailIdErrorMsg:undefined}</span>
                </fieldset>
            </form>
        </div>
        )
    }
}
ProviderEntryForm.propTypes = {
    providerEntryState: React.PropTypes.object.isRequired,
};
export default ProviderEntryForm;
