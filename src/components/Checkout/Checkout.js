import React from 'react'
import classes from './../ProviderProfile/providerProfile.scss'
import Scroll from 'react-scroll'
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import OrderSubmitModal from 'components/OrderSubmitModal';
const Checkout = React.createClass({
  getInitialState() {
      return {
         submitOrderModalOPen:false   
      };
  },
  changeStoreVal(event) {
    let foodItemId = event.target.name;
    let updatedQuantity = event.target.value
    this.props.updateCheckedOutQty(foodItemId,updatedQuantity);
  },
  deleteCheckedOutItem(event){
    this.props.deleteCheckedOutItem(event.target.name);
  },
  checkOutItems(){
    this.props.openModal({storeKey:'orderSubmitModalOpen', openModal:true})
  },
  render(){
    const {itemsCheckedOut} = this.props.providerProfile.toJS();
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
          <div>
            <div className={classes["content-subhead"]}>Your Order</div>
            {
              resolvedItemsCheckedOut.map(function(itemCheckedOut){
                return <div key={itemCheckedOut._id}> 
                          <section className={classes["post"]}>
                            <form className="pure-form">
                              <div>
                                <div className={classNames(classes["post-avatar"],"pure-u-md-2-5")}>
                                  <img alt={itemCheckedOut.name} className = {classes["food-item"]} src={itemCheckedOut.img}/>
                                </div>
                                <div className="pure-u-md-3-5">
                                  <div className={classes["checkout-details"]}>
                                    <div className={classes["cross-sign"]}
                                      onClick={self.deleteCheckedOutItem}
                                    >
                                      <img name={itemCheckedOut._id} src="/general/cancel.png"></img>
                                    </div> 
                                    <header className={classes["post-header"]}>
                                      <h2 className={classes["post-title"]}>{itemCheckedOut.name}</h2>
                                    </header>
                                    <div className={classes["post-description"]}>
                                        <table className={classNames("pure-table",classes["remove-border"])}>
                                          <tbody>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}>Choose</td>
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
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td className = {classes["item-details"]}>ready on</td>
                                                  <td className = {classes["item-details"]}>{new Date(itemCheckedOut.serviceDate).toDateString()}</td>
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}>
                                                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                                      <path d="M0 0h24v24H0z" fill="none"/>
                                                    </svg>
                                                  </td>
                                                  <td className = {classes["item-details"]}>Price : </td>
                                                  <td className = {classes["item-details"]}>{itemCheckedOut.price +' $'}</td>
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td className = {classes["item-details"]}>pick-up</td>
                                                  <td className = {classes["item-details"]}>3PM - 6PM</td>
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
              <RaisedButton
                primary={true}
                style={{width:'40%'}}
                onClick={this.checkOutItems}
                disableTouchRipple={true}
              >{'Checkout (Grand total '+grandTotal+ '$)'}
              </RaisedButton>
            </div>
            <OrderSubmitModal{... this.props}/>
          </div>
          :
          <div></div>
  }
})


export default Checkout
