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
import s3ImageUpload from 'utils/uploader/s3ImageUpload'
import Spinner from 'react-spinkit'

const maxCount = 100;
const ProviderEntryForm = React.createClass({
    componentWillMount() {
        // check whether its an edit to an already present provider
        if(this.props.params.id){
            this.props.fetchSecuredData('/api/users/'+this.props.params.id , 'providerProfileCall',this.props.mode)
            // we dont save the searchText or place_id in the db .. so we got to manually wire up search text here
            // a bit hacky but we had to do it to automate form validation
            // note to Gautam: see this is what we have to do when state does not match the things we save in db
            .then((res)=>{
                if(res && res.payload &&res.payload.data && res.payload.data.data && res.payload.data.data.loc){
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
        if((storeKey==='doYouDeliverFlag' || storeKey==='pickUpFlag')){
            this.props.addProviderErrorMsg({
                        storeKey:"providerTypeErrorMsg",
                        payload:null
                    });
        }
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
        if(!this.props.providerEntryForm.get("doYouDeliverFlag") && !this.props.providerEntryForm.get("pickUpFlag")){
            noErrorsInform = false;
            self.props.addProviderErrorMsg({
                        storeKey:"providerTypeErrorMsg",
                        payload:"Please choose service type Pick-up OR Delivery OR both "
                    })
        }
        return noErrorsInform;
    },
    onImageChange(blob,imgUrl,fileConfig){
        this.props.addProviderInfo({
            storeKey:'imgChanged',
            payload:true
        });
        this.props.addProviderInfo({
            storeKey:'imgUrl',
            payload:imgUrl
        });
        this.setState({imgBlob:blob, fileConfig:fileConfig});
    },
    formSubmit() {
        let self = this;
        let reqBody = this.props.providerEntryForm.toJS();
        if(this.validateForm()){
            this.props.showHideSpinner({storeKey:'providerEntrySpinner',payload:true});
            // check whether the image was changed
            if (reqBody.imgChanged) {
                this.props.addProviderInfo({
                    storeKey:'imgChanged',
                    payload:false
                });
                s3ImageUpload(this.state.fileConfig,this.state.imgBlob,function(){
                    securedPostCall('/api/providers/registration' , reqBody)
                        .then(()=>self.props.onAllClear())
                });
            }else{
                securedPostCall('/api/providers/registration' , reqBody)
                    .then(()=>self.props.onAllClear())
            }
            
        }
    },
    render() {
        let {chars_left, title, description, email,imgUrl,titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailErrorMsg, keepAddressPrivateFlag,pickUpFlag,pickUpAddtnlComments, includeAddressInEmail, deliveryAddtnlComments,deliveryMinOrder,deliveryRadius,allClear,providerAddressJustificationModalOpen,doYouDeliverFlag,searchText,searchTextErrorMsg,providerTypeErrorMsg } = this.props.providerEntryForm.toJS();
        let showSpinner = false;
        if(this.props.spinner){
            const {providerEntrySpinner} = this.props.spinner.toJS();
            showSpinner = (providerEntrySpinner)? true:false;
        }
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
                <div className="is-center">
                    <ImageUploader
                        onImageChange = {this.onImageChange}
                        initialImgUrl={imgUrl}
                    />
                </div>
                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <input type="text"  className="pure-u-1" placeholder="*title" name="title" value={title}
                        onChange={this.changeStoreVal}
                        onBlur={this.handleChange} 
                        onFocus={this.handleFocus}
                        />
                        <div className = "error-message">{(titleErrorMsg)?'*'+titleErrorMsg:undefined}</div>
                        <textarea className = "pure-u-1"name="description" placeholder="background" value={description}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus} 
                            onChange={this.changeStoreVal} 
                        >   
                        </textarea>
                        <div className = "error-message">{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</div>
                        <div>{chars_left}/100</div>
                    
                        <input type="text" name="email" placeholder="*email" value={email}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                            onChange={this.changeStoreVal}
                            className={"pure-u-1"}/>
                        <div className = "error-message">{(emailErrorMsg)?'*'+emailErrorMsg:undefined}</div>
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
                        <div className = "error-message">{(searchTextErrorMsg)?'*'+searchTextErrorMsg:undefined}</div>
                   
                    {(keepAddressPrivateFlag)?
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
                        : 
                        undefined
                    }
                        We are pick-up service
                        <div style={{maxWidth:100, display:'inline-block'}}>
                            <Toggle
                                style={{top:'8px'}}
                                defaultToggled={pickUpFlag}
                                onToggle={()=>{this.toggle('pickUpFlag')}}
                            />
                        </div>
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
                        <div className = "error-message">{(providerTypeErrorMsg)?'*'+providerTypeErrorMsg:undefined}</div>
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
                                <div className="pure-u-1">
                                    <label>Minimum Order</label>
                                    <input id="min-order" placeholder="Example: 25" type="text"
                                        name="deliveryMinOrder"
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus}
                                        onChange={this.changeStoreVal}
                                        value={deliveryMinOrder}
                                        style={{width:'100%'}}
                                    />
                                    <textarea className = "pure-u-1"
                                        name="deliveryAddtnlComments" 
                                        placeholder="Please add comments like delivery charges. 
                                        Example:
                                        Delivery Fee $6 
                                        Free above $100"
                                        value={deliveryAddtnlComments}
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus} 
                                        onChange={this.changeStoreVal} 
                                    >
                                    </textarea>
                                </div>
                            </div>   
                        </div> 
                        :
                        undefined
                }                            
                    </fieldset>
                </form>
                <div style={{margin:'0 auto', textAlign:'center'}}>
                    <Spinner spinnerName='circle' 
                        style = {{  display:'inline-block',
                                    display:(showSpinner)?'block':'none',
                                    marginBottom:'1em'
                                }}
                    />
                </div>
                
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
    addProviderInfo:React.PropTypes.func.isRequired,
    providerEntryForm: React.PropTypes.object.isRequired,
    fetchSecuredData:React.PropTypes.func.isRequired,
    params:React.PropTypes.object,
    prefilProviderEntryForm:React.PropTypes.func,
    showHideSpinner:React.PropTypes.func
};
export default ProviderEntryForm;
