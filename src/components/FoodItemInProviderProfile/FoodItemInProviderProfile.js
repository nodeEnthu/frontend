import React from 'react'
import './foodItemInProviderProfile.scss'
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import Truncate from 'react-truncate';
import {PLACE_ORDER_BY} from 'routes/Search/constants/searchFilters';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
const FoodItemInProviderProfile = createReactClass({
  contextTypes: {
        router: PropTypes.object.isRequired
  },
  openFoodItemModal(event,foodItem){
    let className= event.target.className;
    if(className != "review-content"){
      this.props.foodIdSelected(foodItem._id);
      this.props.openModal({storeKey:'foodItemModalOpen', openModal:true})
    }
  },
  deleteFoodItem(foodItem){
    let self = this;
    this.props.postSecuredData('/api/foodItem/'+foodItem._id+'/remove','removeItem','REMOVE_ITEM',{_creator:foodItem._creator})
    .then(function(){
      self.props.refreshPage();
      self.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})
    })
  },
  render(){
    let {foodItem,mode,provider,onOrder}= this.props;
    let self = this;
    const {deleteItemModalOpen} = this.props.providerProfile.toJS() || false;
    const availabilityLength = foodItem.availability.length;
    let editOrReOffer=(this.props.pastItem === true)? 'OFFER': 'EDIT';
    return <div className="pure-u-1 pure-u-md-1-3 food-item-profile provider-profile-wrapper">
              <div className="pure-u-1 provider-img-section" onClick={(event)=>this.openFoodItemModal(event,foodItem)}>
                <div className="img-avatar">
                  <img className="gallery-img portrait"src={foodItem.imgUrl}/>
                </div>
                {
                  (foodItem.enableReview)?
                    <div className="write-review" onClick={()=>this.props.writeReviewModal(foodItem)}>
                      <div className="review-content">
                        Please write a review
                      </div>
                    </div>
                    :
                    undefined
                }
               
              </div>
              <div className="pure-u-1 provider-info-section">
                <div onClick={(event)=>this.openFoodItemModal(event,foodItem)}  >
                  <div className="foodItem-name">
                      {foodItem.name}
                  </div>
                  <div className="star-rating">
                    <div className="provider-star-rating">
                      <StarRatingComponent 
                          name={foodItem._id}
                          editing={false}
                          starCount={5}
                          starColor={'#FF6F00'}
                          value={foodItem.rating || 0 }
                       />
                    </div>
                    <div className="num-of-reviews">
                      <span className="primary-color">(</span>{(foodItem.numOfReviews)? foodItem.numOfReviews: 0}<span className="primary-color" >)</span>
                    </div>
                  </div>
                  <div className="food-desc">
                      {
                        (foodItem.description)?
                          <Truncate lines={2} ellipsis={<span>... <a href="javascript:void(0)">Read more</a></span>}>
                            {foodItem.description}
                          </Truncate>
                          :
                          <span>... <a href="javascript:void(0)">Read more</a></span>
                      }
                      
                  </div>
                </div>
                <table className="pure-table remove-border">
                  <tbody>
                      <tr>
                        {
                          (onOrder)?
                          <td>Place Order</td>
                          :
                          <td>Availability</td>
                        }
                        {
                          (onOrder)?
                          <td className="add-padding-left">
                          { 
                            PLACE_ORDER_BY.map(function(orderDate){
                              if(orderDate.value === foodItem.placeOrderBy){
                                return orderDate.label;
                              }
                            })
                          }
                          </td>
                          :
                          <td className="add-padding-left">
                          {
                            foodItem.availability.map(function(date,index){
                              if(availabilityLength != (index+1)){
                                return moment(date).format("MMM, D")+' | ';
                              }else return moment(date).format("MMM, D");
                              
                            })
                          }
                          </td>
                        }
                          
                      </tr>
                      <tr>
                          <td>Pickup/delivery time</td>
                          <td className="add-padding-left">{resolvePickUpTime(foodItem.pickUpStartTime)} - {resolvePickUpTime(foodItem.pickUpEndTime)}</td>
                      </tr>
                  </tbody>
                </table>
                <div className="add-to-cart">
                  <div className="food-price">{'$'+ foodItem.price}</div>
                  {
                    (this.props.mode != 'providerEntry' && !this.props.userViewingOwnProfile && !this.props.pastItem )?
                      <div className="add">
                        <FlatButton
                          backgroundColor="#FF6F00"
                          label="+add"
                          labelStyle={{color:'white'}}
                          style={{height:'24px',lineHeight:'24px',minWidth:'80px'}}
                          onTouchTap={(event)=> this.props.checkOutItem(event,foodItem)}
                          disableTouchRipple={true}
                        />
                      </div>
                      :
                      undefined
                  }  
                </div>
              </div>
              {
                (mode != 'PROVIDER_ENTRY')?
                  <Dialog
                    open={deleteItemModalOpen}
                    onRequestClose={()=>this.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})}
                  >
                  <div style={{textAlign:"center"}}>
                    <p>
                      Are you sure you want to delete ... <span style={{fontWeight:"bold"}}>{" "+ foodItem.name}</span>
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
                          onTouchTap={(event)=>this.deleteFoodItem(foodItem)}
                        />
                    </div>
                  </div>
                 </Dialog>
                  :
                  undefined 
              }
              {
                (this.props.userViewingOwnProfile)?
                  <div className="pure-u-1">
                    <div className="pure-u-1-2 move-center">
                      <FlatButton
                        label= {editOrReOffer}
                        backgroundColor="lightgrey"
                        icon={<EditorModeEdit/>}
                        style={{width:'99.5%',height:'auto',lineHeight:'auto'}}
                        hoverColor="#8AA62F"
                        onTouchTap={(event)=>self.context.router.push('/provider/'+provider._id+'/foodItems/'+foodItem._id+'/edit')}
                        disableTouchRipple={true}
                      />
                    </div>
                    <div className="pure-u-1-2 move-center">
                      <FlatButton
                        label= "DELETE"
                        backgroundColor="lightgrey"
                        icon= {<ActionDelete/>}
                        style={{width:'99.5%',height:'auto',lineHeight:'auto'}}
                        hoverColor="red"
                        disableTouchRipple={true}
                        onTouchTap={(event)=> self.props.openModal({storeKey:'deleteItemModalOpen', openModal:true})}
                      />
                    </div>
                  </div>
                  :
                  undefined
              }
          </div> 
  }
})


export default FoodItemInProviderProfile
