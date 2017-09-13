import React from 'react'
import './../ProviderProfile/providerProfile.scss'
import './checkout.scss'
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import OrderSubmitModal from 'components/OrderSubmitModal';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import {securedGetCall} from 'utils/httpUtils/apiCallWrapper';
import {timeOfDay} from 'components/FoodItemEntryForm/constants';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import {amber900} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {DATES} from 'routes/Search/constants/searchFilters'
import createReactClass from 'create-react-class'
import PhoneVerification from 'components/PhoneVerification'
const Checkout = createReactClass({
  getInitialState() {
      return {
         submitOrderModalOPen:false,
         searchText:this.props.globalState.core.get('user').get('searchText'),
         searchTextError:'',
         checkoutSubmitError:'',
         addtnlAddressInfo:'',
         orderTime:undefined,
         pickup:true,
         phone:'',
         code:'',
         verified:false
      };
  },
  componentDidMount() {
    let {phone} = this.props.globalState.core.get('user').toJS();
    this.setState({phone:phone});
    if(phone) this.setState({verified:true});
  },
  changePhoneAttr(obj){
    this.setState({[obj.storeKey]:obj.payload});
    if(obj.storeKey === 'verified' && obj.payload === true && this.state.phone)
      this.props.updateUser('phone',this.state.phone);
    if(obj.storeKey === 'phone'){
      let {phone} = this.props.globalState.core.get('user').toJS();
      console.log(phone, obj.payload, (obj.payload === phone) );
      if(obj.payload === phone) this.setState({verified: true});
      else this.setState({verified: false});

    }
  },
  componentDidUpdate(prevProps, prevState) {
    const {itemsCheckedOut,providerProfileCall} = this.props.providerProfile.toJS();
    for(var key in itemsCheckedOut){
      if(itemsCheckedOut[key].avalilabilityType === 'specificDates'){
        // take the first date
        if(!itemsCheckedOut[key].orderDate){
          // dates may be past so lets check first
          for(var i=0; i< itemsCheckedOut[key].availability.length ; i++){
            if(moment(itemsCheckedOut[key].availability[i]).startOf('day').utc().isSameOrAfter(moment().startOf('day').utc())){
              this.changeStoreVal(key,'orderDate',itemsCheckedOut[key].availability[i]);
              break;
            }
          }
        }
      } else{
        if(!itemsCheckedOut[key].orderDate){
          this.changeStoreVal(key,'orderDate',moment().add(itemsCheckedOut[key].placeOrderBy,"days").startOf('day').utc().toISOString())
        }
      }
    }
  },
  changeStoreVal(foodItemId,storeKey,val) {
    this.props.updateCheckedOutItem(foodItemId,storeKey,val);
  },
  toggleFlags(key){
    this.setState({
      pickup:!this.state.pickup
    })
  },
  deleteCheckedOutItem(foodId){
    this.props.deleteCheckedOutItem(foodId);
  },
  onChange(event,key,val){
    if(event){
      this.setState({[event.target.name]:event.target.value})
    }else{
      this.setState({[key]:val});
    }
  },
  checkOutItems(){
    this.props.openModal({storeKey:'orderSubmitModalOpen', openModal:true})
  },
  onSuggestionSelected(event,{suggestion}){
    this.props.updateUser('searchText',suggestion.address);
    this.props.updateUser('place_id',suggestion.place_id);
    // also register this address in the address book if the user is logged in
    if(this.props.globalState.core.get('userLoggedIn')){
      //register this at a new location if possible as the user needs to be logged in for this
        // register the address as most recently used
        if(suggestion.place_id){
          securedGetCall('/api/locations/registerMostRecentSearchLocation',{address:suggestion.address,place_id:suggestion.place_id})
            .then(function(result){
              // dont do anything
            });   
        }
    } 
  },
  render(){
    const {itemsCheckedOut,providerProfileCall} = this.props.providerProfile.toJS();
    const{addtnlAddressInfo,orderTime, verified,phone, code} = this.state;
    let {user} = this.props.globalState.core.toJS();
    let {place_id,searchText} = user;
    const provider = providerProfileCall.data;
    let resolvedItemsCheckedOut= [];
    let grandTotal = 0;
    for(var key in itemsCheckedOut){
      if(itemsCheckedOut.hasOwnProperty(key)){
        resolvedItemsCheckedOut.push(itemsCheckedOut[key]);
        grandTotal = grandTotal + parseInt(itemsCheckedOut[key].price * parseInt(itemsCheckedOut[key].quantity));
      }
    };
    const orderType = (provider.serviceOffered === 3 ||  (provider.serviceOffered === 2 && this.state.pickup.toString() ==="false") )? "Delivery": "Pickup"
    const currency = (provider.currency && provider.currency != 'undefined')? provider.currency : '$';
    let self= this;
    return (resolvedItemsCheckedOut && resolvedItemsCheckedOut.length)?
          <div className="checkout">
            <div className="content-subhead">Checkout</div>
            <div className="checkout-section-wrapper">
              {
                (provider.serviceOffered === 3 ||  (provider.serviceOffered === 2 && this.state.pickup.toString() ==="false") )?
                <span className="checkout-label">Delivery time</span>:undefined
              }
              {
                (provider.serviceOffered === 1 || (provider.serviceOffered === 2 && this.state.pickup.toString() === "true"))?
                <span className="checkout-label">Pickup time</span>:undefined
              }
              <DropDownMenu value={orderTime} onChange={(event, index, value)=>this.onChange(undefined,'orderTime',value)}
                            iconStyle={{fill:"rgb(0, 0, 0)"}}
                            underlineStyle={{borderTop:"1px solid black"}}
              >
                <MenuItem style={{width:'100%'}} value={undefined} primaryText={"please select"}/>
                {
                  timeOfDay().map(function(time,index){
                      return <MenuItem style={{width:'100%'}} key={time.value} value={time.value} primaryText={time.label}/>
                  })
                }
              </DropDownMenu>
              <form className="pure-form">
                  <div style={{marginBottom:'0.5em'}}>Your contact phone number for provider:</div>
                  <PhoneVerification
                      phone={phone}
                      code={code}
                      changePhoneAttr={this.changePhoneAttr}
                      verified={verified}
                      style={{marginTop:'0.5em'}}
                  />
              </form>
              {
                (provider.serviceOffered ===2)?
                <div>
                  <label style={{display:'block',margin:"0.5em 0"}}>Order type:</label>
                  <RadioButtonGroup name="foodOptions" 
                      valueSelected={this.state.pickup.toString()}
                      onChange={(event)=>this.toggleFlags('pickup')}
                  >
                    <RadioButton
                      value="true"
                      label="pickup"
                    />
                    <RadioButton
                      value="false"
                      label="delivery"                                    
                    />
                  </RadioButtonGroup>  
                </div>
                :
                undefined
              }
            </div>
            <form className="pure-form">
            {
              ((provider.serviceOffered === 3 ||  (provider.serviceOffered === 2 && this.state.pickup.toString()) ==="false")
                || !place_id
                )?
                <div className="checkout-section-wrapper">
                  <div style={{marginTop: "1em"}}className="pure-u-md-1-5 pure-u-1">Your Address</div>
                  <div className="pure-u-md-4-5">

                    <AsyncAutocomplete  name={'searchText'}
                                        userSearchText = {this.state.searchText}
                                        apiUrl = {'/api/locations/addressTypeAssist'}
                                        getSuggestionValue={(suggestion)=>suggestion.address}
                                        onChange = {(event, value)=>this.setState({searchText:value.newValue})}
                                        onSuggestionSelected = {this.onSuggestionSelected}
                    />
                  </div>
                { (provider.serviceOffered === 3 ||  (provider.serviceOffered === 2 && this.state.pickup.toString()) ==="false")?
                  <div>
                    <div className="pure-u-md-1-5 pure-u-1 checkout-label display-none-small"></div>
                    <div className="pure-u-md-3-5 is-center">
                      <textarea className = "pure-u-1" name="addtnlAddressInfo" placeholder="Landmarks / apartment number etc. which will help provider to deliver" value={addtnlAddressInfo} onChange={this.onChange}/>
                    </div>
                  </div>
                  :
                  undefined
                }
                </div>
                :
                undefined
            }
            </form>
            <div className="checkout-section-wrapper">
              <div className="pure-u-md-1-5 pure-u-1 checkout-label"></div>
              <div className="pure-u-md-4-5">
                <div className= "grand-total">Total &nbsp; {currency + ' ' +grandTotal}</div>
              </div>
              {
                resolvedItemsCheckedOut.map(function(itemCheckedOut){
                  return <div key={itemCheckedOut._id} className="checked-out-item-wrapper">
                          <div className="pure-u-1 checkout-sec-1">
                            <div className="pure-u-4-5">
                              <div className="pure-u-1 pure-u-md-1-3 item-wo-desc">
                                <IconButton onTouchTap={()=>self.deleteCheckedOutItem(itemCheckedOut._id)}
                                            style={{float:"left"}}>
                                  <ActionHighlightOff/>
                                </IconButton>
                                <span>{itemCheckedOut.name}</span>
                              </div>
                              <div className="pure-u-1 pure-u-md-1-3">
                                <div className="pure-u-1 item-property display-none-small">
                                  Quantity
                                </div>
                                <div className="pure-u-1 item-wi-desc item-quantity">
                                  <IconButton onTouchTap={()=>self.changeStoreVal(itemCheckedOut._id,'quantity',(itemCheckedOut.quantity===0)? 0 : --itemCheckedOut.quantity)}
                                              style={{width:'60px'}}>
                                    <ContentRemoveCircle color={amber900}/>
                                  </IconButton>
                                  <span className="quantity">{itemCheckedOut.quantity}</span>
                                  <IconButton onTouchTap={()=>self.changeStoreVal(itemCheckedOut._id,'quantity',++itemCheckedOut.quantity)}
                                              style={{width:'60px'}}>
                                    <ContentAddCircle color={amber900}/>
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                            <div className="pure-u-1-5 item-wo-desc">
                               <span>{(itemCheckedOut.displayPrice && itemCheckedOut.displayPrice !="undefined")? itemCheckedOut.displayPrice :'$ '+itemCheckedOut.price}</span>
                            </div>
                          </div>
                          <div className="pure-u-1 checkout-sec-2">
                            <div className="pure-u-md-1-3">
                              <div className="pure-u-1 item-property">
                                Date
                              </div>
                              { (itemCheckedOut.avalilabilityType === 'specificDates')?
                                <DropDownMenu value={itemCheckedOut.orderDate} onChange={(event, index, value)=>self.changeStoreVal(itemCheckedOut._id,'orderDate',value)}
                                              iconStyle={{fill:"rgb(0, 0, 0)"}}
                                              underlineStyle={{borderTop:"1px solid black"}}
                                >
                                  {itemCheckedOut.availability.map(function(availableDate,index){
                                      if(moment(availableDate).isSameOrAfter(moment().startOf('day').utc())){
                                        return <MenuItem key={index} value={availableDate} primaryText={moment(availableDate).format("dd, MMM Do")} />
                                      }
                                    }
                                  )}
                                </DropDownMenu>
                                :
                                <DropDownMenu value={itemCheckedOut.orderDate} onChange={(event, index, value)=>self.changeStoreVal(itemCheckedOut._id,'orderDate',value)}
                                              iconStyle={{fill:"rgb(0, 0, 0)"}}
                                              underlineStyle={{borderTop:"1px solid black"}}
                                >
                                  {
                                    DATES(7,"ddd, MMM D","add").map(function(date,index){
                                      return (moment().add(itemCheckedOut.placeOrderBy,"days").startOf('day') <= moment(date.value).startOf('day').utc())?
                                              <MenuItem style={{width:'100%'}} key={index} value={date.value} primaryText={date.title}/>
                                              :
                                              undefined
                                    })
                                  }
                                </DropDownMenu>
                              }
                            </div>
                            <div className="pure-u-md-1-3 display-none-small">
                              <div className="pure-u-1 item-property">
                                Order Type
                              </div>
                              <div className="item-wi-desc">{(self.state.pickup)? 'Pickup ':'Delivery '}</div>
                            </div>
                            <div className="pure-u-md-1-3">
                              <form className="pure-form pure-form-stacked">
                                <textarea className = "pure-u-1" name="addtnlItemOrderInfo" placeholder="Add more information how you yant your meal to be cooked" value={itemCheckedOut.addtnlItemOrderInfo || ''} onChange={(event)=>self.changeStoreVal(itemCheckedOut._id,event.target.name,event.target.value)}/>
                              </form>
                            </div>
                          </div>   
                        </div>
                })
              }
            </div>
            <div className="is-center">
            {
              (!orderTime)?
                <div className="error">Please select your pickup/delivery time</div>
                :
                undefined
            }
            {
              (!place_id)?
              <div className="error">Please enter your address</div>:undefined
            }
            {
              (!verified)?
              <div className="warning">Please provide one time verified contact number for provider</div>:undefined
            }
            <RaisedButton
              primary={true}
              label = "Place Order"
              onClick={this.checkOutItems}
              disableTouchRipple={true}
              disabled={(!place_id || !orderTime)?true:false}
            >
            </RaisedButton>
            
            </div>
            <OrderSubmitModal{... this.props}
              addtnlAddressInfo={this.state.addtnlAddressInfo}
              orderTime={this.state.orderTime}
              orderType={orderType}
              currency={currency}
              grandTotal={grandTotal}
              phone={user.phone}
              verified={verified}
            />
          </div>
          :
          <div></div>
  }
})


export default Checkout
