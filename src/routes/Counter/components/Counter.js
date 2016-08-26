import React from 'react'
import Counter from 'components/Counter'
import { CUISINE_TYPES, DIET_TYPES } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import classes from './counter.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';

const CounterWrapper = React.createClass({
    filterCuisineOrDietType(event,cuisineOrDiet) {
        let selectedCuisineOrDiet = event.target.alt
        let storeKey= cuisineOrDiet + 'SelectedMap'
            // check whether its an image that was clicked
        if (selectedCuisineOrDiet) {
            //check whether the selection was already selected        
            this.props.selectCuisineOrDiet(storeKey,selectedCuisineOrDiet);
        } // else dont do anything
    },
    componentDidMount() {
    	this.props.fetchData({organic:true});
    },

    render() {
    	const {data} = this.props.counter.toJS();
        return (
            <div>
				<div onClick={(event)=>this.filterCuisineOrDietType(event,'cuisine')}>
					<Carousel
						slidesToShow={5}
						cellSpacing={10}
						dragging={true}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
							return <img alt={cuisine.type} 
										key={index}
										src={(this.props.counter.get('cuisineSelectedMap').get(cuisine.type))? '/selection/dark-green-check-mark-md.svg': undefined}
										name={cuisine.type}
										style={
											{
												background:'url('+cuisine.src+') center',
											}
										}
										className={classes["carousel-img"]}
									/>
						})}
					</Carousel>
				</div>
				<div className = {classes["diet-wrapper"]} onClick = {(event)=>this.filterCuisineOrDietType(event,'diet')}>
					<Carousel
						slidesToShow={5}
						cellSpacing={10}
						dragging={true}
					>
						{DIET_TYPES.map((diet,index)=>{
							return <img alt={diet.type} 
										key={index}
										src={(this.props.counter.get('dietSelectedMap').get(diet.type))? '/selection/dark-green-check-mark-md.svg': undefined}
										name={diet.type}
										style={
											{
												background:'url('+diet.src+') center',
											}
										}
										className={classes["carousel-img"]}
									/>
						})}
					</Carousel>
				</div>
				<div className={classes["providers-wrapper"]}>
					<div className="pure-g">
					{	(data.data)? 
								data.data.map(function(foodItem,index){
									return 	<div key={index} className={classNames("pure-u-1 pure-u-md-1-3")}>
												<div className={classes["provider-profile-wrapper"]}>
											    	<div className={classes["provider-img-section"]}>
											    		<div className={classes["img-avatar"]}>
											    			<img src={foodItem._creator.img}/>
											    		</div>
											    	</div>
											    	<div className={classes["provider-info-section"]}>
											    		<div>{foodItem._creator.name}</div>
											    		<div>
											    			<div className={classes["provider-star-rating"]}>
													    		<StarRatingComponent 
										                            name="rate2" 
										                            editing={false}
										                            renderStarIcon={() => <span>&#11088;</span>}
										                            starCount={5}
										                            value={4}
										                         />
									                         </div>
									                         <div className={classes["num-of-reviews"]}>
									                         	(45)
									                         </div>
									                         <div className={classes["miles-away"]}>1.9mi</div>
											    		</div>
											    		{
											    			
											    				(foodItem._creator.doYouDeliverFlag)?
											    					<div>
											    						&#10003; &nbsp; delivery
											    					</div>
											    					:
											    					<div>
											    						&#x2715; &nbsp; delivery
											    					</div>
											    		}
											    		{
											    			
											    				(foodItem._creator.pickUpFlag)?
											    					<div>
											    						&#10003; &nbsp; pickup
											    					</div>
											    					:
											    					<div>
											    						&#x2715; &nbsp; pickup
											    					</div>
											    		}
											    			
											    		
											    		<div>
											    			order by : {new Date(foodItem.placeOrderBy).toDateString()}  
											    		</div>
											    		<div>
											    			order ready : {new Date(foodItem.serviceDate).toDateString()}  
											    		</div>
											    		<div>
											    			pick-up time: 11AM to 6PM
											    		</div>
											    		<div>
											    			delivery time: 12PM to 6PM
											    		</div>
											    	</div>
											    </div>
											</div>
										})
										:
										undefined
					}
					</div>
				</div>
			</div>
        );
    }
})
CounterWrapper.propTypes = {
    fetchData:React.PropTypes.func.isRequired,
    selectCuisineOrDiet:React.PropTypes.func.isRequired,
    counter:React.PropTypes.object.isRequired
};

export default CounterWrapper;