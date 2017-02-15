import React from 'react';
import './orderSummary.scss';
import {postCall} from 'utils/httpUtils/apiCallWrapper';
import CheckMark from 'components/CheckMark'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const OrderAction = React.createClass({
  getInitialState() {
    return{
      value: 'a',
      userId:'',
      userType:''
    }
  },
  componentDidMount() {
    const userId = this.props.params.userId;
    //get to know the user ... customer/provider
    const {userType} = this.props.globalState.core.get('user').toJS();
    if(userId){
      this.setState({
        userId:this.props.params.userId,
        userType:userType
      });
      this.props.fetchSecuredData('/api/order/'+userId+'/customer/get', 'ordersAsCustomer','ORDERS_AS_CUSTOMER')
      this.props.fetchSecuredData('/api/order/'+userId+'/provider/get', 'ordersAsProvider','ORDERS_AS_PROVIDER')
    }
  },
  handleChange(value){
    this.setState({
      value: value,
    });
  },
  render(){
    const ordersAsCustomer = this.props.ordersAsCustomer.get('data');
    const ordersAsProvider = this.props.ordersAsProvider.get('data');

    function getResolvedItems(order){
      let itemRows =[];
      let index = 0;
      for(let key in order.itemsCheckedOut){
          if(order.itemsCheckedOut.hasOwnProperty(key)){
            index = index+1;
            itemRows.push(<tr key={key +Math.random()}>
                    <td>{index}</td>
                    <td>{order.itemsCheckedOut[key].name}</td>
                    <td>{order.itemsCheckedOut[key].quantity}</td>
                    <td>{order.itemsCheckedOut[key].price}</td>
                  </tr>);
          }
        }
        return itemRows;
    }
    let queryObj = this.props.location.query;
    return(
         <div className = "order-summary">
           <div className="content pure-u-1">
           {
            (queryObj.neworder && queryObj.orderId)?
              <div style={{ marginBottom:'1em'}}>
                <CheckMark style={{display:'inline', width:'40%'}}/>
                <span>
                  Your order has been submitted to provider. Please wait for a confirmation email after the order is approved by the provider
                </span>
              </div>
              :
              undefined
           }
            
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="Placed" value="a" >
                <div>
                  <h2 style={styles.headline}>Orders Placed</h2>
                  <div>
                      {ordersAsCustomer.map(function(order){
                        return <div key={order._id}>
                                <Card
                                  style={{marginBottom:'1em',border:(order._id === queryObj.orderId)? '1px solid tomato':'inherit'}}
                                >
                                  <CardHeader
                                    title={order.orderType + ' order with  ' + order.providerName}
                                    subtitle={order.providerAddress}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                  />
                                  <CardText
                                    style={{padding:'0px'}}
                                  >
                                    <CardText>
                                    {
                                      (order.mailSentToCustomer)?
                                      <div>
                                        Status: Confirmed, please visit <a href={'/providerProfile/'+order._providerId}> provider page</a> to leave a review
                                      </div>
                                      :
                                      <div>
                                       Status: Awaiting confirmation from provider
                                      </div>
                                    }
                                    </CardText>
                                    <Stepper activeStep={(order.mailSentToCustomer)?2:1} connector={<ArrowForwardIcon />}>
                                      <Step>
                                        <StepLabel style={{fontSize:'0.7em',top:'10px'}}>Submit order</StepLabel>
                                      </Step>

                                      <Step>
                                        <StepLabel style={{fontSize:'0.7em'}}>Receive confirmation e-mail</StepLabel>
                                      </Step>
                                    </Stepper>

                                  </CardText>
                                  <CardText expandable={true} style={{textAlign:'center'}}>
                                    <table className="pure-table pure-table-horizontal" style={{margin:'0 auto'}}>
                                      <thead>
                                          <tr>
                                              <th>#</th>
                                              <th>Item</th>
                                              <th>Quantity</th>
                                              <th>Price</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {getResolvedItems(order)}
                                      </tbody>
                                    </table>
                                  </CardText>
                                </Card>
                               </div>
                      })}
                  </div>
                </div>
              </Tab>
              <Tab label="Received" value="b">
                <div>
                  <h2 style={styles.headline}>Orders Received</h2>
                  <div>
                      {ordersAsProvider.map(function(order){
                        return <div key={order._id}>
                                <Card
                                  style={{marginBottom:'1em',border:(order._id === queryObj.orderId)? '1px solid tomato':'inherit'}}
                                >
                                  <CardHeader
                                    title={order.orderType + ' order with  ' + order.customerName}
                                    subtitle={order.customerAddress}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                  />
                                  <CardText
                                    style={{padding:'0px'}}
                                  >
                                    <CardText>
                                    {
                                      (order.mailSentToCustomer)?
                                      <div>
                                        Status: Confirmed ! 
                                      </div>
                                      :
                                      <div>
                                       Status: Please check your email to take action on this order
                                      </div>
                                    }
                                    </CardText>
                                    <Stepper activeStep={(order.mailSentToCustomer)?2:1} connector={<ArrowForwardIcon />}>
                                      <Step>
                                        <StepLabel style={{fontSize:'0.7em',top:'10px'}}>Submit order</StepLabel>
                                      </Step>

                                      <Step>
                                        <StepLabel style={{fontSize:'0.7em'}}>Sent confirm/cancel email</StepLabel>
                                      </Step>
                                    </Stepper>

                                  </CardText>
                                  <CardText expandable={true} style={{textAlign:'center'}}>
                                    <table className="pure-table pure-table-horizontal" style={{margin:'0 auto'}}>
                                      <thead>
                                          <tr>
                                              <th>#</th>
                                              <th>Item</th>
                                              <th>Quantity</th>
                                              <th>Price</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {getResolvedItems(order)}
                                      </tbody>
                                    </table>
                                  </CardText>
                                </Card>
                               </div>
                      })}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
         </div>
      )
  }
})

OrderAction.propTypes = {
  globalState:React.PropTypes.object.isRequired,
  ordersAsCustomer:React.PropTypes.object.isRequired,
  ordersAsProvider:React.PropTypes.object.isRequired,
  fetchSecuredData:React.PropTypes.func.isRequired
}
export default OrderAction;