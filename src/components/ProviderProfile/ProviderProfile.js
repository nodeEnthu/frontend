import React from 'react'
import ReactDOM from 'react-dom'
import classes from './providerProfile.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import StaffImg from './img/common/staff-thumb-placeholder-male.jpg'
import ItalianFood from './img/common/italian.jpg'
import StarRatingComponent from 'react-star-rating-component';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Scroll from 'react-scroll'
import Modal from 'react-modal';

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
const ProviderProfile = React.createClass({
  checkOutOrderDetails:{},
  getInitialState() {
      return {
          counter:0,
          itemCheckOutClick:false,
          submitOrderModalOPen:false,
          reviewFoodItemModalOpen:false
      };
  },
  componentDidMount() {
      // (url_to_call, state_property_to_change,action_name_to_be_appended)
      this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall','PROVIDER');
  },
  componentDidUpdate() {
    //check whether clicking on add to cart made component update
    if(this.state.counter===1 && this.state.itemCheckOutClick){
      this.scrollToElement('checkoutsection');
      this.setState({itemCheckOutClick:false})
    }
  },
  checkOutItem(event,foodItem){
    // check whether user is logged in 
    if(this.props.globalState.core.get('userLoggedIn')){
      // initialize the quantity checked out to 1
      foodItem.quantity =1; 
      this.props.providerFoodItemCheckout(foodItem);
      if(this.state.counter === 0){
        this.setState({
          counter:this.state.counter+1,
          itemCheckOutClick:true
        })
      }
    }else{
      // open the modal for user login
      this.props.openLoginModal(true);
    }

  },
  checkoutLinkClick(){
    this.scrollToElement('checkoutsection');
  },
  checkOutItems(){
    this.setState({
      submitOrderModalOPen:true
    })
  },
  scrollToElement(elementName){
    let scroller = Scroll.scroller;
    scroller.scrollTo(elementName, {
      duration: 1500,
      delay: 100,
      smooth: true,
    })
  },
  changeStoreVal(event) {
    let foodItemId = event.target.name;
    let updatedQuantity = event.target.value
    this.props.updateCheckedOutQty(foodItemId,updatedQuantity);
  },
  deleteCheckedOutItem(event){
    this.props.deleteCheckedOutItem(event.target.name);
  },
  closeModal(){
    this.setState({
      submitOrderModalOPen:false,
      reviewFoodItemModalOpen:false,
    })
  },
  componentWillUnmount() {
      this.props.removeAllCheckedOutItems();  
  },
  confirmOrderSubmit(){
    // (url_to_call, state_property_to_change,action_name_to_be_appended)
    this.props.postSecuredData('/api/emails/order-submit','orderSubmit','ORDER_SUBMIT',this.checkOutOrderDetails); 
  },
  writeReviewModal(foodItem){
    this.setState({
      reviewFoodItemModalOpen:true
    });
    this.props.selectItemForReview(foodItem);
  },
  starRating(nextVal,prevVal,name){
    // reset the error if it exists
    this.props.reviewError({
      storeKey:'ratingError',
      errorMsg:''
    });
    this.props.selectStarRating(nextVal);
  },
  updateReview(event){
    let newValue = event.target.value;
    console.log(newValue);
    this.props.submitTypedReview(newValue);
  },
  reviewFocus(event){
    // reset the error if it exists
    this.props.reviewError({
      storeKey:'reviewError',
      errorMsg:''
    });
  },
  reviewBlur(event){
    let value= event.target.value;
    // check if the value is greater than 0
    if(value.length>0){
      this.props.reviewError({
        storeKey:'reviewError',
        errorMsg:''
      });
    }else{
      this.props.reviewError({
        storeKey:'reviewError',
        errorMsg:'Please write a review'
      });
    }
  },
  submitReview(){
    // check whether both the star rating and review are entered
    let {review} = this.props.providerProfile.toJS();
    if(review.rating && review.review){
      const {user} = this.props.globalState.core.toJS();
      let combinedQuery={
        foodItemId:review.item._id,
        creatorId:user._id,
        reviewDate:new Date() ,
        creatorName: user.name,
        rating:review.rating,
        review:review.review
      }
      this.props.postSecuredData('/api/providers/foodItem/review',review,'SUBMIT_REVIEW',combinedQuery);
    }else{
      // check whether start rating or review is empty
      if(!review.review){
        this.props.reviewError({
          storeKey:'reviewError',
          errorMsg:'Please write a review'
        })
      }
      if(!review.rating){
        this.props.reviewError({
          storeKey:'ratingError',
          errorMsg:'Please give a star rating'
        });
      }
    }
  },
  render() {
    const {providerProfileCall,itemsCheckedOut,review} = this.props.providerProfile.toJS();
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
    this.checkOutOrderDetails.grandTotal = grandTotal;
    let Element = Scroll.Element;
    let self = this;
    const {user} = this.props.globalState.core.toJS();

    // make the checkout object here to be submitted once submit is clicked
    this.checkOutOrderDetails={
      itemsCheckedOut:itemsCheckedOut,
      providerName:(data)?data.title : undefined,
      customerName:(user && user.name)?user.name : undefined,
      providerAddress:(data)?data.userSeachLocations[data.deliveryAddressIndex].searchText:undefined,
      customerAddress: (user && user.name) ? user.userSeachLocations[user.deliveryAddressIndex].searchText:undefined,
      subTotal:grandTotal,
      orderId:'tbd',
      tip:'tbd',
      orderType:'Pickup',
      modeOfPayment:'Cash/CreditCard'
    }
    // ends here

    return (data && user && user.name || (data && !this.props.globalState.core.get('userLoggedIn')))?
        <div id="layout" className="pure-g">
          <div className={classNames(classes["sidebar"], "pure-u-1","pure-u-md-1-4")}>
            <div className={classes["header"]}>
                <h1 className={classes["brand-title"]}>{data.title}</h1>
                <div className="pure-u-1">
                  <img className = {classes["profile-img"]}src={StaffImg}/>
                </div>
               <div className = "pure-u-1" style={{marginBottom:'-20px'}}>
                  <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    renderStarIcon={() => <span>&#11088;</span>}
                    starCount={5}
                    value={3}
                  />
                </div>
                <IconButton><CommunicationEmail/></IconButton>
                <IconButton><CommunicationCall/></IconButton>
                <IconButton><CommunicationChat/></IconButton>
                <nav className={classes["nav"]}>
                    <ul className={classes["nav-list"]}>
                        <li className={classes["nav-item"]}>
                            {data.description}
                        </li>
                    </ul>
                </nav>
            </div>
          </div>
          <div className = { classNames(classes["content"], "pure-u-1")}>
            <div>
              <div style ={{textAlign:"center"}}>
                {
                  (resolvedItemsCheckedOut && resolvedItemsCheckedOut.length>0)?
                    <RaisedButton
                      label="Checkout"
                      style={{width:'30%'}}
                      secondary={true}
                      onClick={this.checkoutLinkClick}
                    />
                    :
                    undefined
                }
              </div>
              <div className={classes["posts"]}>
                  <h1 className={classes["content-subhead"]}>Menu Items</h1>
                  { 
                    data.foodItems.map((foodItem)=>{
                      return <div key={foodItem._id}>

                                <section className={classes["post"]}>
                                  <div>
                                    <div className="pure-u-md-3-5">
                                      <header className={classes["post-header"]}>
                                        <h2 className={classes["post-title"]}>{foodItem.name}</h2>
                                      </header>
                                      <div className={classes["post-description"]}>
                                          <p>{foodItem.description}</p>
                                          <table className={classNames("pure-table",classes["remove-border"])}>
                                            <tbody>
                                                <tr>
                                                    <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                    <td className={classes["item-details"]}>order by :</td>
                                                    <td className={classes["item-details"]}>{new Date(foodItem.placeOrderBy).toDateString()}</td>                           
                                                </tr>
                                                <tr>
                                                    <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                    <td className = {classes["item-details"]}>ready on : </td>
                                                    <td className = {classes["item-details"]}>{new Date(foodItem.serviceDate).toDateString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className={classes["reduce-padding"]}>
                                                      <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                                        <path d="M0 0h24v24H0z" fill="none"/>
                                                      </svg>
                                                    </td>
                                                    <td className = {classes["item-details"]}>Price : </td>
                                                    <td className = {classes["item-details"]}>{foodItem.price +' $'}</td>
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
                                    <div className={classNames(classes["post-avatar"],"pure-u-md-2-5")}>
                                      <img alt={foodItem.name} className = {classes["food-item"]} src={foodItem.img}/>
                                      <div className={classNames(classes["move-center"],classes["review-submit-link"])}
                                        onClick={()=>this.writeReviewModal(foodItem)}>
                                        Please submit a review
                                      </div>
                                      <RaisedButton
                                        labelPosition="before"
                                        label="Add to the cart" primary={true}
                                        style={{display:"block"}}
                                        onClick={(event)=>this.checkOutItem(event,foodItem)}
                                      >
                                      </RaisedButton>
                                    </div>
                                  </div>
                                </section>  
                              </div>
                  })
                }
              </div>
              {
                (resolvedItemsCheckedOut && resolvedItemsCheckedOut.length>0)?
                <div>
                  <Element name="checkoutsection" className={classes["content-subhead"]}>Your Order</Element>
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
                    >{'Checkout (Grand total '+grandTotal+ '$)'}
                    </RaisedButton>
                  </div>
                </div>
                :
                undefined
              }
              <div className={classes["footer"]}>
                  <div className="pure-menu pure-menu-horizontal">
                      <ul>
                          <li className="pure-menu-item"><a href="http://purecss.io/" className="pure-menu-link">About</a></li>
                          <li className="pure-menu-item"><a href="http://twitter.com/yuilibrary/" className="pure-menu-link">Twitter</a></li>
                          <li className="pure-menu-item"><a href="http://github.com/yahoo/pure/" className="pure-menu-link">GitHub</a></li>
                      </ul>
                  </div>
              </div>
            </div> 
          </div>
          <Modal
            isOpen={this.state.submitOrderModalOPen}
            onRequestClose={this.closeModal}
            style={customStyles} >
            <div className={classNames(classes["order-submit"])}>
              <div className={classes["order-title"]}>
                <div className={classes["order-header"]}>
                  Order summary
                </div>
                <div className="pure-u-1 pure-u-md-1-2">
                  <div className={classes["order-address-heading"]}>Deliver to:</div>
                  <div>{this.checkOutOrderDetails.customerName}</div>
                  <div className={classes["delivery-box"]}>
                    {this.checkOutOrderDetails.customerAddress}
                  </div>
                </div>
                <div className={classNames("pure-u-1","pure-u-md-1-2",classes["provider-address"])}>
                  <div className={classes["order-address-heading"]}>Provider:</div>
                  <div>{data.name}</div>
                  <div className={classes["delivery-box"]}>{this.checkOutOrderDetails.providerAddress}</div>
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
              <div className={classes["move-center"]}>
                <RaisedButton
                  label="Submit your order"
                  primary={true}
                  style={{marginTop:'20px'}}
                  onClick={()=>this.confirmOrderSubmit()}
                />
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={this.state.reviewFoodItemModalOpen}
            onRequestClose={this.closeModal}
          >
          <div>
            <div className={classNames("pure-form",classes["move-center"])}>
              <div className="pure-group">
                <div className={classes["review-item-name"]}>
                  {review.item.name}
                </div>
                <img alt={review.item.name} className = {classes["food-item"]} src={review.item.img}/>
                <div>
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={review.item.rating}
                    onStarClick={this.starRating}
                  />
                  <div className = {classNames(classes["error-message"],classes["move-center"])}>{(review.ratingError)?'*'+review.ratingError:undefined}</div>
                </div>
                <textarea className="pure-input-1" placeholder="Please write your review here"
                  name="review"
                  value={review.review}
                  onFocus={this.reviewFocus}
                  onBlur = {this.reviewBlur}
                  onChange={this.updateReview}
                ></textarea>
                <span className = {classes["error-message"]}>{(review.reviewError)?'*'+review.reviewError:undefined}</span>
              </div>
              <button className={classNames("pure-button pure-input-1-2 pure-button-primary",classes["review-submit-button"])}
                onClick={this.submitReview}
              >Submit</button>
            </div>
          </div>
          </Modal>
        </div>
        :
        <div></div> 
    }
});

export default ProviderProfile

ProviderProfile.propTypes = {
  providerProfile:React.PropTypes.object.isRequired,
  providerFoodItemCheckout:React.PropTypes.func.isRequired,
  fetchMayBeSecuredData:React.PropTypes.func.isRequired,
  updateCheckedOutQty:React.PropTypes.func.isRequired,
  deleteCheckedOutItem:React.PropTypes.func.isRequired,
  removeAllCheckedOutItems:React.PropTypes.func,
  globalState:React.PropTypes.object.isRequired,
  postSecuredData:React.PropTypes.func.isRequired,
  openLoginModal:React.PropTypes.func.isRequired,
  selectItemForReview:React.PropTypes.func.isRequired,
  selectStarRating:React.PropTypes.func.isRequired,
  submitTypedReview:React.PropTypes.func.isRequired,
  reviewError:React.PropTypes.func.isRequired
}
