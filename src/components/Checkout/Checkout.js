import React from 'react'
import './../ProviderProfile/providerProfile.scss'
import './checkout.scss'
import Scroll from 'react-scroll'
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import OrderSubmitModal from 'components/OrderSubmitModal';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AsyncAutocomplete from 'components/AsyncAutocomplete'
import {securedGetCall} from 'utils/httpUtils/apiCallWrapper';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';


const Checkout = React.createClass({
  getInitialState() {
      return {
         submitOrderModalOPen:false,
         searchText:'',
         searchTextError:'',
         checkoutSubmitError:''   
      };
  },
  componentDidMount() {
    this.setState({
      pickup:true
    });
  },
  changeStoreVal(event) {
    let foodItemId = event.target.name;
    let updatedQuantity = event.target.value
    this.props.updateCheckedOutQty(foodItemId,updatedQuantity);
  },
  toggleFlags(key){
    this.setState({
      pickup:!this.state.pickup
    })
  },
  deleteCheckedOutItem(event){
    this.props.deleteCheckedOutItem(event.target.name);
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
    const {userAddressSearch} = this.props.globalState.core.toJS();
    const user = providerProfileCall.data;
    let resolvedItemsCheckedOut= [];
    let grandTotal = 0;
    for(var key in itemsCheckedOut){
      if(itemsCheckedOut.hasOwnProperty(key)){
        resolvedItemsCheckedOut.push(itemsCheckedOut[key]);
        let quantity = itemsCheckedOut[key].quantity || 1;
        grandTotal = grandTotal + parseInt(itemsCheckedOut[key].price * parseInt(quantity));
      }
    };
    let self= this;
    return (resolvedItemsCheckedOut && resolvedItemsCheckedOut.length)?
          <div className="checkout">
            <div className="content-subhead">Your Order</div>
            <div>
              {
                (user.doYouDeliverFlag && !user.pickUpFlag)?
                <div>Your delivery order</div>:undefined
              }
              {
                (!user.doYouDeliverFlag && user.pickUpFlag)?
                <div>Your pick-up order</div>:undefined
              }
              {
                (user.doYouDeliverFlag && user.pickUpFlag)?
                <div>
                  <label style={{display:'block',margin:"1em 0"}}>Order type :</label>
                  <RadioButtonGroup name="foodOptions" 
                      valueSelected={this.state.pickup.toString()}
                      onChange={(event)=>this.toggleFlags('pickup')}
                  >
                    <RadioButton
                      value="true"
                      label="pick-up"
                    />
                    <RadioButton
                      value="false"
                      label="delivery"                                    
                    />
                  </RadioButtonGroup>
                  <div>
                  {
                    (userAddressSearch.place_id)?
                      undefined
                      :
                      <div>
                        <div style= {{margin:"1em 0"}}>Please enter your {(this.state.pickup)? 'pick-up ':'delivery '} address</div>
                        <AsyncAutocomplete  name={'searchText'}
                                            userSearchText = {this.state.searchText}
                                            apiUrl = {'/api/locations/addressTypeAssist'}
                                            getSuggestionValue={(suggestion)=>suggestion.address}
                                            onChange = {(event, value)=>this.setState({searchText:value.newValue})}
                                            onSuggestionSelected = {this.onSuggestionSelected}
                        />
                      </div>
                  }
                  </div>
                </div>
                :
                undefined
              }
            </div>
            {
              resolvedItemsCheckedOut.map(function(itemCheckedOut){
                return <div key={itemCheckedOut._id}> 
                          <section className="post">
                            <form className="pure-form">
                              <div>
                                <div className="post-avatar pure-u-md-2-5">
                                  <h2>{itemCheckedOut.name}</h2>
                                  <img alt={itemCheckedOut.name} className = "food-item" src={itemCheckedOut.imgUrl}/>
                                </div>
                                <div className="pure-u-md-3-5">
                                  <div className="checkout-details">
                                    <div className="cross-sign"
                                      onClick={self.deleteCheckedOutItem}
                                    >
                                      <img name={itemCheckedOut._id} src="/general/cancel.png"></img>
                                    </div> 
                                    <div className="post-description">
                                        <table className="pure-table remove-border">
                                          <tbody>
                                              <tr>
                                                  <td className="reduce-padding">Choose</td>
                                                  <td>quantity</td>
                                                  <td>
                                                    <select
                                                      name={itemCheckedOut._id}
                                                      onChange={self.changeStoreVal}
                                                      value={itemCheckedOut.quantity}
                                                    >
                                                      <option value="1">1</option>
                                                      <option value="2">2</option>
                                                      <option value="3">3</option>
                                                      <option value="4">4</option>
                                                      <option value="5">5</option>
                                                      <option value="6">6</option>
                                                    </select>
                                                  </td>                           
                                              </tr>
                                              <tr>
                                                  <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td className = "item-details">ready-date</td>
                                                  <td className ="item-details">
                                                    <select>
                                                      {itemCheckedOut.availability.map(function(availableDate,index){
                                                        return  <option key={index}>
                                                                  {moment(availableDate).format("dd, MMM Do")}
                                                                </option>
                                                      })}
                                                    </select>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td className="reduce-padding">
                                                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                                      <path d="M0 0h24v24H0z" fill="none"/>
                                                    </svg>
                                                  </td>
                                                  <td className = "item-details">price</td>
                                                  <td className = "item-details">{itemCheckedOut.price +' $'}</td>
                                              </tr>
                                              <tr>
                                                  <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td className = "item-details">pick-up</td>
                                                  <td className = "item-details">{resolvePickUpTime(itemCheckedOut.pickUpStartTime)} - {resolvePickUpTime(itemCheckedOut.pickUpEndTime)}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </section>  
                        </div>
              })
            }
            <div style={{textAlign:"center"}}>
            {
              (!userAddressSearch.place_id)?
              <div>Please enter address</div>:undefined
            }
              <RaisedButton
                primary={true}
                label = {'Checkout - '+grandTotal+ '$'}
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
