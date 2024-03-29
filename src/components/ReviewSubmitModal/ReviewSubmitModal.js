import React from 'react'
import './../ProviderProfile/providerProfile.scss'
import './reviewSubmitModal.scss'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import classNames from 'classnames';
import StarRatingComponent from 'react-star-rating-component';
import FlatButton from 'material-ui/FlatButton';
import createReactClass from 'create-react-class'

const ReviewSubmitModal = createReactClass({
  getInitialState() {
      return {
          reviewFoodItemModalOpen:false,
          showSpinner:false 
      };
  },
  componentWillUnmount() {
    //this.props.flushOutStaleReviewData();
  },
  starRating(nextVal,prevVal,name,foodItemId){
    // reset the error if it exists
    this.props.reviewError({
      foodItemId:foodItemId,
      storeKey:'ratingError',
      errorMsg:''
    });
    this.props.selectStarRating(foodItemId,nextVal);
  },
  updateReview(event,foodItemId){
    let newValue = event.target.value;
    this.props.submitTypedReview(foodItemId,newValue);
  },
  reviewFocus(event,foodItemId){
    // reset the error if it exists
    this.props.reviewError({
      storeKey:'reviewError',
      foodItemId:foodItemId,
      errorMsg:''
    });
  },
  reviewBlur(event,foodItemId){
    let value= event.target.value;
    // check if the value is greater than 0
    if(value.length>0){
      this.props.reviewError({
        storeKey:'reviewError',
        foodItemId:foodItemId,
        errorMsg:''
      });
    }else{
      this.props.reviewError({
        storeKey:'reviewError',
        foodItemId:foodItemId,
        errorMsg:'Please write a review'
      });
    }
  },
  closeModal(){
    this.props.openModal({storeKey:'reviewSubmitModalOpen', openModal:false});
  },
  submitReview(){
    let self = this;
    // check whether both the star rating and review are entered
    let {reviews} = this.props.providerProfile.toJS();
    let item = reviews.item;
    let userInput = reviews.reviewMap[item._id];
    if(item && userInput && userInput.review && userInput.rating){
      this.setState({showSpinner:true});
      const {user} = this.props.globalState.core.toJS();
      let combinedQuery={
        foodItemId:item._id,
        creatorId:user._id,
        reviewDate:new Date() ,
        creatorName: user.name,
        rating:userInput.rating,
        review:userInput.review
      }
      this.props.postSecuredData('/api/foodItem/'+item._id+'/review','submitReview','SUBMIT_REVIEW',combinedQuery)
        .then(function(){
          self.setState({showSpinner:false});
          self.props.refreshPage();
        });
      // remove data from the store
      this.props.flushOutStaleReviewData(item._id);
      // close the modal
      this.closeModal();
      // update the page

    }else{
      // check whether start rating or review is empty
      if(!userInput || !userInput.review){
        this.props.reviewError({
          storeKey:'reviewError',
          foodItemId:item._id,
          errorMsg:'Please write a review'
        })
      }
      if(!userInput || !userInput.rating){
        this.props.reviewError({
          storeKey:'ratingError',
          foodItemId:item._id,
          errorMsg:'Please give a star rating'
        });
      }
    }
  },
  render(){
    let {reviews,reviewSubmitModalOpen} = this.props.providerProfile.toJS();
    let item = reviews.item;
    if(reviews && item){
      reviews.reviewMap[item._id] = (reviews.reviewMap[item._id])? reviews.reviewMap[item._id]: {};
      reviews.reviewMap[item._id].rating = (reviews.reviewMap[item._id].rating)?reviews.reviewMap[item._id].rating : 0;
      reviews.reviewMap[item._id].review = (reviews.reviewMap[item._id].review)?reviews.reviewMap[item._id].review :'';
    }
    return  <FullscreenDialog
              open={reviewSubmitModalOpen || false}
              onRequestClose={this.closeModal}
            >{
              (reviews && item)?
              <div className="review-modal">
                <div className="pure-form move-center">
                  <div className="pure-group">
                    <div className="review-item-name">
                      {item.name}
                    </div>
                    {/*<img alt={item.name} className = "food-item" src={item.imgUrl}/>*/}
                    <div>
                      <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={reviews.reviewMap[item._id].rating}
                        onStarClick={(nextVal,prevVal,name)=>this.starRating(nextVal,prevVal,name,item._id)}
                      />
                      <div className = "error-message move-center">{(reviews.reviewMap[item._id].ratingError)?'*'+reviews.reviewMap[item._id].ratingError:undefined}</div>
                    </div>
                    <textarea className="pure-input-1" placeholder="Please write your review here"
                      name="review"
                      value={reviews.reviewMap[item._id].review || ''}
                      onFocus={(event)=>this.reviewFocus(event,item._id)}
                      onBlur = {(event)=>this.reviewBlur(event,item._id)}
                      onChange={(event)=>this.updateReview(event,item._id)}
                    ></textarea>
                    <span className = "error-message">{(reviews.reviewMap[item._id].reviewError)?'*'+reviews.reviewMap[item._id].reviewError:undefined}</span>
                  </div>
                  <div className="is-center-submit">
                    <div style={{display:(this.state.showSpinner)?'block':'none'}}>
                        <img src= "/general/loading.svg"/>
                    </div>
                    <FlatButton
                      backgroundColor="#FF6F00"
                      label="Submit"
                      labelStyle={{color:'white'}}
                      onClick={this.submitReview}
                      disableTouchRipple={true}
                    />
                  </div>
                </div>
              </div>
              :
              undefined
            }
            </FullscreenDialog>
  }
})


export default ReviewSubmitModal;
