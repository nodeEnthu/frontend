import React from 'react'
import Counter from 'components/Counter'
import { CUISINE_TYPES, DIET_TYPES } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import classes from './counter.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';
import RaisedButton from 'material-ui/RaisedButton';
const CounterWrapper = React.createClass({
    getInitialState() {
        return {
            pageNum: 1,
            queryBaseUrl: '/api/query/foodItems'
        };
    },
    filterCuisineOrDietType(event,cuisineOrDiet) {
        let selectedCuisineOrDiet = event.target.alt
        let storeKey = cuisineOrDiet + 'SelectedMap'
            // check whether its an image that was clicked
        if (selectedCuisineOrDiet) {
            this.props.selectCuisineOrDiet(storeKey, selectedCuisineOrDiet);
        } // else dont do anything
    },
    // defaults for the first time you load the page 
    componentDidMount() {    	
        this.props.fetchData(this.state.queryBaseUrl);
    },
    loadMore() {
    	let self = this;
        // make query params here
        let cuisineSelectedMap = this.props.counter.get('cuisineSelectedMap').toJS();
        let dietSelectedMap = this.props.counter.get('dietSelectedMap').toJS();
        //merge the two dieat and cuisine filters
        let combinedDietCuisineFilters = dietSelectedMap;
        for (let selectedCuisine in cuisineSelectedMap) {
            if (cuisineSelectedMap.hasOwnProperty(selectedCuisine)) {
                combinedDietCuisineFilters[selectedCuisine] = cuisineSelectedMap[selectedCuisine]
            }
        }
        // merging ends
        let combinedQuery = {}
        combinedQuery.combinedDietCuisineFilters = combinedDietCuisineFilters;
        combinedQuery.filterspageNum = this.state.pageNum;
        // now make the ajax call to get the data
        let newPageNum  = this.state.pageNum +1;
        this.props.fetchData(this.state.queryBaseUrl,combinedQuery)
	        .then(function(err,response){
	        	self.setState({
	        		pageNum : newPageNum
	        	})
	        })
    },
    render() {
        const { data } = this.props.counter.toJS();
        console.log("***",data);
        const { pageNum } = this.state;
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
					{	(data)? 
								data.map(function(foodItem,index){
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
					{
						(data  && data.length >=12*pageNum)?
						<div className={classes["load-more-center"]}>
							<RaisedButton 
								label="Show more results" 
								primary={true} 
								style={{width:'50%'}}
								onClick={this.loadMore}
						/>
						</div>
						:
						undefined
					}
				</div>
			</div>
        );
    }
})
CounterWrapper.propTypes = {
    fetchData: React.PropTypes.func.isRequired,
    selectCuisineOrDiet: React.PropTypes.func.isRequired,
    counter: React.PropTypes.object.isRequired
};

export default CounterWrapper;
