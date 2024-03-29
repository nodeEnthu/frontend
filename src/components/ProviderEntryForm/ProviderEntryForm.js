import React, { Component } from 'react';
import './providerentryform.scss';
import { email, maxLength, required } from './../../utils/formUtils/formValidation';
import Toggle from 'material-ui/Toggle';
import classNames from 'classnames';
import Dialog from 'material-ui/Dialog';
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import ImageUploader from 'components/ImageUploader';
import s3ImageUpload from 'utils/uploader/s3ImageUpload';
import RaisedButton from 'material-ui/RaisedButton';
import Stepper from 'components/Stepper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {METHODS_OF_PAYMENT} from './constants';
import PhoneVerification from 'components/PhoneVerification';
const maxCount = 100;
const ProviderEntryForm = createReactClass({
    getInitialState() {
      return{
            showSpinner:false,
        }  
    },
    componentWillMount() {
        let self = this;
        // check whether its an edit to an already present provider
        if(this.props.params.id){
            this.props.fetchSecuredData('/api/users/'+this.props.params.id+'/profileEdit' , 'providerProfileCall',this.props.mode)
            .then((res)=>{
                if(res && res.payload &&res.payload.data && res.payload.data.data && res.payload.data.data.name){
                    let provider = res.payload.data.data;
                    if(self.props.mode === "PROVIDER_ENTRY" && provider.publishStage >=2){
                        self.context.router.push('/provider/'+provider._id+'/providerFoodEntry');
                    }
                }
            })
        }
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    mapFieldsToValidationType : {
        title: {validationType: required,validationMessage:'title is required'},
        email: {validationType:email,validationMessage:'email is required'},
        description: {validationType:maxLength,validationMessage:'description is required'},
        searchText:{validationType:required,validationMessage:'address is required'},
        place_id:{validationType:required,validationMessage:'Please select from one of the suggested options'}
    },
    handleChange(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
        let actionObj = {
            storeKey :stateKeyName,
            payload : input
        }
        let validation , validationErrorMessage;
        if(this.mapFieldsToValidationType[stateKeyName]){
            validation = this.mapFieldsToValidationType[stateKeyName].validationType;
            validationErrorMessage = this.mapFieldsToValidationType[stateKeyName].validationMessage; 
        }
        let errorMsg;
        if (validation) errorMsg = validation(input,validationErrorMessage);
        if (errorMsg) {
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            this.props.addProviderErrorMsg({storeKey: errorMsgkey,payload: errorMsg});
        }
    },
    toggle(storeKey) {
        this.props.addProviderInfo({storeKey: storeKey,payload: !this.props.providerEntryForm.get(storeKey)})
    },
   
    handleFocus(event) {
        let stateKeyName = event.target.name;
        if (stateKeyName) {
            // clear the error msg if it exists
            let errorMsgkey = stateKeyName + 'ErrorMsg';
            if(stateKeyName === 'searchText') this.props.addProviderErrorMsg({storeKey :'place_idErrorMsg',payload: null});
            this.props.addProviderErrorMsg({storeKey: errorMsgkey,payload: null});
        }
    },
    changeStoreVal(event) {
        let input = event.target.value;
        let stateKeyName = event.target.name;
         this.props.addProviderInfo({storeKey:stateKeyName,payload:input});
        // forcibly re-render
        window.setTimeout(function() {this.setState({foo: "bar"});}.bind(this),0); 
    },
    changeMethodsofPayment(methodsOfPayment,val){
        this.props.addMethodOfPayment({storeKey:methodsOfPayment,payload:val});
        // forcibly re-render
        window.setTimeout(function() {this.setState({foo: "bar"});}.bind(this),0); 
    },
    onSuggestionSelected(event,{suggestion}){
        this.props.addProviderInfo({storeKey:'searchText', payload:suggestion.address });
        this.props.addProviderInfo({
            storeKey:'place_id',
            payload:suggestion.place_id
        });
    },
    onAllClear(){
        this.setState({showSpinner:false});
        this.context.router.push(this.props.linkToRedirectOnAllClear);
    },
    
    validateForm(){
        let self = this;
        let noErrorsInform = true;
        for (let key in this.mapFieldsToValidationType) {
            if (this.mapFieldsToValidationType.hasOwnProperty(key)) {
                let validationType = this.mapFieldsToValidationType[key].validationType;
                let validationErrorMessage = this.mapFieldsToValidationType[key].validationMessage;
                let errorMsg = validationType(this.props.providerEntryForm.get(key),validationErrorMessage);
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
            this.setState({showSpinner:true});
            if(this.props.mode==='PROVIDER_ENTRY') reqBody.publishStage =1;
            // check whether the image was changed
            if (reqBody.imgChanged) {
                s3ImageUpload(this.state.fileConfig,this.state.imgBlob,function(){
                    securedPostCall('/api/providers/registration' , reqBody)
                        .then(()=>self.onAllClear())
                });
                // reset it back to not changed
                this.props.addProviderInfo({storeKey:'imgChanged',payload:false});
            }else{
                securedPostCall('/api/providers/registration' , reqBody)
                    .then(()=>self.onAllClear())
            }
        }else{
            // show snackbar
            this.props.addProviderInfo({storeKey:'snackBarOpen',payload:true});
        }
    },
    render() {
        let {chars_left, title, description, email,phone,imgUrl, code, titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailErrorMsg,phoneErrorMsg, methodsOfPayment, keepAddressPrivateFlag,serviceOffered,addtnlComments, includeAddressInEmail,deliveryMinOrder,deliveryRadius,providerAddressJustificationModalOpen,searchText,searchTextErrorMsg,place_id,place_idErrorMsg, providerTypeErrorMsg,snackBarOpen,snackBarMessage } = this.props.providerEntryForm.toJS();
        methodsOfPayment = methodsOfPayment || [];
        let self = this;
        switch(serviceOffered){
            case 1:
                serviceOffered = "pickup"
                break;
            case 2:
                serviceOffered = "both"
                break;
            case 3:
                serviceOffered = "delivery"
                break;
            default:
                // dont do anything
                break;
        }

        return (
            <div className="provider-entry-form">
                <div className="is-center">
                    <ImageUploader
                        globalState = {this.props.globalState}
                        onImageChange = {this.onImageChange}
                        initialImgUrl={imgUrl}
                    />
                </div>
                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <input value={title} type="text" className="pure-u-1" placeholder="*your business name " name="title" 
                            onChange={this.changeStoreVal}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                        />
                        <div className = "error-message">{(titleErrorMsg)?'*'+titleErrorMsg:undefined}</div>
                        <textarea className = "pure-u-1" name="description" placeholder="background" value={description}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus} 
                            onChange={this.changeStoreVal} 
                        >   
                        </textarea>
                        <div className = "error-message">{(descriptionErrorMsg)?'*'+descriptionErrorMsg:undefined}</div>
                        <input type="text" className={"pure-u-1"} name="email" placeholder="*email" value={email}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                            onChange={this.changeStoreVal}
                        />
                        <div className = "error-message">{(emailErrorMsg)?'*'+emailErrorMsg:undefined}</div>
                        
                        <legend className="pull-left">
                            <div style={{marginTop:"1em"}}>
                                Phone number (please verify to display)
                            </div>
                            <PhoneVerification
                                phone={phone}
                                code={code}
                                changePhoneAttr={this.props.addProviderInfo}
                            />
                        </legend>
                        
                        <legend className="pull-left">
                            <div>
                                Address:
                            </div>
                            <div>
                                <span style={{fontSize:'0.75em'}}>Display on profile page</span>
                                <div style={{maxWidth:100, display:'inline-block'}}>
                                    <Toggle
                                        style={{top:'8px'}}
                                        thumbSwitchedStyle={{backgroundColor:'#FF6F00'}}
                                        trackSwitchedStyle={{backgroundColor:'#fdd4b5'}}
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
                                            onChange = {(event, value)=>{
                                                                            this.props.addProviderInfo({
                                                                                                    storeKey:'searchText',
                                                                                                    payload:value.newValue
                                                                                                  });
                                                                            this.props.addProviderInfo({
                                                                                                    storeKey:'place_id',
                                                                                                    payload:null
                                                                                                });
                                                                        }
                                                        }
                                            onSuggestionSelected = {this.onSuggestionSelected}
                        />
                        
                        <div className = "error-message">{(searchTextErrorMsg||place_idErrorMsg)?'*'+(searchTextErrorMsg || place_idErrorMsg):undefined}</div>
                        {
                            (keepAddressPrivateFlag)?
                            <div style={{fontSize:'0.75em'}}>
                                <div>
                                    <i>123 Main street, San Jose, H25XCS, Ca, USA</i>
                                </div>
                                <div style={{padding:"0.25em 0"}}> will appear as: </div>
                                <div>
                                    <i>San Jose, Ca, USA</i>
                                </div>
                            </div>
                            :
                            undefined
                        }
                        <div>
                            <legend style={{margin: "1em 0"}}>Services offered:</legend>
                            <RadioButtonGroup name="serviceOffered" valueSelected={serviceOffered} onChange={this.changeStoreVal}>
                              <RadioButton
                                name="serviceOffered"
                                value="pickup"
                                label="pickup"
                                labelPosition="right"
                              />
                              <RadioButton
                                name="serviceOffered"
                                value="delivery"
                                label="delivery"
                                labelPosition="right"
                              />
                              <RadioButton
                                name="serviceOffered"
                                value="both"
                                label="both"
                                labelPosition="right"
                              />
                            </RadioButtonGroup>
                        </div>
                    {(serviceOffered==='delivery' || serviceOffered==='both')?
                        <div>
                            <div>
                                <div className="pure-u-1 pure-u-md-1-2">
                                    <label>
                                        Delivery within (km)
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
                                            <option  value="0">Please select kms</option>
                                            <option>1</option>
                                            <option>3</option>
                                            <option>5</option>
                                            <option>10 </option>
                                            <option>15</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pure-u-1 pure-u-md-1-2">
                                    <label>Minimum order price for delivery (please enter an amount) </label>
                                    <input id="min-order" placeholder="Example: 25" type="text"
                                        name="deliveryMinOrder"
                                        onBlur={this.handleChange} 
                                        onFocus={this.handleFocus}
                                        onChange={this.changeStoreVal}
                                        value={deliveryMinOrder}
                                        style={{width:'100%'}}
                                    />
                                </div>
                            </div>   
                        </div> 
                        :
                        undefined
                    }   
                         <div>
                            <fieldset className = "pure-group">
                                <textarea className = "pure-u-1" name="addtnlComments" 
                                    placeholder="additional comments about pick-up and/or delivery" value={addtnlComments}
                                    onBlur={this.handleChange} 
                                    onFocus={this.handleFocus} 
                                    onChange={this.changeStoreVal} 
                                >
                                </textarea>
                            </fieldset>
                        </div>

                        <fieldset className = "pure-group">
                            <legend style={{margin:"1em 0"}}>Methods of payment accepted (can select multiple):</legend>
                            {
                                METHODS_OF_PAYMENT.map(function(methodOfPayment, index){
                                    return <Checkbox
                                                name="methodsOfPayment"
                                                key={index}
                                                label= {methodOfPayment.label}
                                                checked={(methodsOfPayment.indexOf(methodOfPayment.value) > -1)? true: false }
                                                onCheck={()=>self.changeMethodsofPayment("methodsOfPayment",methodOfPayment.value)}
                                            />
                                })
                            }
                        </fieldset>
                    </fieldset>
                </form>
                <div className="is-center">
                    <div style={{display:(this.state.showSpinner)?'block':'none'}}>
                        <img src= "/general/loading.svg"/>
                    </div>
                    <RaisedButton
                        label={this.props.nextLabel}
                        backgroundColor="#FF6F00"
                        labelStyle={{color:'white'}}
                        onTouchTap={this.formSubmit}
                        disableTouchRipple={true}
                      />
                </div>
                <Snackbar
                  open = {snackBarOpen || false}
                  message={'Please fill the required fields'}
                  autoHideDuration={4000}
                  onRequestClose={()=>this.toggle('snackBarOpen',false)}
                />
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
                        Address is used to match you with customers searching for food in your area. 
                    </p>
                    <p>
                        Accurate address will help us find more closer customers
                    </p>
                    <p>
                        Spoon&Spanner is is dedicated towards keeping your personal details <strong>private</strong>
                    </p>
                    <p>
                        Please note that you can always change your pickup address to make it accurate  and add additional comments at the time of confirming an order
                    </p>
                    <p>
                        Now go ahead and start getting orders!!
                    </p>

                  </div>
                </Dialog>
            </div>
        )
    }
});
ProviderEntryForm.propTypes = {
    globalState: PropTypes.object,
    addProviderInfo:PropTypes.func,
    addProviderErrorMsg:PropTypes.func,
    providerEntryForm: PropTypes.object,
    addMethodOfPayment: PropTypes.func,
    params:PropTypes.object,
    fetchSecuredData:PropTypes.func,
    mode:PropTypes.string,
    nextLabel:PropTypes.string,
    linkToRedirectOnAllClear:PropTypes.string
};
export default ProviderEntryForm;
