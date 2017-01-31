import React from 'react';
import './orderAction.scss';
import {postCall} from 'utils/httpUtils/apiCallWrapper';
import CheckMark from 'components/CheckMark'


const OrderAction = React.createClass({
  getInitialState() {
    return{
      customerId:'',
      orderId:''
    }
  },
  componentDidMount() {
    let {customerId,orderId} = this.props.params;
    console.log(customerId,orderId);
    // send an ajax call for order confirmation to customer
    postCall('/api/order/'+orderId+'/orderConfirmCustomer',{'orderId':orderId})
      .then(function(err,response){
      });
  },
  render(){
    return(
      <div style={{ marginBottom:'1em'}}>
        <CheckMark/>
        <p>Thanks! order confirmation email has been sent to the customer !</p>
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