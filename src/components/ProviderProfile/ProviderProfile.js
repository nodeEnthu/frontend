import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import './providerProfile.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import StaffImg from './img/common/staff-thumb-placeholder-male.jpg';
import Checkout from 'components/Checkout';
import Scroll from 'react-scroll';
import ReviewSubmitModal from 'components/ReviewSubmitModal';
import StarRatingComponent from 'react-star-rating-component';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ProviderEntryForm from 'components/ProviderEntryForm/ProviderEntryForm'
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';
import IconButton from 'material-ui/IconButton';
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import RaisedButton from 'material-ui/RaisedButton';
import FoodItemInProviderProfile from 'components/FoodItemInProviderProfile';
import { Link } from 'react-router';
import moment from 'moment';

const ProviderProfile = React.createClass({
  getInitialState() {
      return {
          counter:0,
          itemCheckOutClick:false,
      };
  },
  componentWillMount() {
      this.props.fetchMayBeSecuredData('/api/users/'+this.props.params.id,'providerProfileCall',this.props.actionName);
  },
  writeReviewModal(foodItem){
    this.props.openModal({storeKey:'reviewSubmitModalOpen', openModal:true})
    this.props.selectItemForReview(foodItem);
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
  scrollToElement(elementName){
    let scroller = Scroll.scroller;
    scroller.scrollTo(elementName, {
      duration: 1500,
      delay: 100,
      smooth: true,
    })
  },
  render() {
    const {providerProfileCall,providerEditModalOpen} = this.props.providerProfile.toJS();
    let data = providerProfileCall.data;
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
    if(data && data.foodItems){
      data.foodItems.forEach(function(foodItem){
        if(moment(foodItem.serviceDate).isAfter(moment(), 'day') || moment(foodItem.serviceDate).isSame(moment(), 'day')){
          currentItems.push(foodItem);
        } else pastItems.push(foodItem);
      })
    }
    return (data && data.foodItems && user && user.name || (data && !this.props.globalState.core.get('userLoggedIn')))?
        <div id="layout" className="provider-profile">
          <div className="sidebar pure-u-1 pure-u-md-1-4">
            {
              (this.props.params.id === this.props.globalState.core.toJS().user._id)?
                <div className="move-right">                   
                  <Link style={{color:'white'}}to={'/providers/'+data._id+'/edit'}>Edit profile</Link> 
                </div>
                :
                undefined
            }
            
            <div className="header">
                <h1 className="brand-title">{data.title}</h1>
                <div className="pure-u-1">
                  <img className = "profile-img" src={data.imgUrl}/>
                </div>
                <IconButton><CommunicationEmail/></IconButton>
                <IconButton><CommunicationCall/></IconButton>
                <IconButton><CommunicationChat/></IconButton>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            {data.description}
                        </li>
                    </ul>
                </nav>
            </div>
          </div>
          <div className = "content pure-u-1 pure-u-md-3-4">
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
                      return <div key={foodItem._id}>
                                <FoodItemInProviderProfile
                                  userViewingOwnProfile={userViewingOwnProfile}
                                  checkOutItem = {self.checkOutItem}
                                  writeReviewModal = {self.writeReviewModal}
                                  foodItem={foodItem}
                                />
                              </div>
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
                      return <div key={foodItem._id}>
                                <FoodItemInProviderProfile
                                  userViewingOwnProfile={userViewingOwnProfile}
                                  checkOutItem = {self.checkOutItem}
                                  writeReviewModal = {self.writeReviewModal}
                                  foodItem={foodItem}
                                  pastItem={true}
                                />
                              </div>
                    })
                  }
              </div>
              {(this.props.mode != 'PROVIDER_ENTRY')?
                <div>
                  <Element name="checkoutsection"/>
                  <Checkout{... this.props}/>
                  <ReviewSubmitModal{... this.props}/>
                </div>
                :
                undefined
              }
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
  updateCheckedOutQty:React.PropTypes.func,
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
  flushOutStaleReviewData:React.PropTypes.func
}
