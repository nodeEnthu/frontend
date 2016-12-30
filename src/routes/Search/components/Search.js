import React from 'react'
import { CUISINE_TYPES, DIET_TYPES, RADIUS_OPTIONS, ORDER_TYPE } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import './search.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import { getCall,securedGetCall } from 'utils/httpUtils/apiCallWrapper';
import moment from 'moment';


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
    	this.props.userAddressSearchChange(suggestion.address);
        this.props.userAddressUpdatePlaceId(suggestion.place_id);
        // also register this address in the address book if the user is logged in
        if(this.props.globalState.core.get('userLoggedIn')){
    		//register this at a new location if possible as the user needs to be logged in for this
       		// register the address as most recently used
       		if(suggestion.place_id){
	       		securedGetCall('api/locations/registerMostRecentSearchLocation',{address:suggestion.address,place_id:suggestion.place_id})
	        		.then(function(result){
	        			// dont do anything
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
    	//console.log("making the call with ",combinedQuery)
        return this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery);
    },
    createAndFetchNewQuery(){
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
    componentDidUpdate(prevProps){
    	const newState = this.props.globalState;
    	const oldState =  prevProps.globalState;
    	const newPlaceId = newState.core.toJS().userAddressSearch.place_id;
    	const oldPlaceId = oldState.core.toJS().userAddressSearch.place_id;
    	const newDate = newState.search.toJS().addtnlQuery.date;
    	const prevDate = oldState.search.toJS().addtnlQuery.date;
    	// compare whether the place_id OR dates have changed
    	if(prevDate != newDate || newPlaceId != oldPlaceId){
    		this.createAndFetchNewQuery();
    	}
    },
    selectOption(stateKey, option) {
        if (option) {
            if (option instanceof Date) {
            	this.props.selectAddtnlQuery(stateKey, option);
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
        let  momentDate =(addtnlQuery.date)? moment(addtnlQuery.date) : moment();
        let displayDate = momentDate.format("MMM Do");
        return (
            <div className="search">
            	<Card>
				    <CardHeader
            			title= {<div style={{fontSize:'14px'}}>Showing results for {displayDate} <span style={{float:'right'}}>Filter</span></div>}
				      	showExpandableButton={true}
				      	actAsExpander = {true}
				      	textStyle={{display:'block', paddingRight:'2em'}}/>
				    <CardText expandable={true} style={{padding:'0 1em'}}>
					    <div className="date-title">
					    	<form className="pure-form pure-form-stacked">
						        <fieldset>
						            <div>
						                <div className="pure-u-1 pure-u-md-1-3">
						                    <label>date</label>
						                    <DatePicker
	                                            container="inline"
	                                            style={{width:'100%'}}
	                                            name="serviceDate"
	                                            textFieldStyle={{width:'100%'}}
	                                            inputStyle={{marginTop:'0px',height:'2.25em',border: '1px solid #ccc',boxShadow: 'inset 0 1px 3px #ddd',padding: '.5em .6em'}}
	                                            underlineStyle={{display: 'none'}}
	                                            hintText=""
	                                            autoOk={true}
	                                            value={addtnlQuery.date}
	                                            onBlur={this.handleChange} 
	                                            onFocus={this.handleFocus}
	                                            onTouchTap={(event)=>event.preventDefault()}
	                                            onChange={(event,date)=>this.selectOption('date',date)}
	                                            formatDate={(date)=> date.toDateString()}
	                                        />
						                </div>
						    
						                <div className="pure-u-1 pure-u-md-1-3">
						                    <label>address</label>
						                    <AsyncAutocomplete name={'addressSearch'}
		                                        userSearchText = {this.props.globalState.core.get('userAddressSearch').get('searchText')}
		                                        apiUrl = {'/api/locations/addressTypeAssist'}
		                                        getSuggestionValue={(suggestion)=>suggestion.address}
		                                        onChange = {(event, value)=>this.props.userAddressSearchChange(value.newValue)}
		                                        onSuggestionSelected = {this.onSuggestionSelected}
						                    />
						                </div>
						    
						                <div className="pure-u-1 pure-u-md-1-3">
						                    <label>diet-types</label>
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
						                    <label>pick-up delivery</label>
						                    <Select
											    name="order-mode"
											    placeholder="pick-up/delivery"
											    value={addtnlQuery.orderMode}
											    options={ORDER_TYPE}
											    onChange={(selectedMode)=>this.selectOption('orderMode',selectedMode)}
											/>
						                </div>
						    
						                <div className="pure-u-1 pure-u-md-1-3">
						                    <label>provider distance</label>
						                    <Select
											    name="provider-radius"
											    placeholder="pick-up radius"
											    value={addtnlQuery.providerRadius}
											    options={RADIUS_OPTIONS}
											    onChange={(selectedRadius)=>this.selectOption('providerRadius',selectedRadius)}
											/>
						                </div>
						            </div>
						        </fieldset>
						        <div className="query-btn-center">
									<RaisedButton 
										label="Search" 
										primary={true}
										disabled={!this.state.searchActivated}
										style={{
											width:'40%'
										}}
										onClick={this.createAndFetchNewQuery}
										disableTouchRipple={true} 
									/>
								</div>
						    </form>
						</div>
				    </CardText>
				</Card>
				<div className = 'cuisine-carousel-wrapper' onClick={(event)=>this.filterCuisineOrDietType(event,'cuisine')}>
					<Carousel
						slidesToShow={5}
						cellSpacing={10}
						dragging={true}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
							return <img alt={cuisine.type} 
										key={index}
										src={(this.props.search.get('cuisineSelectedMap').get(cuisine.type))? '/selection/dark-green-check-mark-md.svg':'/transparent.png'}
										name={cuisine.type}
										style={
											{
												background:'url('+cuisine.src+') center no-repeat',
												backgroundSize:'cover'
											}
										}
										className="carousel-img"
									/>
						})}
					</Carousel>
				</div>
				
				<div className="providers-wrapper">
					<div className="pure-g">
					{	(resolvedData)? 
								resolvedData.map(function(foodItem,index){
									return 	<div key={index} className="pure-u-1 pure-u-md-1-3"
												onClick={(event)=>self.goToProvider(event,foodItem)}	>
												<div className="provider-profile-wrapper">
											    	<div className="provider-img-section">
											    		<div className="img-avatar">
											    			<img src={foodItem.imgUrl}/>
											    		</div>
											    	</div>
											    	<div className="provider-info-section">
											    		<div>{foodItem.name}</div>
											    		<div>
											    			<div className="provider-star-rating">
													    		<StarRatingComponent 
										                            name={foodItem._id} 
										                            editing={false}
										                            starCount={5}
										                            value={foodItem.rating}
										                         />
									                         </div>
									                         <div className="num-of-reviews">
									                         	{(foodItem.numOfReviews)? foodItem.numOfReviews+' review': undefined}
									                         </div>
									                         <div className="miles-away"><span>{foodItem.distance}</span><span>mi</span></div>
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
						<div className="load-more-center">
							<RaisedButton 
								label="Show more results" 
								primary={true} 
								style={{width:'50%'}}
								onClick={this.loadMore}
								disableTouchRipple={true}
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
