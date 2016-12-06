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
import RaisedButton from 'material-ui/RaisedButton';
import { Link, IndexLink } from 'react-router';

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
    console.log(this.props.actionName,'this.props.actionName', this.props.params.id,user,data);
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
                  <img className = "profile-img" src={StaffImg}/>
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
                  <h1 className="content-subhead">Menu Items</h1>
                  { 
                    data.foodItems.map((foodItem)=>{
                      return <div key={foodItem._id}>
                                <section className="post">
                                  <div>
                                    <div className="pure-u-md-3-5">
                                      <header className="post-header">
                                        <h2 className="post-title" style={{display:'inline-block'}}>{foodItem.name}</h2>
                                          <div
                                            style={{display:'inline-block', padding:'0 0.5em'}}
                                          >
                                            <StarRatingComponent
                                              name={foodItem._id} 
                                              editing={false}
                                              starCount={5}
                                              value={parseInt(foodItem.rating)}
                                            />
                                          </div>
                                          <Link to={'/foodItem/'+foodItem._id+'/reviews'} style={{display:'inline-block'}}>
                                            {foodItem.numOfReviews+ ' reviews'}
                                          </Link>
                                      </header>
                                      <div className="post-description">
                                          <p>{foodItem.description}</p>
                                          <table className="pure-table remove-border">
                                            <tbody>
                                                <tr>
                                                    <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                    <td className="item-details">order by :</td>
                                                    <td className="item-details">{new Date(foodItem.placeOrderBy).toDateString()}</td>                           
                                                </tr>
                                                <tr>
                                                    <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                    <td className ="item-details">ready on : </td>
                                                    <td className = "item-details">{new Date(foodItem.serviceDate).toDateString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="reduce-padding">
                                                      <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                                        <path d="M0 0h24v24H0z" fill="none"/>
                                                      </svg>
                                                    </td>
                                                    <td className = "item-details">Price : </td>
                                                    <td className = "item-details">{foodItem.price +' $'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                    <td className ="item-details">pick-up</td>
                                                    <td className = "item-details">3PM - 6PM</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div className="post-avatar pure-u-md-2-5">
                                      {
                                        (this.props.params.id === this.props.globalState.core.toJS().user._id)?
                                          <div className="move-right">                   
                                            <Link to={'/foodItems/'+foodItem._id+'/edit'}>Edit</Link> 
                                          </div>
                                          :
                                          undefined
                                      }
                                      
                                      <img alt={foodItem.name} className = "food-item" src={foodItem.img}/>
                                      <div className="move-center review-submit-link"
                                        onClick={()=>this.writeReviewModal(foodItem)}>
                                        Please submit a review
                                      </div>
                                      {(this.props.mode != 'providerEntry')?
                                        <RaisedButton
                                          labelPosition="before"
                                          label="Add to the cart" primary={true}
                                          style={{display:"block"}}
                                          onClick={(event)=>this.checkOutItem(event,foodItem)}
                                          disableTouchRipple={true}
                                        >
                                        </RaisedButton>
                                        :
                                        undefined
                                      }
                                      
                                    </div>
                                  </div>
                                </section>  
                              </div>
                  })
                }
              </div>
              {(this.props.mode != 'providerEntry')?
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
