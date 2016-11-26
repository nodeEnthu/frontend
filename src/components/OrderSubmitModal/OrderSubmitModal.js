import React from 'react'
import './../ProviderProfile/providerProfile.scss'
import Modal from 'react-modal';
import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth:'50%',
        minHeight:'60%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const OrderSubmitModal = React.createClass({
  checkOutOrderDetails:{},
  getInitialState() {
      return {
        submitOrderModalOPen:false,
      };
  },
  closeModal(){
    this.props.openModal({storeKey:'orderSubmitModalOpen', openModal:false});
  },
  confirmOrderSubmit(){
    // (url_to_call, state_property_to_change,action_name_to_be_appended)
    this.props.postSecuredData('/api/emails/order-submit','orderSubmit','ORDER_SUBMIT',this.checkOutOrderDetails);
    this.props.openModal({storeKey:'orderSubmitModalOpen', openModal:false});
    this.props.removeAllCheckedOutItems();  
  },
  componentWillUnmount() {
    this.props.removeAllCheckedOutItems();  
  },
  render(){
    const {providerProfileCall, itemsCheckedOut,orderSubmitModalOpen} = this.props.providerProfile.toJS();
    const {user} = this.props.globalState.core.toJS();
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
    console.log();
    this.checkOutOrderDetails={
      itemsCheckedOut:itemsCheckedOut,
      providerName:(data)?data.title : undefined,
      customerName:(user && user.name)?user.name : undefined,
      providerAddress:(data)?data.loc.searchText:undefined,
      customerAddress: (user && user.name) ? user.userSeachLocations[user.deliveryAddressIndex].searchText:undefined,
      orderId:'tbd',
      tip:'tbd',
      orderType:'Pickup',
      subTotal:grandTotal,
      modeOfPayment:'Cash/CreditCard'
    }
    // ends here

    return <Modal
            isOpen={orderSubmitModalOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >
            <div className="order-submit">
              <div className="order-title">
                <div className="order-header">
                  Order summary
                </div>
                <div className="pure-u-1 pure-u-md-1-2">
                  <div className="order-address-heading">Deliver to:</div>
                  <div>{this.checkOutOrderDetails.customerName}</div>
                  <div className="delivery-box">
                    {this.checkOutOrderDetails.customerAddress}
                  </div>
                </div>
                <div className="pure-u-1 pure-u-md-1-2 provider-address">
                  <div className="order-address-heading">Provider:</div>
                  <div>{data.name}</div>
                  <div className="delivery-box">{this.checkOutOrderDetails.providerAddress}</div>
                </div>
              </div>
              <table className="pure-table pure-table-horizontal">
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
                <RaisedButton
                  label="Submit your order"
                  primary={true}
                  style={{marginTop:'20px'}}
                  onClick={()=>this.confirmOrderSubmit()}
                  disableTouchRipple={true}
                />
              </div>
            </div>
          </Modal>
  }
})


export default OrderSubmitModal
