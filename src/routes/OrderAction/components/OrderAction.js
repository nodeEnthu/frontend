import React from 'react';
import './orderAction.scss';
import {postCall} from 'utils/httpUtils/apiCallWrapper';
import CheckMark from 'components/CheckMark'


const OrderAction = React.createClass({
  getInitialState() {
    return{
      customerId:'',
      orderId:'',
      action:''
    }
  },
  componentDidMount() {
    let {customerId,orderId,action} = this.props.params;
    // send an ajax call for order confirmation to customer
    if(action === 'confirm'){
      postCall('/api/order/'+orderId+'/orderConfirmCustomer',{'orderId':orderId})
      .then(function(err,response){
        // dont do anything
      });
    } else if(action === 'cancel'){
      postCall('/api/order/'+orderId+'/orderCancelCustomer',{'orderId':orderId})
        .then(function(err,response){
      });
    }
  },
  render(){
    let {customerId,orderId,action} = this.props.params;
    console.log(action)
    return( <div>
              {
                (action === 'confirm')?
                  <div style={{ marginBottom:'1em'}}>
                    <CheckMark/>
                    <p>Thanks! order confirmation email has been sent to the customer !</p>
                  </div>
                  :
                  undefined
              }
              {
                (action === 'cancel')?
                  <div style={{ marginBottom:'1em'}}>
                    <p>Thanks! We will send an email to the customer cancelling the order</p>
                  </div>
                  :
                  undefined
              }
            </div>
        )
  }
})

OrderAction.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}
export default OrderAction;