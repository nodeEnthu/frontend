import React from 'react'
import { CUISINE_TYPES, DIET_TYPES, RADIUS_OPTIONS, ORDER_TYPE, DATES } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import './search.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AsyncAutocomplete from 'components/AsyncAutocomplete';
import { getCall,securedGetCall } from 'utils/httpUtils/apiCallWrapper';
import moment from 'moment';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';
import FlatSelection from 'components/FlatSelection';
import carouselArrows from './FilterDecorator'
import getSearchAddressAndPlaceId from 'utils/getSearchAddressAndPlaceId';
import Truncate from 'react-truncate';
import FoodItemModal from 'components/FoodItemModal';

const Search = React.createClass({
    getInitialState() {
        return {
            pageNum: 0,
            queryBaseUrl: '/api/query/providers',
            searchActivated:false,
            placeIdErrorMsg:'',
            showFilters:false,
            foodItemModalOpen:false,
            foodIdSelected:undefined
        };
    },
    showFilter(e){
        this.setState({showFilters:!this.state.showFilters})
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    validatePlaceId(){
    	let {place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
    	return (place_id)? true:false;
    },
    filterCuisineOrDietType(val,dietOrCuisine) {
        this.props.setDirty(true);
        this.props.selectCuisineOrDiet(dietOrCuisine,val);
        this.props.setDirty(true);
    },

    // defaults for the first time you load the page 
    componentDidMount() {
    	const {place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
    	const user = this.props.globalState.core.get('user').toJS();
    	// case: a LOGGED IN (guest will always have an address so no need to check for that) person has came in without address
    	if(!place_id && user.name){
    		let userSearchAndPlaceId = getSearchAddressAndPlaceId(user);
            this.props.userAddressSearchChange(userSearchAndPlaceId.address);
        	this.props.userAddressUpdatePlaceId(userSearchAndPlaceId.placeId);
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
        this.props.setDirty(true);
    },

    createQuery() {
        let combinedQuery = {};
        const {place_id} = this.props.globalState.core.get('userAddressSearch').toJS();
        combinedQuery.guestLocation = {'place_id':place_id};
        combinedQuery.cuisineSelectedMap = this.props.search.get('cuisineSelectedMap').toJS();
        combinedQuery.dietSelectedMap = this.props.search.get('dietSelectedMap').toJS();
        combinedQuery.addtnlQuery = this.props.search.get('addtnlQuery').toJS();
        //combinedQuery.addtnlQuery.date = combinedQuery.addtnlQuery.date || moment().startOf('day').valueOf();
        combinedQuery.filterspageNum = this.state.pageNum;
        return combinedQuery;
    },

    fetchQueryData() {
    	let combinedQuery = this.createQuery();
        return this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery)
        	.then(function(response){
        	});
    },

    createAndFetchNewQuery(){
    	// flush out old data
    	this.props.flushOutStaleData();
    	this.fetchQueryData();
    },

    componentDidUpdate(prevProps){
        if(this.props.search.get('dirty')){
            this.props.setDirty(false);
            this.createAndFetchNewQuery();
        }
    },

    selectOption(value,storeKey) {
        this.props.selectAddtnlQuery(storeKey,value);
        this.props.setDirty(true);
    },
    foodItemClicked(event,foodItem){
        const classClicked = event.target.className
        if(classClicked==='read-more'){
            this.props.foodIdSelected(foodItem._id);
            this.props.openModal({storeKey:'foodItemModalOpen', openModal:true})
        }
    	else this.context.router.push('/providerProfile/'+foodItem._creator);
    },

    render() {
        let { data, addtnlQuery, dietSelectedMap } = this.props.search.toJS();
        const { pageNum,placeIdErrorMsg} = this.state;
        const {userAddressSearch} = this.props.globalState.core.toJS();
        let resolvedData = [];
        for (let i = 0; i < data.length; i++) {
        	if(data[i].foodItems && data[i].foodItems.length>0){
        		for (let j = 0; j < data[i].foodItems.length; j++) {
                	data[i].foodItems[j].distance = (data[i].distance).toFixed(2);
                	data[i].foodItems[j].doYouDeliverFlag = data[i].doYouDeliverFlag;
                	data[i].foodItems[j].pickUpFlag = data[i].pickUpFlag;
            	}
            	resolvedData = resolvedData.concat(data[i].foodItems);
        	}
        }
        let self = this;
        addtnlQuery.date = addtnlQuery.date || DATES(7)[0].value ;
        return (
            <div className="search">
                <div className="panel pure-g" id="showfilters">
                    <div className="pure-u-1 display-table">
                        <div className="move-center filter-top-margin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>
                            <span style={{position:'absolute', marginLeft:'1em', bottom:'7px'}}>Diet</span>
                        </div>
                    </div>
                    
                    <div className="pure-u-1 diet-filter-wrapper" >
                        {DIET_TYPES.map((diet,index)=>{
                            return <FlatSelection   classname="pure-u-1-2 pure-u-md-1-3"  
                                                    key={index}
                                                    name={diet.value} 
                                                    selections={[{title:diet.value,value:diet.value}]}
                                                    storeKey='dietSelectedMap'
                                                    onClick={this.filterCuisineOrDietType}
                                                    style={{    
                                                                background:'url('+diet.src+')  0 75% no-repeat',
                                                                backgroundSize:'60%',
                                                                backgroundSize: 'contain'                                                            
                                                            }}
                                    />

                        })}
                    </div>
                    <div className="pure-u-1 pure-u-md-3-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                               <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z" /></svg>
                            </div>
                          <div className="adjust-delivery" >  
                              <FlatSelection selections={[{title:'ratings',value:'ratings'},{title:'distance',value:'distance'}]}
                                             defaultChecked="ratings"
                                             storeKey='sortBy'
                                             onClick={this.selectOption}
                              />
                          </div>
                        </div>
                    </div>
                    <div className="pure-u-1 pure-u-md-3-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                                <svg width="24px" height="24px" viewBox="0 0 512 512">
                                    <g>
                                        <path d="M416,48c-44.188,0-80,35.813-80,80c0,11.938,2.625,23.281,7.312,33.438L416,304l72.688-142.563
                                            C493.375,151.281,496,139.938,496,128C496,83.813,460.188,48,416,48z M416,176c-26.5,0-48-21.5-48-48s21.5-48,48-48s48,21.5,48,48
                                            S442.5,176,416,176z M439.938,327.469l29.125,58.219l-73.844,36.906l-24.75-123.812l4.156-4.156l0.438-0.438l-15.25-30L352,272
                                            l-96-64l-96,64l-64-64L0,400l128,64l128-64l128,64l128-64l-54-107.969L439.938,327.469z M116.75,422.594l-73.813-36.906L104.75,262
                                            l32.625,32.625l4.156,4.156L116.75,422.594z M240,372.219l-89.5,44.75l23.125-115.594l4.125-2.75l62.25-41.5V372.219z M272,372.219
                                            V257.125l62.25,41.5l4.094,2.75l23.125,115.594L272,372.219z"/>
                                    </g>
                                </svg>
                            </div>
                          <div className="adjust-delivery" >  
                              <FlatSelection selections={[{title:'5mi',value:'5'},{title:'10',value:'10'},{title:'15',value:'15'},{title:'20',value:'20'}]}
                                             defaultChecked="10"
                                             storeKey='providerRadius'
                                             onClick={this.selectOption}
                              />
                          </div>
                        </div>
                    </div>
                    <div className="pure-u-1 pure-u-md-3-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M3,13.5L2.25,12H7.5L6.9,10.5H2L1.25,9H9.05L8.45,7.5H1.11L0.25,6H4A2,2 0 0,1 6,4H18V8H21L24,12V17H22A3,3 0 0,1 19,20A3,3 0 0,1 16,17H12A3,3 0 0,1 9,20A3,3 0 0,1 6,17H4V13.5H3M19,18.5A1.5,1.5 0 0,0 20.5,17A1.5,1.5 0 0,0 19,15.5A1.5,1.5 0 0,0 17.5,17A1.5,1.5 0 0,0 19,18.5M20.5,9.5H18V12H22.46L20.5,9.5M9,18.5A1.5,1.5 0 0,0 10.5,17A1.5,1.5 0 0,0 9,15.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 9,18.5Z" />
                                </svg>
                            </div>
                          <div className="adjust-delivery" >  
                              <FlatSelection selections={[{title:'delivery',value:'delivery'},{title:'pickup',value:'pickup'},{title:'both',value:'both'}]}
                                             defaultChecked="both"
                                             storeKey='orderMode'
                                             onClick={this.selectOption}
                              />
                          </div>
                        </div>
                    </div>
                    
                </div>
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
					<div className="pure-u-2-3 pure-u-md-1-5 display-table">
                        <div className="move-center">
                            <div className="center-inline-image">
                                <svg  width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                                </svg>
                            </div>
                            <div className="select-date">
        	                    <SelectField autoWidth={false} style={{width:'80%',left:'25px',height:'auto',top:'5px'}}
                                            fullWidth={false}
                                            labelStyle={{top:'4px',color:'#FF6F00'}}
                                            floatingLabelStyle={{textAlign: 'middle'}} 
                                            menuStyle={{width:'100%',textAlign:'left'}}
                                            underlineStyle={{width:'80%'}} 
                                            iconStyle={{top:'19px', right:'15px'}}
                                            value={addtnlQuery.date} 
                                            onChange={(event,index,value)=>this.selectOption(value,'date')}>
        	                    	{
        	                    		DATES(7).map(function(date,index){
        	                    			return <MenuItem style={{width:'100%'}} key={index} value={date.value} primaryText={date.title}/>
        	                    		})
        	                    	}
        					   </SelectField>
                            </div>
                        </div>
					</div> 
					<div className="pure-u-1-3 pure-u-md-2-5 display-table">
                        <div className="move-center show-hide-filter">
                            <a href={(this.state.showFilters)?"#showfilters":"#"} onClick={this.showFilter}>
    	                       filter/sort
                            </a>
                        </div>
					</div> 
            	</div>

				<div className = 'cuisine-carousel-wrapper'>
					<Carousel
                        slideWidth="80px"
						dragging={true}
                        decorators={carouselArrows}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
                            return <FlatSelection   key={index}
                                                    name={cuisine.value} 
                                                    selections={[{title:'',value:cuisine.value}]}
                                                    storeKey='cuisineSelectedMap'
                                                    onClick={this.filterCuisineOrDietType}
                                                    style={{
                                                                background:'url('+cuisine.src+')  center no-repeat',
                                                                backgroundSize:'90%'                                                            
                                                            }}
                                    />

						})}
					</Carousel>
				</div>
				
				<div className="providers-wrapper">
					<div className="pure-g">
					{	(resolvedData)? 
								resolvedData.map(function(foodItem,index){
									return 	<div key={index} className="pure-u-1 pure-u-md-1-3 provider-profile-wrapper"
												onClick={(event)=>self.foodItemClicked(event,foodItem)}>
												<div>
											    	<div className="pure-u-1 provider-img-section">
											    		<div className="img-avatar">
											    			<img className="gallery-img portrait"src={foodItem.imgUrl}/>
											    		</div>
											    	</div>
											    	<div className="pure-u-1 provider-info-section">
											    		<div className="foodItem-name">
                                                            {foodItem.name}
                                                        </div>
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
									                         	<span style={{color:"#FF6F00"}}>(</span>{(foodItem.numOfReviews)? foodItem.numOfReviews: 0}<span style={{color:"#FF6F00"}}>)</span>
									                         </div>
									                         <div className="miles-away"><span>{foodItem.distance}</span><span>mi</span></div>
											    		</div>
                                                        <div className="food-desc">
                                                            <Truncate lines={2} ellipsis={<span>... <a className="read-more"href="javascript:void(0)" >Read more</a></span>}>
                                                                  {foodItem.description}
                                                            </Truncate>
                                                        </div>
											    		<div className="add-to-cart">
											    			<div className="food-price">{'$'+ foodItem.price}</div>
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
                    <FoodItemModal foodId={this.props.foodIdSelected}
                                  openModal={this.props.openModal}
                                  stateProps={this.props.search}
                  />
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
    userAddressUpdatePlaceId: React.PropTypes.func.isRequired,
    setDirty:React.PropTypes.func.isRequired,
    openModal:React.PropTypes.func.isRequired,
    foodIdSelected:React.PropTypes.func.isRequired
};

export default Search;
