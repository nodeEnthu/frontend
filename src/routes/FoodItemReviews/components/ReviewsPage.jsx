import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const ReviewsPage= React.createClass({
	componentDidMount() {
		const foodItemId = this.props.params.id;
		this.props.fetchData('/api/foodItem/'+this.props.params.id+'/reviews','getReviews','REVIEWS')
	},
	render(){
		const {getReviews} = this.props.reviews.toJS();
		const data = getReviews.data;
		return (data)?
			<div>
				{
					data.reviews.map((review)=>{
						return 	<div key={review._id}
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
			:
			<div></div>
	}
})

ReviewsPage.propTypes= {
    fetchData:React.PropTypes.func.isRequired,
    reviews:React.PropTypes.object.isRequired,
    globalState:React.PropTypes.object.isRequired
};
export default ReviewsPage;