import React from 'react'
import classes from './../ProviderProfile/providerProfile.scss'
import Modal from 'react-modal';
import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';


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
const ReviewSubmitModal = React.createClass({
  getInitialState() {
      return {
          reviewFoodItemModalOpen:false
      };
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
  closeModal(){
    this.props.openModal({storeKey:'reviewSubmitModalOpen', openModal:false});
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
      this.props.postSecuredData('/api/foodItem/'+review.item._id+'/review',review,'SUBMIT_REVIEW',combinedQuery);
      // close the modal
      this.closeModal();
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
  render(){
    let {review,reviewSubmitModalOpen} = this.props.providerProfile.toJS();
    return <Modal
            isOpen={reviewSubmitModalOpen}
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
  }
})


export default ReviewSubmitModal;
