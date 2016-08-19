import React from 'react'
import Counter from 'components/Counter'
import { CUISINE_TYPES, DIET_TYPES } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import classes from './counter.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';

const CounterWrapper = React.createClass({
    getInitialState() {
        return {
            cuisineSelected: '',
            cuisineSelectedArr: [],
            dietSelected: '',
            dietSelectedArr: []
        };
    },
    filterCuisineType(event) {
        let selectedCuisine = event.target.alt
            // check whether its an image that was clicked
        if (selectedCuisine) {
            //check whether the selection was already selected
            const indexOfSelectedItem = this.state.cuisineSelectedArr.indexOf(event.target.alt);
            if (indexOfSelectedItem > -1) {
                this.state.cuisineSelectedArr.splice(indexOfSelectedItem, 1);
                let newState = [].concat(this.state.cuisineSelectedArr);
                this.setState({
                    cuisineSelected: '',
                    cuisineSelectedArr: newState
                })
            } else {
                this.setState({
                    cuisineSelected: event.target.alt,
                    cuisineSelectedArr: this.state.cuisineSelectedArr.concat([event.target.name])
                })
            }
        } // else dont do anything
    },
    filterDietType(event) {
        let selectedDiet = event.target.alt
            // check whether its an image that was clicked
        if (selectedDiet) {
            //check whether the selection was already selected
            const indexOfSelectedItem = this.state.dietSelectedArr.indexOf(event.target.alt);
            if (indexOfSelectedItem > -1) {
                this.state.dietSelectedArr.splice(indexOfSelectedItem, 1);
                let newState = [].concat(this.state.dietSelectedArr);
                this.setState({
                    dietSelected: '',
                    dietSelectedArr: newState
                })
            } else {
                this.setState({
                    dietSelected: event.target.alt,
                    dietSelectedArr: this.state.dietSelectedArr.concat([event.target.name])
                })
            }
        } // else dont do anything
    },
    render() {
        return (
            <div>
				{/*<Counter {...this.props}/>*/}
				<div onClick={this.filterCuisineType}>
					<Carousel
						slidesToShow={5}
						cellSpacing={10}
						dragging={true}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
							return <img alt={cuisine.type} 
										key={index}
										src={(cuisine.type === this.state.cuisineSelected || this.state.cuisineSelectedArr.indexOf(cuisine.type)>-1)? '/selection/dark-green-check-mark-md.svg': undefined}
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
				<div className = {classes["diet-wrapper"]} onClick={this.filterDietType}>
					<Carousel
						slidesToShow={5}
						cellSpacing={10}
						dragging={true}
					>
						{DIET_TYPES.map((diet,index)=>{
							return <img alt={diet.type} 
										key={index}
										src={(diet.type === this.state.dietSelected || this.state.dietSelectedArr.indexOf(diet.type)>-1)? '/selection/dark-green-check-mark-md.svg': undefined}
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
					    <div className={classNames("pure-u-1 pure-u-md-1-3")}>
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					    <div className="pure-u-1 pure-u-md-1-3">
					    	<div className={classes["provider-profile-wrapper"]}>
						    	<div className={classes["provider-img-section"]}>
						    		<div className={classes["img-avatar"]}>
						    			<img src="/cuisines/indian.jpeg"/>
						    		</div>
						    	</div>
						    	<div className={classes["provider-info-section"]}>
						    		<div>Lache Paraunthe waale</div>
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
						    		<div>
						    			&#10003; &nbsp; delivery
						    		</div>
						    		<div>
						    			&#10003; &nbsp; pickup
						    		</div>
						    		<div>
						    			order by : Mon, Oct 3  
						    		</div>
						    		<div>
						    			order ready : Wed, Oct 4  
						    		</div>
						    		<div>
						    			pick-up time: 11AM to 6PM
						    		</div>
						    		<div>
						    			delivery time: 12AM to 6PM
						    		</div>
						    	</div>
						    </div>
					    </div>
					</div>
				</div>
				
			</div>
        );
    }
})

export default CounterWrapper
