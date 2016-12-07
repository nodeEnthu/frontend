import React, { Component, PropTypes } from 'react';
import './providerentryform.scss';
import { email, maxLength, required } from './../../utils/formUtils/formValidation';
import Toggle from 'material-ui/Toggle';
import classNames from 'classnames';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import ImageUploader from 'components/ImageUploader'


const maxCount = 100;
const ProviderEntryForm = React.createClass({
    componentWillMount() {
        // check whether its an edit to an already present provider
        if(this.props.params.id){
            this.props.fetchSecuredData('/api/users/'+this.props.params.id , 'providerProfileCall','PROVIDER_ENTRY')
            // we dont save the searchText or place_id in the db .. so we got to manually wire up search text here
            // a bit hacky but we had to do it to automate form validation
            // note to Gautam: see this is what we have to do when state does not match the things we save in db
            .then((res)=>{
                if(res && res.payload &&res.payload.data && res.payload.data.data && res.payload.data.data.loc){
                    this.props.prefilProviderEntryForm(res.payload.data.data);
                    this.props.addProviderInfo({
                        storeKey:'searchText',
                        payload:res.payload.data.data.loc.searchText
                    });
                    this.props.addProviderInfo({
                        storeKey:'place_id',
                        payload:res.payload.data.data.loc.place_id
                    })
                }

            })
        }
    },
    mapFieldsToValidationType : {
        title: required,
        email: email,
        description: maxLength,
        searchText:required
    },
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
       
    },
    toggle(storeKey) {
        this.props.addProviderInfo({
            storeKey: storeKey,
            payload:!this.props.providerEntryForm.get(storeKey)
        })
    },
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
    },
    changeStoreVal(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addProviderInfo({
            storeKey:stateKeyName,
            payload:input
        }); 
       
    },
    onSuggestionSelected(event,{suggestion}){
        this.props.addProviderInfo({
            storeKey:'searchText',
            payload:suggestion.address
        });
        this.props.addProviderInfo({
            storeKey:'place_id',
            payload:suggestion.place_id
        });
    },
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
    },
    formSubmit() {
        let self = this;
        if(this.validateForm()){
            securedPostCall('/api/providers/registration' , this.props.providerEntryForm.toJS())
                .then(()=>self.props.onAllClear())
        }
    },
    render() {
        let { chars_left, title, description, email, titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailErrorMsg, keepAddressPrivateFlag,pickUpFlag,pickUpAddtnlComments, includeAddressInEmail, deliveryAddtnlComments,deliveryMinOrder,deliveryRadius,allClear,providerAddressJustificationModalOpen,doYouDeliverFlag,searchText,searchTextErrorMsg } = this.props.providerEntryForm.toJS();
        const styles = {
          block: {
            maxWidth: 250,
          },
          radioButton: {
            marginBottom: 12,
          },
        };
        return (
            <div className="provider-entry-form">
                <form className="pure-form pure-form-stacked">
                    <fieldset className="pure-group">
                        <input type="text"  className="pure-u-1" placeholder="*title" name="title" value={title}
                        onChange={this.changeStoreVal}
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus}
                    />
                        <span className = "error-message">{(titleErrorMsg)?'*'+titleErrorMsg:undefined}</span>
                        <textarea className = "pure-u-1"name="description" placeholder="background" value={description}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus} 
                            onChange={this.changeStoreVal} 
                        >   
                        </textarea>
                        <span className = "error-message">{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</span>
                        <div>{chars_left}/100</div>
                    </fieldset>
                    <fieldset className="pure-group">
                        <input type="text" name="email" placeholder="*email" style = {{marginBottom:0.5+'em'}} value={email}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                            onChange={this.changeStoreVal}
                            className={"pure-u-1"}/>
                        <span className = "error-message">{(emailErrorMsg)?'*'+emailErrorMsg:undefined}</span>
                    </fieldset>
                    <fieldset className="pure-group">
                        <legend className="pull-left">
                            <div>
                                Address:
                            </div>
                            <div>
                                <span style={{fontSize:'0.75em'}}>Display this on my public profile page</span>
                                <div style={{maxWidth:100, display:'inline-block'}}>
                                    <Toggle
                                        style={{top:'8px'}}
                                        defaultToggled={!keepAddressPrivateFlag}
                                        onToggle={()=>{this.toggle('keepAddressPrivateFlag')}}
                                    />
                                </div>
                                
                                <a className="pure-menu-link address-justification" 
                                    onClick={()=>{this.toggle('providerAddressJustificationModalOpen')}}>
                                    why we need it?
                                </a> 
                            </div>  
                        </legend>
                        <AsyncAutocomplete  name={'searchText'}
                                            onBlur={this.handleChange} 
                                            onFocus={this.handleFocus}
                                            userSearchText = {this.props.providerEntryForm.get('searchText')}
                                            apiUrl = {'/api/locations/addressTypeAssist'}
                                            getSuggestionValue={(suggestion)=>suggestion.address}
                                            onChange = {(event, value)=>this.props.addProviderInfo({
                                                                                                storeKey:'searchText',
                                                                                                payload:value.newValue
                                                                                            })}
                                            onSuggestionSelected = {this.onSuggestionSelected}
                        />
                        <span className = "error-message">{(searchTextErrorMsg)?'*'+searchTextErrorMsg:undefined}</span>
                    </fieldset>
                    {(keepAddressPrivateFlag)?
                        <fieldset className="pure-group">
                            <div>
                                <p>
                                    Please note that the address entered above will be used as a pick-up address
                                </p>
                                <p>
                                    Choose from one of the following privacy options
                                </p>
                                <RadioButtonGroup name="shipSpeed" 
                                    defaultSelected={includeAddressInEmail.toString()}
                                    onChange={(event)=>this.toggle('includeAddressInEmail')}
                                >
                                  <RadioButton
                                    value="true"
                                    label="don't display the address but include it in the email sent to customer after order submission"
                                    style={styles.radioButton}
                                  />
                                  <RadioButton
                                    value="false"
                                    label="i will cordinate with customer regarding the pick-up location"
                                    style={styles.radioButton}
                                    
                                  />
                                </RadioButtonGroup>
                            </div>      
                        </fieldset>
                        : undefined
                    }
                    <fieldset className="pure-group">
                        We are pick-up service
                        <div style={{maxWidth:100, display:'inline-block'}}>
                            <Toggle
                                style={{top:'8px'}}
                                defaultToggled={pickUpFlag}
                                onToggle={()=>{this.toggle('pickUpFlag')}}
                            />
                        </div>
                    </fieldset>
                    {(pickUpFlag)?
                        <div>
                            <fieldset className = "pure-group">
                                <textarea className = "pure-u-1" name="pickUpAddtnlComments" 
                                    placeholder="additional comments about pick-up" value={pickUpAddtnlComments}
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus} 
                                    onChange={this.changeStoreVal} 
                                >
                                </textarea>
                            </fieldset>
                        </div>
                        :
                        undefined
                    }
                    <fieldset className="pure-group">
                        <legend className="pull-left">
                                We can deliver 
                            <div style={{maxWidth:100, display:'inline-block'}}>
                                <Toggle
                                     style={{top:'8px'}}
                                    defaultToggled={doYouDeliverFlag}
                                    onToggle={()=>{this.toggle('doYouDeliverFlag')}} 
                                />
                            </div> 
                        </legend>
                            {(doYouDeliverFlag)?
                                <div>
                                    <div>
                                        <div className="pure-u-1 pure-u-md-1-2">
                                            <label>
                                                Delivery within
                                            </label>
                                            <div>
                                                <select id="delivery"  className="pure-u-3-4"
                                                    name="deliveryRadius"
                                                    onBlur={this.handleChange} 
                                                    onFocus={this.handleFocus}
                                                    onChange={this.changeStoreVal}
                                                    value={deliveryRadius}
                                                    style={{width:'100%'}}
                                                >
                                                    <option  value="0">Please select miles</option>
                                                    <option>5</option>
                                                    <option>10 </option>
                                                    <option>15</option>
                                                    <option>20</option>
                                                    <option>25</option>
                                                    <option>30</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="pure-u-1 pure-u-md-1-2">
                                            <label>Minimum Order</label>
                                            <input id="min-order" placeholder="Example: 25"className="pure-u-3-4" type="text"
                                                name="deliveryMinOrder"
                                                onBlur={this.handleChange} 
                                                onFocus={this.handleFocus}
                                                onChange={this.changeStoreVal}
                                                value={deliveryMinOrder}
                                            />
                                        </div>
                                    </div>   
                                    <textarea className = "pure-u-1" style={{marginTop:'10px'}} 
                                        name="deliveryAddtnlComments" 
                                        placeholder="Please add comments like delivery charges. 
                                        Example:
                                        Delivery Fee $6 
                                        Free above $100"
                                        value={deliveryAddtnlComments}
                                        style = {{marginTop:'10px'}}
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus} 
                                        onChange={this.changeStoreVal} 
                                    >
                                    </textarea>
                                </div> 
                            :
                                undefined
                        }                            
                    </fieldset>
                </form>
                <Dialog
                  open={providerAddressJustificationModalOpen || false}
                  onRequestClose={()=>{this.toggle('providerAddressJustificationModalOpen')}}
                >
                  <div ref="subtitle"
                    style={{
                      marginBottom:'10%'
                    }}
                  >
                    <p>
                        Address is used to match you with:
                        <ul>
                            <li>
                                customers searching for food in the area. 
                            </li>
                        </ul> 
                    </p>
                    <p>
                         Still not convinced. Please feel free to give ur your cross street address.
                         <br/>
                         However make sure to cordinate with your customer regarding the accurate location for pick-up
                    </p>
                  <p>
                        fillurtummy is dedicated to keeping your data private
                  </p>

                  </div>
                </Dialog>
            </div>
        )
    }
});
ProviderEntryForm.propTypes = {
    providerEntryForm: React.PropTypes.object.isRequired,
    fetchSecuredData:React.PropTypes.func.isRequired,
    params:React.PropTypes.object,
    prefilProviderEntryForm:React.PropTypes.func
};
export default ProviderEntryForm;
