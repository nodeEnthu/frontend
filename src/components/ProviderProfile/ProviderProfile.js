import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import './providerProfile.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import Checkout from 'components/Checkout';
import scrollToElement from 'scroll-to-element';
import ReviewSubmitModal from 'components/ReviewSubmitModal';
import StarRatingComponent from 'react-star-rating-component';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm'
import IconButton from 'material-ui/IconButton';
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import FoodItemInProviderProfile from 'components/FoodItemInProviderProfile';
import { Link } from 'react-router';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';
import FoodItemModal from 'components/FoodItemModal';
import {isEmptyObj} from 'utils/formUtils/formValidation';
import Truncate from 'react-truncate';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Circle} from 'rc-progress';
import Snackbar from 'material-ui/Snackbar';
import {METHODS_OF_PAYMENT} from 'components/ProviderEntryForm/constants'
import Dialog from 'material-ui/Dialog';
import BottomChat from 'components/BottomChat'

const ProviderProfile = createReactClass({
  getInitialState() {
      return {
          counter:0,
          itemCheckOutClicked:false,
          snackBarOpen: false,
          addItemAfterLogin:undefined,
          itemToBeDeleted:undefined
      };
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentWillMount() {
    let self = this;
    this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName)
      .then(function(){
        let {globalState} = self.props;
          let userProfileScroll = globalState.core.get('userProfileScroll');
          if(userProfileScroll.get('id') && !userProfileScroll.get('onceScrolled')){
            self.scrollToElement(userProfileScroll.get('id').match(/[a-zA-Z]+/g).join(''),'id');
            self.props.alreadyScrolled();
          }
      })
  },
  componentWillReceiveProps(nextProps){
    // when user goes from one profile to another componentWillUnmount is not called
    if(nextProps.params.id != this.props.params.id){
      if (this.props.removeAllCheckedOutItems) this.props.removeAllCheckedOutItems();
    }
    // this is to add the food item to checkout after user tried to do it in guest mode
    const foodItemAddedbeforeLogin = this.state.addItemAfterLogin; 
    if(nextProps.globalState.core.get('userLoggedIn') && foodItemAddedbeforeLogin) {
      // that means user tried to add an item to the checkout before logging in
      this.setState({addItemAfterLogin:undefined});
      // check if the user is in its own profile before adding to the cart
      if(nextProps.globalState.core.get('user').get('_id') != this.props.params.id){
        this.checkOutItem(undefined, foodItemAddedbeforeLogin,true);
      }
    }
  },
  componentWillUnmount() {
    if (this.props.removeAllCheckedOutItems) this.props.removeAllCheckedOutItems();
    if (this.props.flushOutStaleReviewData) this.props.flushOutStaleReviewData();
    if (this.props.flushProviderData) this.props.flushProviderData();
  },
  writeReviewModal(foodItem){
    // check whether user is logged in 
    if(this.props.globalState.core.get('userLoggedIn')){
      this.props.openModal({storeKey:'reviewSubmitModalOpen', openModal:true})
      this.props.selectItemForReview(foodItem);
    }else{
      // open the modal for user login
      this.props.openLoginModal(true);
    }
  },
  componentDidUpdate(prevProps) {
    //check whether clicking on add to cart made component update
    let self = this;
    if(this.state.counter===1 && this.state.itemCheckOutClicked){
      setTimeout(function(){self.scrollToElement('checkout')},500);
      this.setState({itemCheckOutClicked:false})
    }
    if(prevProps.params.id!= this.props.params.id){
      this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName);
    }
  },
  deleteFoodItem(foodItem){
    this.props.openModal({storeKey:'deleteItemModalOpen', openModal:true});
    this.setState({itemToBeDeleted: foodItem});
  },
  deleteFoodItemSubmit(foodItem){
    let self = this;
    this.props.postSecuredData('/api/foodItem/'+foodItem._id+'/remove','removeItem','REMOVE_ITEM',{_creator:foodItem._creator})
    .then(function(){
      self.setState({itemToBeDeleted: undefined});
      self.refreshPage();
      self.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})
    })
  },
  checkOutItem(event,foodItem,override){
    // check whether user is logged in 
    if(this.props.globalState.core.get('userLoggedIn') || override){
      // initialize the quantity checked out to 1
      this.setState({snackBarOpen:true})
      foodItem.quantity =1; 
      this.props.providerFoodItemCheckout(foodItem);
      if(this.state.counter === 0){
        this.setState({
          counter:this.state.counter+1,
          itemCheckOutClicked:true
        })
      }
    }else{
      // open the modal for user login
      this.props.openLoginModal(true);
      // add item to cart after login.. as the page will re-render after login is completed
      this.setState({addItemAfterLogin:foodItem});
    }
  },
  handleRequestClose(){
    this.setState({snackBarOpen:false})
  },
  scrollToElement(elementName,isId){
    let element;
    if(isId){
      element = '#'+elementName;
    } else element = '.'+ elementName;
    scrollToElement(element, {
      offset: 0,
      ease: 'linear',
      duration: 500
    });
  },
  refreshPage(){
    this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName);
  },
  render() {
    let {providerProfileCall, itemsCheckedOut, deleteItemModalOpen} = this.props.providerProfile.toJS();
    const {itemToBeDeleted} =this.state;
    itemsCheckedOut = itemsCheckedOut || {};
    let provider = providerProfileCall.data;
    let responseRatio
    let self = this;
    const {user} = this.props.globalState.core.toJS();
    let userViewingOwnProfile = false;
    if(this.props.params && this.props.params.id && user && user._id){
      if(this.props.params.id === user._id){
        userViewingOwnProfile=true;
      }
    }
    // seperate between current and past items
    let currentItems=[] , pastItems=[], onOrderItems=[], methodsOfPayment = [], currentDate;
    if(provider && provider.foodItems){
      responseRatio = parseInt((parseInt(provider.ordersConfirmed || 0) + parseInt(provider.ordersCancelled || 0))/parseInt(provider.ordersReceived || 1) *100) || undefined;
      provider.foodItems.forEach(function(foodItem){
        let availability= foodItem.availability;
        let foodItemAvailable = false;
        if(foodItem.avalilabilityType != 'onOrder'){
          for(let i=0; i < availability.length ; i++){
            if(moment(availability[i]).isAfter(moment(), 'day') || moment(availability[i]).isSame(moment(), 'day')){
              foodItemAvailable=true;
              break;
            }else foodItemAvailable=false;
          }
          (foodItemAvailable)?currentItems.push(foodItem): pastItems.push(foodItem);
        } else onOrderItems.push(foodItem);
      })
      if(provider.methodsOfPayment){
        provider.methodsOfPayment.map(function(methodOfPayment,index){
          METHODS_OF_PAYMENT.forEach(function(constPaymentMethods){
            if(constPaymentMethods.value === methodOfPayment){
              methodsOfPayment.push(constPaymentMethods.label);
            }
          })
        })
      }
    }

    return (provider && !isEmptyObj(provider) && provider.userType && user && user.name || (provider && !isEmptyObj(provider) && !this.props.globalState.core.get('userLoggedIn')))?
        <div id="layout" className="provider-profile">
          <div className="pure-u-1 profile-wrapper">
              <div className="pure-u-1 pure-u-md-1-4 is-center position-relative">
                <img className = "pure-img-responsive" src={provider.imgUrl}/>
                <div className="response-ratio">
                  <Circle strokeLinecap ="butt" percent={(responseRatio)? responseRatio.toString() : '100'} strokeWidth="5" strokeColor="#FF6F00" />
                  <div className="response-percentage">{(responseRatio)? responseRatio.toString() + '%' : ' 100%'}</div>
                </div>
                <div className="rating-overlay">
                  <div className="response-heading">Response ratio</div>
                </div>
              </div>
              <div className="pure-u-1 pure-u-md-3-4 provider-desc-wrapper">
                <div className="brand-title">{provider.title}</div>
                <div>{provider.description}</div>
                <div className="addtnl-info">
                  <span>Services Offered:</span>
                  {
                    (provider.serviceOffered === 1)?
                      <span className="service-offered">{'Pickup'}</span>
                      :''
                  }
                  {
                    (provider.serviceOffered === 2)?
                      <span className="service-offered">{'Pickup and Delivery'}</span>
                      :''
                  }
                  {
                    (provider.serviceOffered === 3)?
                      <span className="service-offered">{'Delivery'}</span>
                      :''
                  }
                </div>
              {
                (provider.addtnlComments)?
                <div className="addtnl-info">
                  <span>Additional Comments:</span>
                  <span className="service-offered">{provider.addtnlComments}</span>
                </div>
                :
                undefined
              }
              <div className="addtnl-info">
                <span>Payment methods accepted:</span>
                <span className="service-offered">{methodsOfPayment.join(' , ')}</span>
              </div>
              
                <div className="provider-details">
                  <CommunicationLocationOn/>
                  <span className="provider-detail">
                    <Truncate lines={1}>
                      {provider.displayAddress}
                    </Truncate>
                    
                  </span>
                </div>
                <div>
                 <CommunicationEmail/>
                  <span className="provider-detail">{provider.email}</span>
                </div>
              </div>
              
          </div>
          {
            (userViewingOwnProfile)?
            <div className="pure-u-1">
               <FlatButton
                  label="Edit Profile"
                  backgroundColor="lightgrey"
                  icon={<EditorModeEdit/>}
                  style={{width:'100%',height:'auto',lineHeight:'auto'}}
                  hoverColor="#8AA62F"
                  onClick={(event)=>self.context.router.push('/providers/'+provider._id+'/edit')}
                  disableTouchRipple={true}
                />
            </div>
            :
            undefined
          }
          
          <div className = "content pure-u-1">
            <div>
              <div className="posts">
                  {(userViewingOwnProfile && (this.props.mode != 'PROVIDER_ENTRY'))?
                    <Link to={'/foodItems/add'}>
                        <IconButton
                          style={{top:'6px'}}
                        >
                            <ContentAddBox/>
                        </IconButton>
                        <div style={{display:'inline-block'}}>
                            Add another item
                        </div>
                    </Link>
                    :
                    undefined
                  }
                  {
                    (currentItems && currentItems.length>0)?
                      <h1 className="content-subhead">Current Items</h1>
                      :
                      undefined
                  }
                  { 
                    currentItems.map((foodItem)=>{
                      return <FoodItemInProviderProfile
                                provider={provider}
                                key={foodItem._id}
                                userViewingOwnProfile={userViewingOwnProfile}
                                checkOutItem = {self.checkOutItem}
                                writeReviewModal = {self.writeReviewModal}
                                postSecuredData = {this.props.postSecuredData}
                                deleteFoodItem={this.deleteFoodItem}
                                openModal = {this.props.openModal}
                                providerProfile = {this.props.providerProfile}
                                foodItem={foodItem}
                                mode = {this.props.mode}
                                foodIdSelected={this.props.foodIdSelected}
                                disableAdd = {(itemsCheckedOut[foodItem._id])? true: false}
                              />
                    })
                  }
                  {
                    (onOrderItems && onOrderItems.length>0)?
                      <h1 className="content-subhead">On Order Items</h1>
                      :
                      undefined
                  }
                  { 
                    onOrderItems.map((foodItem)=>{
                      return <FoodItemInProviderProfile
                                provider={provider}
                                key={foodItem._id}
                                userViewingOwnProfile={userViewingOwnProfile}
                                checkOutItem = {self.checkOutItem}
                                writeReviewModal = {self.writeReviewModal}
                                postSecuredData = {this.props.postSecuredData}
                                deleteFoodItem={this.deleteFoodItem}
                                openModal = {this.props.openModal}
                                providerProfile = {this.props.providerProfile}
                                foodItem={foodItem}
                                mode = {this.props.mode}
                                onOrder={true}
                                foodIdSelected={this.props.foodIdSelected}
                                disableAdd = {(itemsCheckedOut[foodItem._id])? true: false}
                              />
                    })
                  }
                  {
                    (pastItems && pastItems.length>0)?
                      <h1 className="content-subhead">Past Items</h1>
                      :
                      undefined
                  }
                  { 
                    pastItems.map((foodItem)=>{
                      return <FoodItemInProviderProfile
                                key={foodItem._id}
                                provider={provider}
                                userViewingOwnProfile={userViewingOwnProfile}
                                checkOutItem = {self.checkOutItem}
                                writeReviewModal = {self.writeReviewModal}
                                postSecuredData = {this.props.postSecuredData}
                                deleteFoodItem={this.deleteFoodItem}
                                openModal = {this.props.openModal}
                                foodItem={foodItem}
                                providerProfile = {this.props.providerProfile}
                                pastItem={true}
                                mode = {this.props.mode}
                                foodIdSelected={this.props.foodIdSelected}
                              />
                            
                    })
                  }
              </div>
              
              {(this.props.mode != 'PROVIDER_ENTRY')?
                <div>
                  <Checkout{... this.props}/>
                  <ReviewSubmitModal
                    globalState =  {this.props.globalState}
                    reviewError = {this.props.reviewError}
                    refreshPage= {this.refreshPage}
                    selectStarRating = {this.props.selectStarRating}
                    submitTypedReview = {this.props.submitTypedReview}
                    openModal = {this.props.openModal}
                    postSecuredData = {this.props.postSecuredData}
                    flushOutStaleReviewData = {this.props.flushOutStaleReviewData}
                    providerProfile = {this.props.providerProfile}
                  />
                  <FoodItemModal  foodId={this.props.foodIdSelected}
                                  openModal={this.props.openModal}
                                  stateProps={this.props.providerProfile}
                  />
                </div>
                :
                undefined
              }
              {
                (this.props.mode != 'PROVIDER_ENTRY'  && itemToBeDeleted)?
                  <Dialog
                    open={deleteItemModalOpen}
                    onRequestClose={()=>this.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})}
                  >
                  <div style={{textAlign:"center", color:"black"}}>
                    <p>
                      Are you sure you want to delete ... <span style={{fontWeight:"bold"}}>{" "+ itemToBeDeleted.name}</span>
                    </p>
                    <p>
                      You will loose all your data including the reviews !!
                    </p>
                    <div>
                        <FlatButton label="Cancel"
                            onTouchTap={()=>this.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})}
                        />
                        <FlatButton 
                          backgroundColor="red" 
                          label="Delete" 
                          onTouchTap={(event)=>this.deleteFoodItemSubmit(itemToBeDeleted)}
                        />
                    </div>
                  </div>
                 </Dialog>
                  :
                  undefined 
              }
              <div className="checkout-section"></div>
            </div> 
          </div>
          <Snackbar
            open={this.state.snackBarOpen}
            message="Item added to checkout"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <BottomChat providerId={provider._id} 
                      providerName={provider.name}
                      providerAvatar={provider.img} 
                      globalState={this.props.globalState} 
                      globalState = {this.props.globalState}
          />
        </div>
        :
        <div></div> 
    } 
});

export default ProviderProfile

ProviderProfile.propTypes = {
  providerProfile:PropTypes.object,
  providerFoodItemCheckout:PropTypes.func,
  fetchMayBeSecuredData:PropTypes.func,
  updateCheckedOutItem:PropTypes.func,
  deleteCheckedOutItem:PropTypes.func,
  removeAllCheckedOutItems:PropTypes.func,
  globalState:PropTypes.object,
  postSecuredData:PropTypes.func,
  alreadyScrolled:PropTypes.func,
  openLoginModal:PropTypes.func,
  selectItemForReview:PropTypes.func,
  selectStarRating:PropTypes.func,
  submitTypedReview:PropTypes.func,
  reviewError:PropTypes.func,
  actionName:PropTypes.string,
  mode:PropTypes.string,
  flushOutStaleReviewData:PropTypes.func,
  flushProviderData:PropTypes.func,
  updateUser:PropTypes.func,
  foodIdSelected:PropTypes.func,
}
