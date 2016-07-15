import React, { Component, PropTypes } from 'react';
import classes from './providerentryform.scss';
import { email, maxLength, required } from './../../utils/formValidation';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'react-toggle';

const maxCount = 100;
class ProviderEntryForm extends React.Component {
    constructor(props) {
        super(props);
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
        this.changeStoreVal = this.changeStoreVal.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    handleTimeChange = (time) => {
        this.setState({time});
    };
    handleToggle() {
        this.setState({
            active: !this.state.active
        })
    }
    handleChange(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        let actionObj = {
            storeKey :stateKeyName,
            payload : input
        }
        let validation = this.mapFieldsToValidationType[stateKeyName];
        let errorMsg;
        if (validation) {
            errorMsg = validation(input);
        }
        if (errorMsg) {
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.props.addProviderErrorMsg({
                storeKey:errorMsgkey,
                payload:errorMsg
            });
        }
        this.props.addProviderInfo({
            storeKey:stateKeyName,
            payload:input
        })
       
    }
    toggle(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addProviderInfo({
            storeKey: stateKeyName,
            payload:!this.props.providerEntryForm.get(stateKeyName)
        })
    }
    handleFocus(event) {
        let stateKeyName = event.target.name;
        if (stateKeyName) {
            // clear the error msg if it exists
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.props.addProviderErrorMsg({
                storeKey:errorMsgkey,
                payload:null
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
        this.props.providerEntryForm.chars_left = maxCount - input.length; // hacky again
        this.props.providerEntryForm.description = input; // hacky again
    }

    changeStoreVal(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addProviderInfo({
            storeKey:stateKeyName,
            payload:input
        });
    }
    validateForm(){
        let self = this;
        let noErrorsInform = true;
        for (let key in this.mapFieldsToValidationType) {
            if (this.mapFieldsToValidationType.hasOwnProperty(key)) {
                let errorMsg = this.mapFieldsToValidationType[key](this.props.providerEntryForm.get(key));
                if (errorMsg) {
                    noErrorsInform = false;
                    let errorStateKey = [key] + 'ErrorMsg';
                    self.props.addProviderErrorMsg({
                        storeKey:errorStateKey,
                        payload:errorMsg
                    })
                }
            }
        }
        return noErrorsInform;
    }

    formSubmit(event) {
        if(this.validateForm()){
            this.props.addProviderEntryState({
                storeKey: "stepIndex",
                payload:1
            });
        }
    }
    render() {
        let { chars_left, title, description, streetName, crosStreetName, city, emailId, titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailIdErrorMsg, keepEmailPrivateFlag, keepAddressPrivateFlag, deliveryAddtnlComments,allClear } = this.props.providerEntryForm.toJS();
        return (
            <div>
                <form className="pure-form">
                    <fieldset className="pure-group">
                        <input type="text"  className="pure-u-1" placeholder="title (required)" name="title" value={this.props.providerEntryForm.get('title')}
                        onChange={this.changeStoreVal}
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus}
                    />
                        <span className = {classes["error-message"]}>{(titleErrorMsg)?'*'+titleErrorMsg:undefined}</span>
                        <textarea className = "pure-u-1"name="description" placeholder="Background (optional)" value={description}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus} 
                            onChange={this.changeStoreVal} 
                        >   
                        </textarea>

                        <span className = {classes["error-message"]}>{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</span>
                        <div>{chars_left}/100</div>
                    </fieldset>
                    <fieldset className="pure-group">
                        <input type="text" name="emailId" placeholder="email (required)" style = {{marginBottom:0.5+'em'}} value={emailId}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                            onChange={this.changeStoreVal}/>
                        <span className = {classes["error-message"]}>{(emailIdErrorMsg)?'*'+emailIdErrorMsg:undefined}</span>
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

                        <input type="text"  style = {{marginBottom:0.5+'em'}} name="streetName"  placeholder="Street Name (optional)" value = {streetName}
                            onChange={this.changeStoreVal} 
                         />
                        <input type="text"  style = {{marginBottom:0.5+'em'}} name="crosStreetName" placeholder="Cross Street Name (optional)" value = {crosStreetName}
                            onChange={this.changeStoreVal} 
                        />
                        <input type="text"  name="city"  placeholder="City (required)" style = {{marginBottom:0.5+'em'}} value = {city}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                            onChange={this.changeStoreVal}
                        />
                        <span className = {classes["error-message"]}>{(cityErrorMsg)?'*'+cityErrorMsg:undefined}</span>
                    </fieldset>
                    <fieldset className="pure-group">
                        <Card style={{width:'99%', margin: '0 auto'}}>
                            <CardHeader
                              title="Delivery options"
                              actAsExpander={true}
                              showExpandableButton={true}
                              style={{padding:'7px'}}
                            />
                            <CardText 
                                expandable={true}>
                                <div style={{overflow:'hidden'}}>
                                    <label style={{
                                            display: 'inline-block',
                                            margin: 0,
                                            fontWeight: 'normal',
                                            marginRight: '5px',
                                            float: 'left'
                                    }}for="delivery">Delivery within</label>
                                    <div style = {{float:'left'}}>
                                         <select id="delivery">
                                            <option selected="selected">Please select miles</option>
                                            <option>5</option>
                                            <option>10</option>
                                            <option>15</option>
                                            <option>20</option>
                                            <option>25</option>
                                        </select> miles
                                    </div>
                                </div>
                                <div className="is-center">
                                    <textarea className = "pure-u-1" style={{marginTop:'10px'}} name="deliveryAddtnlComments" 
                                    placeholder="Please add comments like delivery charges and location. 
                                        Example:
                                        Minimum Order $35 
                                        Delivery Fee $6 
                                        Free above $100
                                        Located near Super Market at 123 Main street"
                                    value={deliveryAddtnlComments}
                                        style = {{marginTop:'10px'}}
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus} 
                                        onChange={this.changeStoreVal} 
                                    >
                                    </textarea> 
                                </div>
                                
                            </CardText>
                        </Card>
                    </fieldset>
                </form>
            </div>
        )
    }
}
ProviderEntryForm.propTypes = {
    providerEntryState: React.PropTypes.object.isRequired,
    providerEntryForm: React.PropTypes.object.isRequired
};
export default ProviderEntryForm;
