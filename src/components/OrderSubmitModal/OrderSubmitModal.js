import React from 'react'
import './../ProviderProfile/providerProfile.scss'
import './orderSubmitModal.scss'
import Dialog from 'material-ui/Dialog';
import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from 'react-spinkit'

const OrderSubmitModal = React.createClass({
  checkOutOrderDetails:{},
  getInitialState() {
      return {
        submitOrderModalOPen:false,
        showOrderSubmitSpinner:false,
      };
  },
 contextTypes: {
    router: React.PropTypes.object.isRequired
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
    const {user,userAddressSearch} = this.props.globalState.core.toJS();
    let data = providerProfileCall.data;
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
    if(user && user.name){    // this means there is some user logged .. which it should be
      // if userAddressSearch.searchText exists that means user entered a new address at Home (/) or search (/search) page which SHOULD already be registered
      customerAddress = (userAddressSearch)? userAddressSearch.searchText : user.userSeachLocations[user.deliveryAddressIndex].searchText;
      customerName =(user && user.name)? user.name : undefined;
    } 
    this.checkOutOrderDetails={
      _creator:user._id,
      itemsCheckedOut:itemsCheckedOut,
      providerName:(data)?data.title : undefined,
      _providerId:data._id,
      customerName:customerName,
      providerAddress:(data)?data.loc.searchText:undefined,
      customerAddress: customerAddress,
      customerEmailId:user.email,
      providerEmailId:data.email,
      orderId:'tbd',
      tip:'tbd',
      orderType:'Pickup',
      subTotal:grandTotal,
      modeOfPayment:'Cash/CreditCard'
    }
    // ends here
    return <Dialog
            open={orderSubmitModalOpen}
            onRequestClose={this.closeModal}
           >
            <div className="order-submit">
              <div className="order-title">
                <div className="order-header">
                  Order summary
                </div>
                <hr style={{margin:"1em 0"}}/>
                <div className="pure-u-1-2">
                  <div className="order-address-heading">Deliver to:</div>
                  <div>{this.checkOutOrderDetails.customerName}</div>
                  <div className="delivery-box">
                    {this.checkOutOrderDetails.customerAddress}
                  </div>
                </div>
                <div className="pure-u-1-2 provider-address">
                  <div className="order-address-heading">Provider:</div>
                  <div>{data.name}</div>
                  <div className="delivery-box">{this.checkOutOrderDetails.providerAddress}</div>
                </div>
              </div>
              <table className="pure-table pure-table-horizontal" style={{margin: "0px auto", marginTop:"1em"}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    resolvedItemsCheckedOut.map(function(itemCheckedOut,index){
                      return <tr key={itemCheckedOut._id}>
                              <td>{index+1}</td>
                              <td>{itemCheckedOut.name}</td>
                              <td>{itemCheckedOut.quantity}</td>
                              <td>{itemCheckedOut.price}</td>
                            </tr>
                    })
                  }
                </tbody>
              </table>
              <div className="move-center">
                <Spinner spinnerName='circle' 
                  style = {{ 
                              display:(this.state.showOrderSubmitSpinner)?'block':'none'
                          }}
                />
                <RaisedButton
                  label="Submit your order"
                  primary={true}
                  style={{marginTop:'20px'}}
                  onClick={()=>this.confirmOrderSubmit()}
                  disableTouchRipple={true}
                />
              </div>
            </div>
          </Dialog>
  }
})


export default OrderSubmitModal
