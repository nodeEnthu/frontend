import React from 'react';
import './orderAction.scss';
import {getCall,postCall} from 'utils/httpUtils/apiCallWrapper';
import CheckMark from 'components/CheckMark'
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import createReactClass from 'create-react-class'
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {CANCEL_REASONS} from 'routes/Search/constants/searchFilters'
import * as browserFingerprint from 'browser-fingerprint'

const OrderAction = createReactClass({
  getInitialState() {
    return{
      customerId:'',
      orderId:'',
      action:'',
      order:undefined,
      addtnlAddressInfo:undefined,
      providerAddress:undefined,
      updatedByProvider:false,
      showSpinner:false,
      showCheckMark:false,
      showCrossMark:false,
      deleteItemModalOpen:false,
      cancelReason:undefined,
      cancelText:''
    }
  },
  componentDidMount() {
    let {customerId,orderId,action} = this.props.params;
    let self = this;
    // get the details of an order
    getCall('/api/order/'+orderId,{'orderId':orderId})
      .then(function(response){
        self.setState({order: response.data});
        self.setState({providerAddress: response.data.providerAddress})
      });
  },
  openDeleteModal(){
    this.setState({deleteItemModalOpen:true});
  },
  updateOrder(){
    let {order,addtnlAddressInfo,providerAddress,updatedByProvider,cancelReason,cancelText} = this.state;
    order.providerAddtnlInfo  = addtnlAddressInfo;
    order.providerAddress = providerAddress;
    order.updatedByProvider = updatedByProvider;
    order.cancelReason = cancelReason;
    order.cancelText = cancelText;
    order.providerBrowserFingerprint = browserFingerprint();
    return order;
  },
  cancelOrder(){
    let self = this;
    let {customerId,orderId,action} = this.props.params;
    this.setState({showSpinner:true, deleteItemModalOpen:false});
    const order = this.updateOrder();
    postCall('/api/order/'+orderId+'/orderCancelCustomer',order)
        .then(function(err,response){
          self.setState({showSpinner:false});
          self.setState({showCrossMark:true});
          if(response.data.message.status=0){
            self.setState({showCrossMark:true});
          }
        });
  },
  confirmOrder(){
    let self = this;
    this.setState({showSpinner:true});
    const order = this.updateOrder();
    let {orderId} = this.props.params;
    postCall('/api/order/'+orderId+'/orderConfirmCustomer',order)
      .then(function(response){
        self.setState({showSpinner:false});
        // if success
        if(response.data.message.status=1){
          self.setState({showCheckMark:true});
        }
      });
  },
  onChange(event){
    let inputName =  event.target.name;
    let value = event.target.value;
    this.setState({[inputName]: value});
    this.setState({updatedByProvider:true});
  },
  render(){
    let self = this;
    let {customerId,orderId,action} = this.props.params;
    let {order,addtnlAddressInfo,providerAddress,showCheckMark,showSpinner,showCrossMark,deleteItemModalOpen,cancelReason,cancelText} = this.state;
    let resolvedItemsCheckedOut=[];
    if(order && order.itemsCheckedOut){
      let itemsCheckedOut = order.itemsCheckedOut;
      for(var key in itemsCheckedOut){
        if(itemsCheckedOut.hasOwnProperty(key)){
          resolvedItemsCheckedOut.push(itemsCheckedOut[key]);
        }
      }
    }
    return (order && order.itemsCheckedOut)?
          <div className="order-action">
              <div className="checkout-title">{order.orderType +' order at ' + order.orderTime}</div>
                <div className="checkout-section-wrapper">
                  <div className="pure-u-md-1-5 pure-u-1 checkout-label">Your Address</div>
                    <div className="pure-u-md-4-5">
                      <form className="pure-form pure-form-stacked">
                        <input className="pure-u-md-4-5 pure-u-1"type="text" value={providerAddress || ''} name="providerAddress" onChange={this.onChange}></input>
                      </form>
                    </div>
                    <div className="pure-u-md-1-5 pure-u-1 checkout-label display-none-small"></div>
                    <div className="pure-u-md-3-5 is-center">
                      <form className="pure-form pure-form-stacked">
                        <textarea className = "pure-u-1" name="addtnlAddressInfo" placeholder="Additional comments about the order and your location (for pick-up) order goes here" value={addtnlAddressInfo || ''} onChange={this.onChange}/>
                      </form>
                    </div>
                 
                </div>
               
            <div className="checkout-section-wrapper">
              <div className="pure-u-md-1-5 pure-u-1 checkout-label">Order details</div>
              <div className="pure-u-md-4-5">
                <div className= "grand-total">Total &nbsp; {order.subTotal}</div>
              </div>
              {
                resolvedItemsCheckedOut.map(function(itemCheckedOut){
                  return <div key={itemCheckedOut._id} className="checked-out-item-wrapper">
                          <div className="pure-u-1 checkout-sec-1">
                            <div className="pure-u-4-5">
                              <div className="pure-u-1 pure-u-md-1-3 item-wo-desc item-title">
                                <span>{itemCheckedOut.name}</span>
                              </div>
                              <div className="pure-u-1 pure-u-md-1-3">
                                <div className="pure-u-1 item-property">
                                  Quantity
                                </div>
                                  <span className="quantity">{itemCheckedOut.quantity}</span>
                              </div>
                            </div>
                            <div className="pure-u-1-5 item-wo-desc">
                               <span>{itemCheckedOut.displayPrice || '$ '+itemCheckedOut.price}</span>
                            </div>
                          </div>
                          <div className="pure-u-1 checkout-sec-2">
                            <div className="pure-u-md-1-3">
                              <div className="date-wrapper">
                                <div className="pure-u-1 item-property">
                                  Date
                                </div>
                                 <div className="item-wi-desc">{moment(itemCheckedOut.orderDate).format("dd, MMM Do")}</div>
                              </div>
                            </div>
                            <div className="pure-u-md-1-3 display-none-small">
                              <div className="quantity-wrapper">
                                <div className="pure-u-1 item-property">
                                  Order Type
                                </div>
                                <div className="item-wi-desc">{order.orderType}</div>
                              </div>
                            </div>
                           
                              <div className="pure-u-1 pure-u-md-1-3">
                                <form className="pure-form pure-form-stacked">
                                  <textarea className = "pure-u-1" name="addtnlItemOrderInfo" disabled={"true"} value={itemCheckedOut.addtnlItemOrderInfo}/>
                                </form>
                              </div>
                              
                            
                          </div>   
                        </div>
                })
              }
            </div>
            { (!order.mailSentToCustomer && !showCheckMark && !showCrossMark )?
              <div className="is-center" style={{marginTop:'2em'}}>
                  <div style={{display:(showSpinner)?'block':'none'}}>
                    <img src= "/general/loading.svg"/>
                  </div>
                 <RaisedButton label="Cancel"
                  style={{marginRight:'10%',width:"35%",height:'3em',lineHeight:"3em"}}
                  labelStyle={{fontSize:"105%"}}
                  disableTouchRipple={true}
                  onClick={()=>this.setState({deleteItemModalOpen:true})}
                 />
                <RaisedButton
                  primary={true}
                  label = "Confirm"
                  style={{marginLeft:'10%',width:"35%",height:'3em',lineHeight:"3em"}}
                  labelStyle={{fontSize:"105%"}}
                  disableTouchRipple={true}
                  onClick={this.confirmOrder}
                >
                </RaisedButton>
              </div>
              :
              undefined
            }
              <div style={{display:(showCheckMark)?'block':'none'}} className="order-result">
                <CheckMark style={{width:'15%',margin:"0 auto"}}/>
                <div className="action-taken-message">Success! Your confirmation email has been sent to the customer</div>
              </div>
              <div style={{display:(showCrossMark)?'block':'none'}} className="order-result">
                Your cancellation email has been sent to the customer
              </div>
            {
              (order.mailSentToCustomer)?
              <div className="is-center action-taken-message">
                You have already taken action on this order.
                <span style={{fontWeight:'600'}}>{(order.status === 1)? ' Confirmation ':' Cancellation '}</span> 
                email was sent to the customer
              </div>
              :
              undefined
            }
            <Dialog
                    open={deleteItemModalOpen}
                    onRequestClose={()=>this.setState({deleteItemModalOpen:false})}
                  >
                  <div style={{textAlign:"center"}}>
                    <p>
                      Are you sure you want to cancel the order ?
                    </p>
                    <p>
                      You will not be able to take any further action on this order
                    </p>
                    <DropDownMenu value={cancelReason} onChange={(event, index, value)=>self.setState({cancelReason:value})}
                                  iconStyle={{fill:"rgb(0, 0, 0)"}}
                                  underlineStyle={{borderTop:"1px solid black"}}
                    >
                      <MenuItem style={{width:'100%'}} value={undefined} primaryText={'Please select reason'}/>
                      {
                        CANCEL_REASONS.map(function(reason,index){
                          return <MenuItem style={{width:'100%'}} key={index} value={reason.value} primaryText={reason.label}/>
  
                        })
                      }
                    </DropDownMenu>
                    {
                      (cancelReason === 6)?
                      <form className="pure-form pure-form-stacked">
                        <textarea className = "pure-u-1" value={cancelText} placeholder="Please type reason for cancellation here" onChange={(event)=>this.setState({cancelText:event.target.value})}/>
                      </form>
                      :
                      undefined
                    }
                    <div>
                      {
                        (cancelReason === 6 && !cancelText)?
                        <div style={{padding:"0.5em"}}>
                          Please type the reason for cancel
                        </div>
                        :
                        undefined
                      }
                          
                        <RaisedButton label="No"
                            onTouchTap={()=>this.setState({deleteItemModalOpen:false})}
                        />
                        <div className="pure-u-1-12">
                        </div>
                        <RaisedButton 
                          backgroundColor="red" 
                          label="Yes" 
                          onTouchTap={(event)=>this.cancelOrder()}
                          disabled={((cancelReason === 6 && !cancelText) || (!cancelReason &&  cancelReason!=0)) ? true:false}
                        />
                    </div>
                  </div>
                 </Dialog>
            </div>
          :
          <div></div>
  }
})

OrderAction.propTypes = {}
export default OrderAction;