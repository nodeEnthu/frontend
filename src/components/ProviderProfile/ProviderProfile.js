import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import './providerProfile.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import Checkout from 'components/Checkout';
import Scroll from 'react-scroll';
import ReviewSubmitModal from 'components/ReviewSubmitModal';
import StarRatingComponent from 'react-star-rating-component';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm'
import IconButton from 'material-ui/IconButton';
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import RaisedButton from 'material-ui/RaisedButton';
import FoodItemInProviderProfile from 'components/FoodItemInProviderProfile';
import { Link } from 'react-router';
import moment from 'moment';
import getSearchAddressAndPlaceId from 'utils/getSearchAddressAndPlaceId'
import FlatButton from 'material-ui/FlatButton';
import FoodItemModal from 'components/FoodItemModal';

const ProviderProfile = React.createClass({
  getInitialState() {
      return {
          counter:0,
          itemCheckOutClicked:false,
      };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount() {
      this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName);
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
    if(this.state.counter===1 && this.state.itemCheckOutClicked){
      this.scrollToElement('link1');
      this.setState({itemCheckOutClicked:false})
    }
    if(prevProps.params.id!= this.props.params.id){
      this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName);
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
          itemCheckOutClicked:true
        })
      }
    }else{
      // open the modal for user login
      this.props.openLoginModal(true);
    }
  },
  scrollToElement(elementName){
    let scroller = Scroll.scroller;
    scroller.scrollTo(elementName, {
      duration: 1500,
      delay: 100,
      smooth: true,
    })
  },
  refreshPage(){
    this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName);
  },
  render() {
    const {providerProfileCall} = this.props.providerProfile.toJS();
    let provider = providerProfileCall.data;
    let userSearchAndPlaceId;
    let self = this;
    const {user} = this.props.globalState.core.toJS();
    let Element = Scroll.Element;
    let userViewingOwnProfile = false;
    if(this.props.params && this.props.params.id && user && user._id){
      if(this.props.params.id === user._id){
        userViewingOwnProfile=true;
      }
    }
    // seperate between current and past items
    let currentItems=[] , pastItems=[], currentDate;
    if(provider && provider.foodItems){
      userSearchAndPlaceId= getSearchAddressAndPlaceId(provider);
      provider.foodItems.forEach(function(foodItem){
        let availability= foodItem.availability;
        let foodItemAvailable = false;
        for(let i=0; i < availability.length ; i++){
          if(moment(availability[i]).isAfter(moment(), 'day') || moment(availability[i]).isSame(moment(), 'day')){
            foodItemAvailable=true;
            break;
          }else foodItemAvailable=false;
        }
        (foodItemAvailable)?currentItems.push(foodItem): pastItems.push(foodItem);
      })
    }
    return (provider && provider.userType && user && user.name || (provider && !this.props.globalState.core.get('userLoggedIn')))?
        <div id="layout" className="provider-profile">
          <div className="pure-u-1 profile-wrapper">
              <div className="pure-u-1 pure-u-md-1-4 is-center">
                <div>
                  <img className = "pure-img-responsive" src={provider.imgUrl}/>
                </div>
              </div>
              <div className="pure-u-1 pure-u-md-3-4 provider-desc-wrapper">
                <div className="brand-title">{provider.title}</div>
                <div>{/*provider.description*/}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
                <div className="addtnl-info">
                  <span>Services Offered:</span>
                  {
                    (provider.pickUpFlag)?
                      <span className="service-offered">{'Pickup'}</span>
                      :''
                  }
                </div>
                <div className="provider-details">
                  <CommunicationLocationOn/>
                  <span className="provider-detail">{userSearchAndPlaceId.address}</span>
                </div>
                <div>
                 <CommunicationEmail/>
                  <span className="provider-detail">{provider.email}</span>
                </div>
              </div>
              
          </div>
          <div className="pure-u-1">
             <FlatButton
                label="Edit Profile"
                backgroundColor="lightgrey"
                icon={<EditorModeEdit/>}
                style={{width:'100%',height:'auto',lineHeight:'auto'}}
                hoverColor="#8AA62F"
                onClick={(event)=>self.context.router.push('/providers/'+provider._id+'/edit')}
              />
          </div>
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
                                refreshPage= {this.refreshPage}
                                checkOutItem = {self.checkOutItem}
                                writeReviewModal = {self.writeReviewModal}
                                postSecuredData = {this.props.postSecuredData}
                                openModal = {this.props.openModal}
                                providerProfile = {this.props.providerProfile}
                                foodItem={foodItem}
                                mode = {this.props.mode}
                                foodIdSelected={this.props.foodIdSelected}
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
                                refreshPage= {this.refreshPage}
                                writeReviewModal = {self.writeReviewModal}
                                postSecuredData = {this.props.postSecuredData}
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
              <Element name="link1"></Element>
            </div> 
          </div>
        </div>
        :
        <div></div> 
    } 
});

export default ProviderProfile

ProviderProfile.propTypes = {
  providerProfile:React.PropTypes.object,
  providerFoodItemCheckout:React.PropTypes.func,
  fetchMayBeSecuredData:React.PropTypes.func,
  updateCheckedOutItem:React.PropTypes.func,
  deleteCheckedOutItem:React.PropTypes.func,
  removeAllCheckedOutItems:React.PropTypes.func,
  globalState:React.PropTypes.object,
  postSecuredData:React.PropTypes.func,
  openLoginModal:React.PropTypes.func,
  selectItemForReview:React.PropTypes.func,
  selectStarRating:React.PropTypes.func,
  submitTypedReview:React.PropTypes.func,
  reviewError:React.PropTypes.func,
  actionName:React.PropTypes.string,
  mode:React.PropTypes.string,
  flushOutStaleReviewData:React.PropTypes.func,
  flushProviderData:React.PropTypes.func,
  userAddressSearchChange:React.PropTypes.func,
  userAddressUpdatePlaceId:React.PropTypes.func,
  foodIdSelected:React.PropTypes.func
}
