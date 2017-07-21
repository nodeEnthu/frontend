import React from 'react'
import './foodItemInSearchPage.scss'
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import Truncate from 'react-truncate';
import {PLACE_ORDER_BY} from 'routes/Search/constants/searchFilters';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const FoodItemInSearchPage = createReactClass({
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
  render(){
    const {foodItem,foodItemClicked,mode} = this.props;
    return <div className="pure-u-1 pure-u-md-1-3 provider-profile-wrapper"
                        onClick={(event)=>foodItemClicked(event,foodItem)}>
                        <div>
                            <div className="pure-u-1 provider-img-section">
                              <div className="img-avatar">
                                <img className="gallery-img portrait"src={foodItem.imgUrl}/>
                              </div>
                            </div>
                            <div className="pure-u-1 provider-info-section">
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
                                            <span style={{color:"#FF6F00"}}>(</span>{(foodItem.numOfReviews)? foodItem.numOfReviews: 0}<span style={{color:"#FF6F00"}}>)</span>
                                           </div>
                                           <div className="miles-away"><span>{foodItem.distance}</span><span>mi</span></div>
                              </div>
                                                        <div className="food-desc">
                                                            <Truncate lines={2} ellipsis={<span>... <a className="read-more"href="javascript:void(0)" >Read more</a></span>}>
                                                                  {foodItem.description}
                                                            </Truncate>
                                                        </div>
                                                        <div className="food-desc">
                                                            {
                                                              (mode ==="specificDates")?
                                                             
                                                              foodItem.availability.map(function(date,index){
                                                                if(foodItem.availability.length != (index+1)){
                                                                  return moment(date).format("MMM, D")+' | ';
                                                                }else return moment(date).format("MMM, D");
                                                                
                                                              })
                                                             
                                                              :
                                                              
                                                              PLACE_ORDER_BY.map(function(orderDate){
                                                                if(orderDate.value === foodItem.placeOrderBy){
                                                                  return 'Order '+orderDate.label;
                                                                }
                                                              })
                                                              
                                                            }
                                                            
                                                        </div>
                              <div className="add-to-cart">
                                <div className="food-price">{foodItem.displayPrice || '$'+ foodItem.price}</div>
                              </div>
                              
                            </div>
                          </div>
                      </div>
  }
})


export default FoodItemInSearchPage
