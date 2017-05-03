import React from 'react';
import './foodItem.scss';
import { getCall } from 'utils/httpUtils/apiCallWrapper';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import StarRatingComponent from 'react-star-rating-component';
import {Tabs, Tab} from 'material-ui/Tabs';
import { DIET_TYPES} from 'routes/Search/constants/searchFilters';
import moment from 'moment';

const FoodItem = React.createClass({
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
    console.log(this.props.foodItemId)
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
              <div className="pure-u-1 pure-u-md-1-4 is-center">
                <div>
                  <img className = "pure-img-responsive" src={foodItem.imgUrl}/>
                </div>
              </div>
              <div className="pure-u-1 pure-u-md-3-4 food-desc-wrapper">
                <div className="food-name">{foodItem.name}</div>
                <div className="star-rating">
                    <div className="provider-star-rating">
                      <StarRatingComponent 
                          name={foodItem._id} 
                          editing={false}
                          starCount={5}
                          starColor={'#FF6F00'}
                          value={3}
                       />
                    </div>
                    <div className="num-of-reviews">
                      <span className="primary-color">(</span>{(foodItem.numOfReviews)? foodItem.numOfReviews: 0}<span className="primary-color" >)</span>
                    </div>
                  </div>
                  <table className="pure-table remove-border">
                      <tbody>
                        <tr>
                            <td>Availability</td>
                            <td className="add-padding-left">
                            {
                              foodItem.availability.map(function(date,index){
                                if(foodItem.availability.length != (index+1)){
                                  return moment(date).format("MMM, D")+' | ';
                                }else return moment(date).format("MMM, D");
                              })
                            }</td>
                        </tr>
                        <tr>
                            <td>Pick-up time</td>
                            <td className="add-padding-left">{resolvePickUpTime(foodItem.pickUpStartTime)} - {resolvePickUpTime(foodItem.pickUpEndTime)}</td>
                        </tr>
                    </tbody>
                  </table>
                  <div className="food-price">{'$'+ foodItem.price}</div>
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
                  <Tab label="Reviews" value="reviews" style={{backgroundColor:"white",color:"black"}}>
                    <div className="tab-section-wrapper">
                      {
                        reviews.map((review)=>{
                          return  <div key={review._id}
                                  style={{
                                    padding:'20px'
                                  }}>
                                  <div className = "pure-u-1" style={{marginBottom:'-20px'}}>
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
  foodItemId:React.PropTypes.string
}

export default FoodItem;