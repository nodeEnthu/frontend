import React from 'react';
import './foodItem.scss';
import { getCall } from 'utils/httpUtils/apiCallWrapper';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import StarRatingComponent from 'react-star-rating-component';
import {Tabs, Tab} from 'material-ui/Tabs';
import { DIET_TYPES} from 'routes/Search/constants/searchFilters';
import moment from 'moment';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {PLACE_ORDER_BY} from 'routes/Search/constants/searchFilters'

const FoodItem = createReactClass({
  getInitialState() {
    return{
      foodItem:undefined,
      reviews:[],
      tabSelected:'description'
    }
  },
  tabChange(tab){
    this.setState({
      tabSelected: tab,
    });
  },
  componentWillMount() {
    let self= this;
    getCall('/api/foodItem/'+this.props.foodItemId)
            .then(function(resolvedResponse) {
                self.setState({foodItem:resolvedResponse.data});
            })
            .catch(function(err) {

            });
    getCall('/api/foodItem/'+this.props.foodItemId+'/reviews')
            .then(function(resolvedResponse) {
                self.setState({reviews:resolvedResponse.data.reviews});
            })
            .catch(function(err) {

            });
  },
  render(){
    const {foodItem,reviews}= this.state;
    let self = this;
    let dietTypes=[];
    DIET_TYPES.map(function(diet){
      if(foodItem && foodItem[diet.value] && foodItem[diet.value] === true){
        dietTypes.push(diet.value);
      }
    })
    return(
      (foodItem)?
        <div className="food-item">
            <div className="pure-u-1 item-wrapper">
              <div className="pure-u-1 pure-u-md-3-4 food-desc-wrapper">
                <div className="food-name">{foodItem.name}</div>
                <div className="star-rating" onClick={()=>this.tabChange("reviews")}>
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
                  <table className="pure-table remove-border">
                      <tbody>
                        <tr>
                            <td>Availability: </td>
                            <td className="add-padding-left">
                            { (foodItem.avalilabilityType === 'specificDates')?
                             
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
                            </td>
                        </tr>
                        <tr>
                            <td>Pickup/Delivery time: </td>
                            <td className="add-padding-left">{resolvePickUpTime(foodItem.pickUpStartTime)} - {resolvePickUpTime(foodItem.pickUpEndTime)}</td>
                        </tr>
                    </tbody>
                  </table>
                  <div className="food-price">{foodItem.displayPrice || '$'+ foodItem.price}</div>
              </div>
              <div className="tabs-wrapper">
                <Tabs
                  value={this.state.tabSelected}
                  onChange={this.tabChange}
                  inkBarStyle={{borderBottom:"5px solid #FF6F00"}}
                >
                  <Tab label="Description" value="description" style={{backgroundColor:"white",color:"black"}}>
                    <div className="tab-section-wrapper">
                      <table>
                        <tbody>
                          <tr>
                            <td>Cuisine</td>
                            <td className="add-padding-left capitalize">{foodItem.cuisineType}</td>
                          </tr>
                          <tr>
                            <td>Diet</td>
                            <td className="add-padding-left capitalize">{dietTypes.join(' , ')}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>
                        {foodItem.description}
                      </p>
                    </div>
                  </Tab>
                  <Tab 
                    label={ 
                        <div>
                          <span>Reviews</span>
                          <div className="num-of-reviews">
                            <span className="primary-color">(</span>{(foodItem.numOfReviews)? foodItem.numOfReviews: 0}<span className="primary-color" >)</span>
                          </div>
                        </div>
                      }
                    value="reviews" 
                    style={{backgroundColor:"white",color:"black"}}
                  >
                    <div className="tab-section-wrapper">
                      {
                        reviews.map((review)=>{
                          return  <div key={review._id}>
                                  <div className = "pure-u-1" >
                                    <StarRatingComponent 
                                      name={review._id}
                                      editing={false}
                                      starCount={5}
                                      value={parseInt(review.rating)}
                                    />
                                  </div>
                                  <div style={{padding:'0.5em'}}>
                                    {review.review}
                                  </div>
                                  <div>
                                    --&nbsp;{review.creatorName} &nbsp;&nbsp;{new Date(review.reviewDate).toDateString()}
                                  </div>
                                  <hr/>
                                </div>
                          })
                      }
                    </div>
                  </Tab>
                </Tabs>
              </div>
          </div>
        </div>
        :
        <div></div>
      )
  }
})

FoodItem.propTypes = {
  foodItemId:PropTypes.string
}

export default FoodItem;