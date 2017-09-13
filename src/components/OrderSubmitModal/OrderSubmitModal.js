import React from 'react'
import './../ProviderProfile/providerProfile.scss'
import './orderSubmitModal.scss'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import moment from 'moment';
import * as browserFingerprint from 'browser-fingerprint'
const OrderSubmitModal = createReactClass({
  checkOutOrderDetails:{},
  getInitialState() {
      return {
        submitOrderModalOPen:false,
        showOrderSubmitSpinner:false,
      };
  },
 contextTypes: {
    router: PropTypes.object.isRequired
  },
  closeModal(){
    this.props.openModal({storeKey:'orderSubmitModalOpen', openModal:false});
  },
  confirmOrderSubmit(){
    let self =this;
    let {user} = this.props.globalState.core.toJS();
    // get the spinner going
    this.setState({
      showOrderSubmitSpinner:true
    });
    // (url_to_call, state_property_to_change,action_name_to_be_appended)
    this.props.postSecuredData('/api/order/order-submit','submitOrder','ORDER_SUBMIT',this.checkOutOrderDetails)
      .then(function(response){
        let orderId = (response.payload.data &&response.payload.data.data && response.payload.data.data.message )?response.payload.data.data.message._id :undefined;
        self.setState({
          showOrderSubmitSpinner:false
        });
        self.props.openModal({storeKey:'orderSubmitModalOpen', openModal:false});
        self.props.removeAllCheckedOutItems();
        if(orderId){
          self.context.router.push('/user/'+user._id+'/order-summary?neworder=true&orderId='+orderId);
        }else{
          // TODO: incase something fails
        } 
      });
  },
  componentWillUnmount(){
    this.props.removeAllCheckedOutItems();
  },
  render(){
    const {providerProfileCall, itemsCheckedOut,orderSubmitModalOpen} = this.props.providerProfile.toJS();
    const {user} = this.props.globalState.core.toJS();
    const {addtnlAddressInfo, orderTime, currency} = this.props;
    let data = providerProfileCall.data;
    let self =this;
    let resolvedItemsCheckedOut= [];
    let grandTotal = 0;
    for(var key in itemsCheckedOut){
      if(itemsCheckedOut.hasOwnProperty(key)){
        resolvedItemsCheckedOut.push(itemsCheckedOut[key]);
        // by default checkout quantity as one
        let quantity = itemsCheckedOut[key].quantity || 1;
        grandTotal = grandTotal + parseInt(itemsCheckedOut[key].price * parseInt(quantity));
      }
    };
    // make the checkout object here to be submitted once submit is clicked
    let customerName , customerAddress;
    if(user && user.name){    // this means check if there is some user logged .. which it should be
      // if userAddressSearch.searchText exists that means user entered a new address at Home (/) or search (/search) page which SHOULD already be registered
      customerAddress = user.searchText;
      customerName =(user && user.name)? user.name : undefined;
    }
    this.checkOutOrderDetails={
      _creator:user._id,
      itemsCheckedOut:itemsCheckedOut,
      addtnlAddressInfo: addtnlAddressInfo,
      providerName:(data)?data.title : undefined,
      _providerId:data._id,
      customerName:customerName,
      orderTime: resolvePickUpTime(orderTime),
      providerAddress:(data)?data.displayAddress : undefined,
      customerAddress: customerAddress,
      customerEmailId:user.email,
      providerEmailId:data.email,
      phone:(this.props.phone)? this.props.phone: undefined,
      currency: this.props.currency,
      orderType:this.props.orderType,
      subTotal:this.props.currency + ' ' + grandTotal,
      modeOfPayment:'Cash/CreditCard',
      customerBrowserFingerprint: browserFingerprint()
    }
    // ends here
    return <FullscreenDialog
            open={orderSubmitModalOpen}
            onRequestClose={this.closeModal}
           >
            <div className="order-submit">
              <div className="order-title">
                <div className="order-header">
                  Order summary
                </div>
                <div className="pure-u-1-2">
                  <div className="address-details">
                    <div className="order-address-heading">{this.props.orderType+' '} order:</div>
                      <div>{this.checkOutOrderDetails.customerName}</div>
                      {(this.props.orderType === "Delivery")?
                        <div className="delivery-box">
                          {this.checkOutOrderDetails.customerAddress}
                        </div>
                        :
                        undefined
                      }
                  </div>
                </div>
                <div className="pure-u-1-2">
                  <div className="address-details">
                    <div className="order-address-heading">Provider:</div>
                    <div>{data.name}</div>
                    <div className="delivery-box">{this.checkOutOrderDetails.providerAddress}</div>
                  </div>
                </div>
              </div>
              {
                (this.props.phone)?
                <div className="pure-u-1">
                  <div className="pure-u-2-5">Phone number: </div>
                  <div className="pure-u-3-5">{this.props.phone}</div>
                </div>
                :
                undefined
              }
              {
                (this.props.addtnlAddressInfo)?
                <div className="pure-u-1" style={{marginTop:'0.5em'}}>
                  <div className="pure-u-2-5">Addtnl address info:</div>
                  <div className="pure-u-3-5">{this.props.addtnlAddressInfo}</div>
                </div>
                :
                undefined
              }
              <div className="pure-u-md-1-5 pure-u-1"></div>
              <div className="pure-u-md-4-5 final-total">
                <div className= "grand-total">Total &nbsp; {currency + ' ' +grandTotal}</div>
              </div>
              <div className="order-wrapper">
                <div className="heading" style={{margin:'0 auto'}}>
                  <div className="pure-u-1-4">
                    Name
                  </div>
                  <div className="pure-u-1-4">
                    Quantity
                  </div>
                  <div className="pure-u-1-4">
                    Price
                  </div>
                  <div className="pure-u-1-4">
                    Date
                  </div>
                </div>  
            {
              resolvedItemsCheckedOut.map(function(itemCheckedOut,index){
                return <div key={itemCheckedOut._id} className="order-details">
                <div className="pure-u-1-4 order-detail">{itemCheckedOut.name}</div>
                <div className="pure-u-1-4 order-detail">{itemCheckedOut.quantity}</div>
                <div className="pure-u-1-4 order-detail">{itemCheckedOut.price}</div>
                <div className="pure-u-1-4 order-detail">{moment(itemCheckedOut.orderDate).format("ddd, MMM Do")}</div>
                <div className="pure-u-1 customer-comments order-detail">
                {
                  (itemCheckedOut.addtnlItemOrderInfo)?
                  <div>
                    <span className="comment-intro">Customer remarks:</span>
                    {itemCheckedOut.addtnlItemOrderInfo}
                  </div>
                  :
                  undefined
                }
                  
                </div>
              </div>
              })
            }
              </div>
              <div className="move-center">
                <div style={{display:(this.state.showOrderSubmitSpinner)?'block':'none'}}>
                    <img src= "/general/loading.svg"/>
                </div>
                <RaisedButton
                  label="Submit your order"
                  primary={true}
                  style={{marginTop:'20px'}}
                  onClick={()=>this.confirmOrderSubmit()}
                  disableTouchRipple={true}
                />
              </div>
            </div>
          </FullscreenDialog>
  }
})


export default OrderSubmitModal
