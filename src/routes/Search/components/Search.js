import React from 'react'
import { CUISINE_TYPES, DIET_TYPES, RADIUS_OPTIONS, ORDER_TYPE } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import classes from './search.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import { getCall,securedGetCall } from 'utils/httpUtils/apiCallWrapper';


const Search = React.createClass({
    getInitialState() {
        return {
            pageNum: 1,
            queryBaseUrl: '/api/query/providers',
            searchActivated:false
        };
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    filterCuisineOrDietType(valOrevent, cuisineOrDiet) {
        let selectedCuisineOrDiet = (valOrevent && valOrevent.target) ? valOrevent.target.alt : valOrevent;
        let storeKey = cuisineOrDiet + 'SelectedMap'
            // check whether its an image that was clicked
        if (selectedCuisineOrDiet) {
            this.props.selectCuisineOrDiet(storeKey, selectedCuisineOrDiet);
            this.activateQueryButton();
        } // else dont do anything
    },
    // defaults for the first time you load the page 
    componentDidMount() {
        this.props.flushOutStaleData();       
        let combinedQuery = this.createQuery();
        this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery);
    },
    componentWillReceiveProps(nextProps){
    	const {userAddressSearch} = nextProps.globalState.core.toJS();
    },
    loadMore() {
       	let newPageNum = this.state.pageNum + 1;
       	let self = this;
  		this.fetchQueryData()
	       	.then(function(err, response) {
	                self.setState({
	                    pageNum: newPageNum
	                })
	            })
    },
    onSuggestionSelected(event,{suggestion}){
    	console.log('BEFORE: ',this.props.globalState.core.get('userAddressSearch').toJS());
    	this.props.userAddressSearchChange(suggestion.address);
        this.props.userAddressUpdatePlaceId(suggestion.place_id);
        const {searchText,place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
        console.log('AFTER: ','searchText: ' + searchText,'place_id: ' +  place_id, suggestion);
        //remove whats in there currently in the state
        this.props.flushOutStaleData(); 
        // now make the search call with the required params
        this.fetchQueryData();
        // also register this address in the address book if the user is logged in
        if(this.props.globalState.core.get('userLoggedIn')){
    		//register this at a new location if possible as the user needs to be logged in for this
       		// register the address as most recently used
       		if(searchText && place_id){
	       		securedGetCall('api/locations/registerMostRecentSearchLocation',{address:searchText,place_id:place_id})
	        		.then(function(result){
	        			self.state.showBackDrop = false;
	        			self.context.router.push(page);
	        		}); 	
       		}
    	} 
    },
    createQuery() {
        let combinedQuery = {};
        const {place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
        combinedQuery.guestLocation = {'place_id':place_id};
        combinedQuery.cuisineSelectedMap = this.props.search.get('cuisineSelectedMap').toJS();
        combinedQuery.dietSelectedMap = this.props.search.get('dietSelectedMap').toJS();
        combinedQuery.addtnlQuery = this.props.search.get('addtnlQuery').toJS();
        combinedQuery.filterspageNum = this.state.pageNum;
        return combinedQuery;
    },
    fetchQueryData() {
    	let combinedQuery = this.createQuery();
        return this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery);
    },
    createNewQuery(){
    	// flush out old data
    	this.props.flushOutStaleData();
    	this.fetchQueryData();
    },
    selectDietType(dietTypes) {
        const dietSelectedMap = this.props.search.get('dietSelectedMap').toJS();
        let newDietsSelected = [];
        /* 
         * get the one which was most recently added or removed from the list
         * by comparing the keys inside dietSelectedMap to the value of each object in dietTypes
         * there should only be one such element as the function is called for every change
         */
        let oldDietSelectedMapKeys = Object.keys(dietSelectedMap);
        dietTypes.forEach(function(dietType, index) {
            newDietsSelected.push(dietType.value);
        })
        let parentArr = (newDietsSelected.length > oldDietSelectedMapKeys.length) ? newDietsSelected : oldDietSelectedMapKeys;
        let childArr = (newDietsSelected.length > oldDietSelectedMapKeys.length) ? oldDietSelectedMapKeys : newDietsSelected;
        let uniqueDietAdded = parentArr.filter(function(diet) {
            return childArr.indexOf(diet) === -1
        })
        this.filterCuisineOrDietType(uniqueDietAdded[0], 'diet');
    },
    selectOption(stateKey, option) {
        if (option) {
            if (option instanceof Date) {
            	// in case of date being chnaged make the call instantly
            	this.props.selectAddtnlQuery(stateKey, option);
            	this.fetchQueryData();
            } else {
            	this.props.selectAddtnlQuery(stateKey, option.value);
            	this.activateQueryButton();
            }
        } else {
            this.props.selectAddtnlQuery(stateKey, undefined);
        }

    },
    activateQueryButton(){
    	this.setState({
    		searchActivated:true
    	})
    },
    goToProvider(event,foodItem){
    	this.context.router.push('/providerProfile/'+foodItem._creator);
    },
    render() {
    	console.log("rerender");
        let { data, addtnlQuery, dietSelectedMap } = this.props.search.toJS();
        const { pageNum } = this.state;
        const {userAddressSearch} = this.props.globalState.core.toJS();
        let resolvedData = [];
        for (let i = 0; i < data.length; i++) {
        	if(data[i].foodItems && data[i].foodItems.length>0){
        		for (let j = 0; j < data[i].foodItems.length; j++) {
                	data[i].foodItems[j].distance = (data[i].distance / 1600).toFixed(2);
            	}
            	resolvedData = resolvedData.concat(data[i].foodItems);
        	}
            
        }
        let self = this;
        return (
            <div>
            	<div className={classes["date-title"]}>
            		Order date:  
    				<DatePicker
    					container="inline"
    					underlineStyle={{
    						width:"100px",
    						border: "1px dotted grey"
    					}}
    					inputStyle={{
    						width:"100px",
    					}}
    					style={{
    						display:'inline-block',
    						marginLeft:'10px',
    						width:'100px'
    					}}
    					defaultDate={addtnlQuery.date}
    					autoOk={true}
    					name="serviceDate"
    					onChange={(event, date)=>this.selectOption('date',date)}

    				/>
    				<div style={{display:'inline-block', marginLeft:'3em'}}>
	            		<AsyncAutocomplete  name={'addressSearch'}
	                                        userSearchText = {this.props.globalState.core.get('userAddressSearch').get('searchText')}
	                                        apiUrl = {'/api/locations/addressTypeAssist'}
	                                        getSuggestionValue={(suggestion)=>suggestion.address}
	                                        onChange = {(event, value)=>this.props.userAddressSearchChange(value.newValue)}
	                                        onSuggestionSelected = {this.onSuggestionSelected}
	                    />
	            	</div>
            	</div>
            	
				<div onClick={(event)=>this.filterCuisineOrDietType(event,'cuisine')}>
					<Carousel
						slidesToShow={5}
						cellSpacing={10}
						dragging={true}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
							return <img alt={cuisine.type} 
										key={index}
										src={(this.props.search.get('cuisineSelectedMap').get(cuisine.type))? '/selection/dark-green-check-mark-md.svg': undefined}
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
				<Card>
				    <CardHeader
				      title="More search options"
				      showExpandableButton={true}
				      style={{textAlign:"center"}}
				      actAsExpander = {true}
				    />
				    <CardText expandable={true}>
					    <div className="pure-g">
						    <div className="pure-u-1 pure-u-md-1-3"> 
							    <Select
								    name="diet-types"
								    placeholder="select by diet type"
								    options={DIET_TYPES}
								    value={Object.keys(dietSelectedMap).join(',')}
								    multi = {true}
								    autoBlur={true}
								    onChange={this.selectDietType}
								/> 
							</div>
						    <div className="pure-u-1 pure-u-md-1-3"> 
							    <Select
								    name="order-mode"
								    placeholder="pick-up/delivery"
								    value={addtnlQuery.orderMode}
								    options={ORDER_TYPE}
								    onChange={(selectedMode)=>this.selectOption('orderMode',selectedMode)}
								/> 
							</div>
						    <div className="pure-u-1 pure-u-md-1-3"> 
							    <Select
								    name="provider-radius"
								    placeholder="pick-up radius"
								    value={addtnlQuery.providerRadius}
								    options={RADIUS_OPTIONS}
								    onChange={(selectedRadius)=>this.selectOption('providerRadius',selectedRadius)}
								/> 
							</div>
						</div>
				    </CardText>
				</Card>
				<div className={classes["query-btn-center"]}>
					<RaisedButton 
						label="Search" 
						primary={true}
						disabled={!this.state.searchActivated}
						style={{
							width:'40%'
						}}
						onClick={this.createNewQuery} 
					/>
				</div>
				<div className={classes["providers-wrapper"]}>
					<div className="pure-g">
					{	(resolvedData)? 
								resolvedData.map(function(foodItem,index){
									return 	<div key={index} className={classNames("pure-u-1 pure-u-md-1-3")}
												onClick={(event)=>self.goToProvider(event,foodItem)}	>
												<div className={classes["provider-profile-wrapper"]}>
											    	<div className={classes["provider-img-section"]}>
											    		<div className={classes["img-avatar"]}>
											    			<img src={foodItem.img}/>
											    		</div>
											    	</div>
											    	<div className={classes["provider-info-section"]}>
											    		<div>{foodItem.name}</div>
											    		<div>
											    			<div className={classes["provider-star-rating"]}>
													    		<StarRatingComponent 
										                            name={foodItem._id} 
										                            editing={false}
										                            starCount={5}
										                            value={foodItem.rating}
										                         />
									                         </div>
									                         <div className={classes["num-of-reviews"]}>
									                         	{(foodItem.numOfReviews)? foodItem.numOfReviews+' review': undefined}
									                         </div>
									                         <div className={classes["miles-away"]}><span>{foodItem.distance}</span><span>mi</span></div>
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
Search.propTypes = {
    globalState: React.PropTypes.object.isRequired,
    flushOutStaleData: React.PropTypes.func.isRequired,
    fetchMayBeSecuredData: React.PropTypes.func.isRequired,
    selectCuisineOrDiet: React.PropTypes.func.isRequired,
    selectAddtnlQuery: React.PropTypes.func.isRequired,
    search: React.PropTypes.object.isRequired,
    userAddressSearchChange: React.PropTypes.func.isRequired,
    userAddressUpdatePlaceId: React.PropTypes.func.isRequired
};

export default Search;
