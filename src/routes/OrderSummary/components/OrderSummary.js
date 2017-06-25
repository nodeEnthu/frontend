import React from 'react';
import './orderSummary.scss';
import {postCall} from 'utils/httpUtils/apiCallWrapper';
import CheckMark from 'components/CheckMark'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import moment from 'moment';
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

const OrderAction = createReactClass({
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
    const user = this.props.globalState.core.get('user').toJS();
    function getResolvedItems(order){
      let itemRows =[];
      let index = 0;
      for(let key in order.itemsCheckedOut){
          if(order.itemsCheckedOut.hasOwnProperty(key)){
            index = index+1;
            itemRows.push(
                    <div key={key +Math.random()} className="order-details">
                      <div className="pure-u-1-4 order-detail">{order.itemsCheckedOut[key].name}</div>
                      <div className="pure-u-1-4 order-detail">{order.itemsCheckedOut[key].quantity}</div>
                      <div className="pure-u-1-4 order-detail">{order.itemsCheckedOut[key].price}</div>
                      <div className="pure-u-1-4 order-detail">{moment(order.itemsCheckedOut[key].orderDate).format("ddd, MMM Do")}</div>
                      <div className="pure-u-1 customer-comments order-detail">
                      {
                        (order.itemsCheckedOut[key].addtnlItemOrderInfo)?
                        <div>
                          <span className="comment-intro">Customer remarks:</span>
                          {order.itemsCheckedOut[key].addtnlItemOrderInfo}
                        </div>
                        :
                        undefined
                      }
                        
                      </div>
                      
                    </div>
                  );
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
              <div style={{ margin:'1em'}}>
                <CheckMark style={{width:'15%',margin:"0 auto"}}/>
                <span>
                  Awwright!! your order has been submitted to the provider. Once approved we will send you a confirmation email.
                </span>
              </div>
              :
              undefined
           }
            
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="Summary" value="a" >
                <div>
                  <h2 style={styles.headline}>Orders Placed</h2>
                  <div>
                      {ordersAsCustomer.map(function(order){
                        return <div key={order._id}>
                                <Card
                                  style={{marginBottom:'1em',border:(order._id === queryObj.orderId)? '1px solid tomato':'inherit'}}
                                >
                                  <CardHeader
                                    title={order.orderType + ' order with  ' + order.providerName + ' at ' +order.orderTime}
                                    subtitle={'Provider address: ' +order.providerAddress}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                  />
                                {
                                  (order.providerAddtnlInfo)?
                                  <CardText style={{padding:'0 16px'}}>
                                    <span className="comment-intro">Addtnl Provider info:</span>{order.providerAddtnlInfo}
                                  </CardText>
                                  :undefined
                                }
                                  
                                {
                                  (order.addtnlAddressInfo)?
                                  <CardText
                                    style={{padding:'0px 16px'}}
                                  > 
                                    <span className="comment-intro">Addtnl address info:</span>{order.addtnlAddressInfo}
                                  </CardText>
                                  :undefined
                                }
                                {
                                  (order.cancelReason || order.cancelText)?
                                  <CardText
                                    style={{padding:'0px 16px'}}
                                  > 
                                    <span className="comment-intro">Cancel Reason:</span>{order.cancelText}
                                  </CardText>
                                  :undefined
                                }
                                  
                                
                                {
                                  (order.mailSentToCustomer)?
                                    <CardText
                                      style={{padding:'5px 16px'}}
                                    > 
                                      <span className="comment-intro">Status:</span>
                                      {
                                        (order.status ===1)?
                                        <span>
                                          Confirmed, please visit <a href={'/providerProfile/'+order._providerId}> provider page</a> to leave a review
                                        </span>
                                        :
                                        <span>
                                          Oops! your order was cancelled
                                        </span>
                                      }
                                    </CardText>
                                    :
                                    <CardText
                                      style={{padding:'5px 16px'}}
                                    > 
                                      <span className="comment-intro">Status:</span>Awaiting confirmation from provider
                                    </CardText>
                                }
                                    <Stepper activeStep={(order.mailSentToCustomer)?2:1} connector={<ArrowForwardIcon />}>
                                      <Step>
                                        <StepLabel style={{fontSize:'0.7em',top:'10px'}}>Submit order</StepLabel>
                                      </Step>

                                      <Step>
                                        <StepLabel style={{fontSize:'0.7em'}}>Receive provider e-mail</StepLabel>
                                      </Step>
                                    </Stepper>

                                  
                                  <CardText expandable={true} style={{textAlign:'center'}}>
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
                                  {getResolvedItems(order)}
                                  </CardText>
                                </Card>
                               </div>
                      })}
                  </div>
                </div>
              </Tab>
            {(user.userType === 'provider')?
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
                                    title={order.orderType + ' order with  ' + order.customerName + ' at ' +order.orderTime}
                                    subtitle={'Customer Address: ' + order.customerAddress}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                  />
                                  {
                                    (order.providerAddtnlInfo)?
                                    <CardText style={{padding:'0 16px'}}>
                                      <span className="comment-intro">Addtnl Provider info:</span>{order.providerAddtnlInfo}
                                    </CardText>
                                    :undefined
                                  }
                                    
                                  {
                                    (order.addtnlAddressInfo)?
                                    <CardText
                                      style={{padding:'0px 16px'}}
                                    > 
                                      <span className="comment-intro">Addtnl address info:</span>{order.addtnlAddressInfo}
                                    </CardText>
                                    :undefined
                                  }
                                  {
                                    (order.cancelReason || order.cancelText)?
                                    <CardText
                                      style={{padding:'0px 16px'}}
                                    > 
                                      <span className="comment-intro">Cancel Reason:</span>{order.cancelText}
                                    </CardText>
                                    :undefined
                                  }
                                  <CardText
                                    style={{padding:'0px'}}
                                  >
                                    <CardText>
                                    {
                                      (order.mailSentToCustomer)?
                                      <div>
                                        {
                                          (order.status === 1)?
                                          <span>Status: Confirmed! </span>
                                          :
                                          <span>Status: Cancelled! </span>
                                        }
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
                                        <StepLabel style={{fontSize:'0.7em'}}>Send confirm/cancel email</StepLabel>
                                      </Step>
                                    </Stepper>

                                  </CardText>
                                  <CardText expandable={true} style={{textAlign:'center'}}>
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
                                    {getResolvedItems(order)}
                                  </CardText>
                                </Card>
                               </div>
                      })}
                  </div>
                </div>
              </Tab>
              :
              undefined
            }
            </Tabs>
          </div>
         </div>
      )
  }
})

OrderAction.propTypes = {
  globalState:PropTypes.object.isRequired,
  ordersAsCustomer:PropTypes.object.isRequired,
  ordersAsProvider:PropTypes.object.isRequired,
  fetchSecuredData:PropTypes.func.isRequired
}
export default OrderAction;