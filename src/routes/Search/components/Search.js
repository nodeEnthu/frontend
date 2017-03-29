import React from 'react'
import { CUISINE_TYPES, DIET_TYPES, RADIUS_OPTIONS, ORDER_TYPE, DATES } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import './search.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import { getCall,securedGetCall } from 'utils/httpUtils/apiCallWrapper';
import moment from 'moment';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import FlatSelection from 'components/FlatSelection';
import carouselArrows from './FilterDecorator'

export const CORRECTION_FACTOR = 1.2;

const Search = React.createClass({
    getInitialState() {
        return {
            pageNum: 0,
            queryBaseUrl: '/api/query/providers',
            searchActivated:false,
            placeIdErrorMsg:'',
            showFilters:false
        };
    },
    showFilter(){
    	this.setState({showFilters:!this.state.showFilters})
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    validatePlaceId(){
    	let {place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
    	return (place_id)? true:false;
    },
    filterCuisineOrDietType(valOrevent, cuisineOrDiet) {
        let selectedCuisineOrDiet = (valOrevent && valOrevent.target) ? valOrevent.target.alt : valOrevent;
        let storeKey = cuisineOrDiet + 'SelectedMap'
            // check whether its an image that was clicked
        if (selectedCuisineOrDiet) {
            this.props.selectCuisineOrDiet(storeKey, selectedCuisineOrDiet);
            this.activateQueryButton(true);
        } // else dont do anything
    },

    // defaults for the first time you load the page 
    componentDidMount() {
    	const {place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
    	const user = this.props.globalState.core.get('user').toJS();
    	// case: a LOGGED IN (guest will always have an address) person has came in without address
    	if(!place_id && user.name){
    		// two different cases for type of person
    		if (user.userType === 'consumer') {
                if (user.loc ) {
                    this.props.userAddressSearchChange(user.loc.searchText);
        			this.props.userAddressUpdatePlaceId(user.loc.place_id);
                } 
            } else {
                // its a provider trying to look for food
                this.props.userAddressSearchChange(user.userSeachLocations[user.deliveryAddressIndex].searchText);
        		this.props.userAddressUpdatePlaceId(user.userSeachLocations[user.deliveryAddressIndex].place_id);
            }
    	}
        let combinedQuery = this.createQuery();
        this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery);
    },

    componentWillUnmount() {
    	this.props.flushOutStaleData();
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
        this.activateQueryButton(true);
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
    	this.activateQueryButton(false);
        return this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery)
        	.then(function(response){
        	});
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
    },

    selectOption(stateKey, option) {
        if (option) {
            this.props.selectAddtnlQuery(stateKey, option.value);
        } else {
            this.props.selectAddtnlQuery(stateKey, undefined);
        }
        this.activateQueryButton(true);
    },

    activateQueryButton(val){
    	if(this.validatePlaceId()){
    		this.setState({searchActivated:val});
    		this.setState({placeIdErrorMsg:null});
    	}else{
    		this.setState({searchActivated:false});
    		this.setState({'placeIdErrorMsg':'Please select from one of the suggested values'})
    	}
    },

    goToProvider(event,foodItem){
    	this.context.router.push('/providerProfile/'+foodItem._creator);
    },

    render() {
        let { data, addtnlQuery, dietSelectedMap } = this.props.search.toJS();
        const { pageNum,placeIdErrorMsg} = this.state;
        const {userAddressSearch} = this.props.globalState.core.toJS();
        let resolvedData = [];
        for (let i = 0; i < data.length; i++) {
        	if(data[i].foodItems && data[i].foodItems.length>0){
        		for (let j = 0; j < data[i].foodItems.length; j++) {
                	data[i].foodItems[j].distance = (data[i].distance* CORRECTION_FACTOR).toFixed(2);
                	data[i].foodItems[j].doYouDeliverFlag = data[i].doYouDeliverFlag;
                	data[i].foodItems[j].pickUpFlag = data[i].pickUpFlag;
            	}
            	resolvedData = resolvedData.concat(data[i].foodItems);
        	}
        }
        let self = this;
        addtnlQuery.date = addtnlQuery.date || DATES()[0].value ;
        return (
            <div className="search">
            	<div className="pure-g">
            		<div className="pure-u-1 pure-u-md-2-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                                </svg>
                            </div>
    	                    <AsyncAutocomplete name={'addressSearch'}
                                userSearchText = {this.props.globalState.core.get('userAddressSearch').get('searchText')}
                                apiUrl = {'/api/locations/addressTypeAssist'}
                                getSuggestionValue={(suggestion)=>suggestion.address}
                                onBlur={this.activateQueryButton}
                                onChange = {(event, value)=>{
                                		this.props.userAddressUpdatePlaceId(null);
                                		this.props.userAddressSearchChange(value.newValue);
                                	}
                                }
                                onSuggestionSelected = {this.onSuggestionSelected}
    	                    />
    	                    {/*<div>{placeIdErrorMsg}</div>*/}
                        </div>
	                </div>
					<div className="pure-u-1-3 pure-u-md-1-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                                <svg  width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                                </svg>
                            </div>
                            <div className="select-date">
        	                    <SelectField autoWidth={false} style={{width:'80%',left:'25px',height:'auto',top:'5px'}}
                                            fullWidth={false}
                                            labelStyle={{top:'4px',color:'#f26800'}}
                                            floatingLabelStyle={{textAlign: 'middle'}} 
                                            menuStyle={{width:'100%',textAlign:'left'}}
                                            underlineStyle={{width:'80%'}} 
                                            iconStyle={{top:'19px', right:'15px'}}
                                            value={addtnlQuery.date} 
                                            onChange={(event,index,value)=>this.selectOption('date',{value:value})}>
        	                    	{
        	                    		DATES().map(function(date,index){
        	                    			return <MenuItem style={{width:'100%'}} key={index} value={date.value} primaryText={date.title}/>
        	                    		})
        	                    	}
        					   </SelectField>
                            </div>
                        </div>
					</div> 
					<div className="pure-u-1-3 pure-u-md-1-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M3,13.5L2.25,12H7.5L6.9,10.5H2L1.25,9H9.05L8.45,7.5H1.11L0.25,6H4A2,2 0 0,1 6,4H18V8H21L24,12V17H22A3,3 0 0,1 19,20A3,3 0 0,1 16,17H12A3,3 0 0,1 9,20A3,3 0 0,1 6,17H4V13.5H3M19,18.5A1.5,1.5 0 0,0 20.5,17A1.5,1.5 0 0,0 19,15.5A1.5,1.5 0 0,0 17.5,17A1.5,1.5 0 0,0 19,18.5M20.5,9.5H18V12H22.46L20.5,9.5M9,18.5A1.5,1.5 0 0,0 10.5,17A1.5,1.5 0 0,0 9,15.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 9,18.5Z" />
                                </svg>
                            </div>
                          <div className="adjust-delivery">  
						      <FlatSelection selections={[{title:'delivery',value:'delivery'}]}/>
                          </div>
                        </div>
					</div>
					<div onClick={this.showFilter} className="pure-u-1-3 pure-u-md-1-5 display-table">
                        <div className="move-center show-hide-filter">
	                       <FlatSelection selections={[{title:'filter/sort',value:'showFilters'}]}/>
                        </div>
					</div> 
            	</div>
            	<div style={{display:(this.state.showFilters)?'block':'none'}}>
            		<div className="pure-u-1-3 pure-u-md-2-5">
	                    <label>radius</label>
	                    <SelectField value={3} onChange={(event)=>this.selectOption(event.target.name,event.target.value)}>
	                    	{
	                    		RADIUS_OPTIONS.map(function(radius,index){
	                    			return <MenuItem key={index} value={radius.value} label={radius.label} primaryText={radius.label}/>
	                    		})
	                    	}
					      </SelectField>
					</div> 
            	</div>
				<div className = 'cuisine-carousel-wrapper' onClick={(event)=>this.filterCuisineOrDietType(event,'cuisine')}>
					<Carousel
                        slideWidth="100px"
                        slideHeight="100px"
						dragging={true}
                        decorators={carouselArrows}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
                            return <img alt={cuisine.type} 
                                        key={index}
                                        src='/transparent.png'
                                        name={cuisine.type}
                                        style={
                                            {
                                                background:'url('+cuisine.src+')  center no-repeat',
                                                backgroundSize:'75%',
                                                backgroundColor:(this.props.search.get('cuisineSelectedMap').get(cuisine.type)) ? '#f26800' : 'none' 
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
									return 	<div key={index} className="pure-u-1 pure-u-md-1-3 provider-profile-wrapper"
												onClick={(event)=>self.goToProvider(event,foodItem)}>
												<div>
											    	<div className="pure-u-2-5 provider-img-section">
											    		<div className="img-avatar">
											    			<img src={foodItem.imgUrl}/>
											    		</div>
											    	</div>
											    	<div className="pure-u-3-5 provider-info-section">
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
											    				(foodItem.doYouDeliverFlag)?
											    					<div>
											    						&#10003; &nbsp; delivery
											    					</div>
											    					:
											    					<div>
											    						&#x2715; &nbsp; delivery
											    					</div>
											    		}
											    		{
											    				(foodItem.pickUpFlag)?
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
											    			order ready : {
											    							foodItem.availability.map(function(date,index){
											    								if(foodItem.availability.length != index+1){
											    									return moment(date).format("dd, MMM Do")+' | ';
											    								} else return moment(date).format("dd, MMM Do");
											                               	
											                              	})
											    						}  
											    		</div>
											    		<div>
											    			pick-up : {resolvePickUpTime(foodItem.pickUpStartTime) +" - "+resolvePickUpTime(foodItem.pickUpEndTime)}
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
						(data  && data.length >= 12*(pageNum+1))?
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
