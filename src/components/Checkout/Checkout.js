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
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import {amber900} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const Checkout = React.createClass({
  getInitialState() {
      return {
         submitOrderModalOPen:false,
         searchText:this.props.globalState.core.get('userAddressSearch').get('searchText'),
         searchTextError:'',
         checkoutSubmitError:'',
         addtnlAddressInfo:'',
         pickup:true   
      };
  },
  componentDidMount() {
    this.setState({
      pickup:true
    });
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
  onChange(event){
    this.setState({[event.target.name]:event.target.value});
  },
  checkOutItems(){
    this.props.openModal({storeKey:'orderSubmitModalOpen', openModal:true})
  },
  onSuggestionSelected(event,{suggestion}){
    this.props.userAddressSearchChange(suggestion.address);
    this.props.userAddressUpdatePlaceId(suggestion.place_id);
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
    const{addtnlAddressInfo} = this.state;
    const {userAddressSearch} = this.props.globalState.core.toJS();
    const provider = providerProfileCall.data;
    let resolvedItemsCheckedOut= [];
    let addtnlItemOrderInfo, grandTotal = 0;
    for(var key in itemsCheckedOut){
      if(itemsCheckedOut.hasOwnProperty(key)){
        resolvedItemsCheckedOut.push(itemsCheckedOut[key]);
        let addtnlItemOrderInfo = itemsCheckedOut[key].addtnlItemOrderInfo || '';
        itemsCheckedOut[key].orderDate = itemsCheckedOut[key].orderDate || itemsCheckedOut[key].availability[0];
        grandTotal = grandTotal + parseInt(itemsCheckedOut[key].price * parseInt(itemsCheckedOut[key].quantity));
      }
    };
    let self= this;
    return (resolvedItemsCheckedOut && resolvedItemsCheckedOut.length)?
          <div className="checkout">
            <div className="content-subhead">Checkout</div>
            <div className="checkout-section-wrapper">
              {
                (provider.serviceOffered === 2 ||  this.state.pickup.toString() ==="false")?
                <div className="checkout-label">Your delivery order</div>:undefined
              }
              {
                (provider.serviceOffered === 1 ||  this.state.pickup.toString() ==="true")?
                <div className="checkout-label">Your pick-up order</div>:undefined
              }
              {
                (provider.serviceOffered ===3)?
                <div>
                  <label className="checkout-label" style={{display:'block',margin:"0.5em 0"}}>Order type</label>
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
            <div className="checkout-section-wrapper">
              <div className="pure-u-md-1-5 pure-u-1 checkout-label">Your Address</div>
              <div className="pure-u-md-4-5">
                <AsyncAutocomplete  name={'searchText'}
                                    userSearchText = {this.state.searchText}
                                    apiUrl = {'/api/locations/addressTypeAssist'}
                                    getSuggestionValue={(suggestion)=>suggestion.address}
                                    onChange = {(event, value)=>this.setState({searchText:value.newValue})}
                                    onSuggestionSelected = {this.onSuggestionSelected}
                />
               
                {
                  (!userAddressSearch.place_id)?
                  <div>Please enter address</div>:undefined
                }
              </div>
              <div className="pure-u-md-1-5 pure-u-1 checkout-label display-none-small"></div>
              <div className="pure-u-md-3-5 is-center">
                <form className="pure-form pure-form-stacked">
                  <textarea className = "pure-u-1" name="addtnlAddressInfo" placeholder="Landmarks / apartment number etc." value={addtnlAddressInfo} onChange={this.onChange}/>
                </form>
              </div>
            </div>
            <div className="checkout-section-wrapper">
              <div className="pure-u-md-1-5 pure-u-1 checkout-label">Your Order</div>
              <div className="pure-u-md-4-5">
                <div className= "grand-total">Total &nbsp; {'$ '+grandTotal}</div>
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
                               <span>{'$ '+itemCheckedOut.price}</span>
                            </div>
                          </div>
                          <div className="pure-u-1 checkout-sec-2">
                            <div className="pure-u-md-1-3">
                              <div className="pure-u-1 item-property">
                                Date & Time
                              </div>
                              <DropDownMenu value={itemCheckedOut.orderDate} onChange={(event, index, value)=>self.changeStoreVal(itemCheckedOut._id,'orderDate',value)}
                                            iconStyle={{fill:"rgb(0, 0, 0)"}}
                                            underlineStyle={{borderTop:"1px solid black"}}
                              >
                                {itemCheckedOut.availability.map(function(availableDate,index){
                                    return <MenuItem key={index} value={availableDate} primaryText={moment(availableDate).format("dd, MMM Do")} />
                                  })}
                              </DropDownMenu>
                                
                                {/*resolvePickUpTime(itemCheckedOut.pickUpStartTime)} - {resolvePickUpTime(itemCheckedOut.pickUpEndTime)*/}
                            </div>
                            <div className="pure-u-md-1-3 display-none-small">
                              <div className="pure-u-1 item-property">
                                Order Type
                              </div>
                              <div className="item-wi-desc">{(self.state.pickup)? 'Pickup ':'Delivery '}</div>
                            </div>
                            <div className="pure-u-md-1-3">
                              <form className="pure-form pure-form-stacked">
                                <textarea className = "pure-u-1" name="addtnlItemOrderInfo" placeholder="Add more information how you yant your meal to be cooked" value={addtnlItemOrderInfo} onChange={(event)=>self.changeStoreVal(itemCheckedOut._id,event.target.name,event.target.value)}/>
                              </form>
                            </div>
                          </div>   
                        </div>
                })
              }
            </div>
            <div className="is-center">
              <RaisedButton
                primary={true}
                label = "Place Order"
                onClick={this.checkOutItems}
                disableTouchRipple={true}
                disabled={(!userAddressSearch.place_id)?true:false}
              >
              </RaisedButton>
            </div>
            <OrderSubmitModal{... this.props}
              orderType={(this.state.pickup)?'Pickup':'Delivery'}/>
          </div>
          :
          <div></div>
  }
})


export default Checkout
