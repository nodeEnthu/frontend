import React, { Component, PropTypes } from 'react';
import './providerentryform.scss';
import { email, maxLength, required } from './../../utils/formUtils/formValidation';
import Toggle from 'material-ui/Toggle';
import classNames from 'classnames';
import Dialog from 'material-ui/Dialog';
import FlatSelection from 'components/FlatSelection'
import {securedPostCall} from 'utils/httpUtils/apiCallWrapper';
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import ImageUploader from 'components/ImageUploader';
import s3ImageUpload from 'utils/uploader/s3ImageUpload';
import RaisedButton from 'material-ui/RaisedButton';
import Stepper from 'components/Stepper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const maxCount = 100;
const ProviderEntryForm = React.createClass({
    getInitialState() {
      return{
        showSpinner:false
      }  
    },
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
    contextTypes: {
        router: React.PropTypes.object.isRequired
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
        console.log(event.target.value,event.target.name);
        let input = event.target.value;
        let stateKeyName = event.target.name;
        this.props.addProviderInfo({storeKey:stateKeyName,payload:input}); 
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
                this.props.addProviderInfo({
                    storeKey:'imgChanged',
                    payload:false
                });
            }else{
                securedPostCall('/api/providers/registration' , reqBody)
                    .then(()=>self.onAllClear())
            }
        }
    },
    render() {
        let {chars_left, title, description, email,imgUrl,titleErrorMsg, descriptionErrorMsg, cityErrorMsg, emailErrorMsg, keepAddressPrivateFlag,serviceOffered,addtnlComments, includeAddressInEmail,deliveryMinOrder,deliveryRadius,providerAddressJustificationModalOpen,searchText,searchTextErrorMsg,place_id,place_idErrorMsg, providerTypeErrorMsg } = this.props.providerEntryForm.toJS();
        serviceOffered = serviceOffered || 'pickup';
        return (
            <div className="provider-entry-form">
                <Stepper
                    numberofSteps={3}
                    activeStep={1}
                />
                <div className="is-center">
                    <ImageUploader
                        onImageChange = {this.onImageChange}
                        initialImgUrl={imgUrl}
                    />
                </div>
                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <input value={title} type="text" className="pure-u-1" placeholder="*title" name="title" 
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
                        <div>{chars_left}/100</div>
                    
                        <input type="text" className={"pure-u-1"} name="email" placeholder="*email" value={email}
                            onBlur={this.handleChange} 
                            onFocus={this.handleFocus}
                            onChange={this.changeStoreVal}
                        />
                        <div className = "error-message">{(emailErrorMsg)?'*'+emailErrorMsg:undefined}</div>
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
                        <div style={{marginTop:"0.5em"}}>
                            Services offered:
                            <RadioButtonGroup name="serviceOffered" defaultSelected={serviceOffered} onChange={this.changeStoreVal}>
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
                                        Delivery within (miles)
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
                                    <label>Minimum Order for delivery ($)</label>
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
    addProviderErrorMsg:React.PropTypes.func.isRequired,
    providerEntryForm: React.PropTypes.object.isRequired,
    params:React.PropTypes.object,
    fetchSecuredData:React.PropTypes.func.isRequired,
    mode:React.PropTypes.string.isRequired,
    nextLabel:React.PropTypes.string.isRequired,
    linkToRedirectOnAllClear:React.PropTypes.string.isRequired
};
export default ProviderEntryForm;
