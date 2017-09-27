import React from 'react'
import { CUISINE_TYPES, DIET_TYPES, RADIUS_OPTIONS, ORDER_TYPE, DATES } from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import './search.scss'
import classNames from 'classnames'
import StarRatingComponent from 'react-star-rating-component';
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
import ContentClear from 'material-ui/svg-icons/content/clear';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {amber900} from 'material-ui/styles/colors';
import {PLACE_ORDER_BY} from 'routes/Search/constants/searchFilters'
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ActionSearch from 'material-ui/svg-icons/action/search'
import {Card,CardHeader,CardTitle, CardText} from 'material-ui/Card';
import FoodItemInSearchPage from 'components/FoodItemInSearchPage'

const Search = createReactClass({
    getInitialState() {
        return {
            queryBaseUrl: '/api/query/providers',
            searchActivated:false,
            placeIdErrorMsg:'',
            foodItemModalOpen:false,
            foodIdSelected:undefined,
            showSpinner:false,
        };
    },
    pageNum: 0,
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    filterCuisineOrDietType(val,dietOrCuisine) {
        this.props.setDirty(true);
        this.props.selectCuisineOrDiet(dietOrCuisine,val);
    },

    // defaults for the first time you load the page 
    componentDidMount() {
    	const user = this.props.globalState.core.get('user').toJS();
        const place_id = user.place_id;
        let self = this;
    	//case: a LOGGED IN (guest will always have an address so no need to check for that) person has came in without address
    	if(!place_id && user.name){
    		let userSearchAndPlaceId = getSearchAddressAndPlaceId(user);
            this.props.updateUser('searchText',userSearchAndPlaceId.address);
            this.props.updateUser('place_id',userSearchAndPlaceId.placeId);
    	}
        let combinedQuery = this.createQuery();
        this.setState({showSpinner:true});
        this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery)
            .then(function(){
                self.setState({showSpinner:false});
            })
    },

    componentWillUnmount() {
    	this.props.flushOutStaleData();
    },

    loadMore() {
        let self = this;
        this.pageNum = this.pageNum + 1;
  		this.fetchQueryData()
            .then(function(){
                self.setState({showSpinner:false});
            })
    },

    onSuggestionSelected(event,{suggestion}){
        let self= this;
        // this changes the user address in store
        this.props.updateUser('searchText',suggestion.address);
        this.props.updateUser('place_id',suggestion.place_id);
        // also register this address in the address book if the user is logged in
        if(this.props.globalState.core.get('userLoggedIn')){
    		//register this at a new location if possible as the user needs to be logged in for this
       		// register the address as most recently used
       		if(suggestion.place_id){
	       		securedGetCall('api/locations/registerMostRecentSearchLocation',{address:suggestion.address,place_id:suggestion.place_id})
	        		.then(function(result){
                        self.props.flushOutStaleData();
                        self.fetchQueryData()
                            .then(function(){
                                self.setState({showSpinner:false});
                            });
	        		}); 	
       		}
    	}
        else this.props.setDirty(true);
    },

    createQuery() {
        let combinedQuery = {};
        const {place_id} = this.props.globalState.core.get('user').toJS();
        combinedQuery.guestLocation = {'place_id':place_id};
        combinedQuery.cuisineSelectedMap = this.props.search.get('cuisineSelectedMap').toJS();
        combinedQuery.dietSelectedMap = this.props.search.get('dietSelectedMap').toJS();
        combinedQuery.addtnlQuery = this.props.search.get('addtnlQuery').toJS();
        //combinedQuery.addtnlQuery.date = combinedQuery.addtnlQuery.date || moment().startOf('day').valueOf();
        combinedQuery.filterspageNum = this.pageNum;
        return combinedQuery;
    },

    fetchQueryData() {
        this.setState({showSpinner:true});
    	let combinedQuery = this.createQuery();
        return this.props.fetchMayBeSecuredData(this.state.queryBaseUrl, 'data',undefined,combinedQuery);
    },

    createAndFetchNewQuery(){
    	// flush out old data
        let self = this;
    	this.props.flushOutStaleData();
    	this.fetchQueryData()
            .then(function(){
                self.setState({showSpinner:false});
            })
    },

    componentDidUpdate(prevProps){
        if(this.props.search.get('dirty')){
            this.pageNum = 0;
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
    	else {
            this.props.userProfileScrollPosition(foodItem.name);
            this.context.router.push('/providerProfile/'+foodItem._creator);
        }
    },
    render() {
        let { data, addtnlQuery, dietSelectedMap,cuisineSelectedMap } = this.props.search.toJS();
        const user = this.props.globalState.core.get('user').toJS();
        const {placeIdErrorMsg} = this.state;
        const {pageNum} = this;
        let resolvedData = [];
        for (let i = 0; i < data.length; i++) {
        	if(data[i].foodItems && data[i].foodItems.length>0){
        		for (let j = 0; j < data[i].foodItems.length; j++) {
                	data[i].foodItems[j].distance = (data[i].distance).toFixed(2);
            	}
            	resolvedData = resolvedData.concat(data[i].foodItems);
        	}
        }
        let self = this;
        addtnlQuery.date = addtnlQuery.date || DATES(7)[0].value ;
        const titleText = moment(addtnlQuery.date).format("Do MMM") + ' near ' + user.searchText;
        return (
            <div className="search">
            	<Card>
                    <CardHeader
                        actAsExpander={true}
                        showExpandableButton={true}
                        title= {<Truncate lines={1}>{titleText}</Truncate>}
                        closeIcon={<ActionSearch/>}
                        openIcon={<ContentClear/>}
                        textStyle={{paddingRight:'20px'}}
                    />
                    <CardText
                        expandable={true}
                    >   
                		<div className="pure-u-1 pure-u-md-2-5 display-table">
                            <div className="move-center">
                                <div className="center-inline-image">
                                    <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                                    </svg>
                                </div>
        	                    <AsyncAutocomplete name={'addressSearch'}
                                    userSearchText = {this.props.globalState.core.get('user').get('searchText')}
                                    apiUrl = {'/api/locations/addressTypeAssist'}
                                    getSuggestionValue={(suggestion)=>suggestion.address}
                                    onChange = {(event, value)=>{
                                            this.props.updateUser('searchText',value.newValue);
                                            this.props.updateUser('place_id',null);
                                    	}
                                    }
                                    onSuggestionSelected = {this.onSuggestionSelected}
        	                    />
                                {(!user.place_id)?
                                     <div className="place_id_error">*please select a suggested address.</div>
                                     :
                                        undefined
                                }
        	                   
                            </div>
    	                </div>
                        <div className="diet-filter-wrapper">
                            <div className="center-inline-image">
                                <div className="center-inline-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>
                                </div>
                            </div>
                            <div className="diet-wrapper">
                                {DIET_TYPES.map((diet,index)=>{
                                    return <FlatSelection   classname="pure-u-1-2 pure-u-md-1-3"  
                                                            key={index}
                                                            name={diet.value}
                                                            value = {diet.value}
                                                            defaultChecked = {diet.value} 
                                                            selections={[{title:diet.value,value:diet.value}]}
                                                            storeKey='dietSelectedMap'
                                                            defaultChecked = {(dietSelectedMap[diet.value] === true)? diet.value: undefined }
                                                            onClick={this.filterCuisineOrDietType}
                                                            style={{    
                                                                        background:'url('+diet.src+')  0 75% no-repeat',
                                                                        backgroundSize:'60%',
                                                                        backgroundSize: 'contain'                                                            
                                                                    }}
                                            />

                                })}
                            </div>
                        </div>
                        {/*<div className="pure-u-1 pure-u-md-3-5 display-table">
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
                        </div>*/}
                        <div className="pure-u-1 pure-u-md-3-5 display-table add-padding">
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
                                                 defaultChecked={addtnlQuery.providerRadius || "10"}
                                                 storeKey='providerRadius'
                                                 onClick={this.selectOption}
                                  />
                              </div>
                            </div>
                        </div>
                        <div className="pure-u-1 pure-u-md-2-5 display-table">
                            <div className="move-center">
                                <div className="center-inline-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M3,13.5L2.25,12H7.5L6.9,10.5H2L1.25,9H9.05L8.45,7.5H1.11L0.25,6H4A2,2 0 0,1 6,4H18V8H21L24,12V17H22A3,3 0 0,1 19,20A3,3 0 0,1 16,17H12A3,3 0 0,1 9,20A3,3 0 0,1 6,17H4V13.5H3M19,18.5A1.5,1.5 0 0,0 20.5,17A1.5,1.5 0 0,0 19,15.5A1.5,1.5 0 0,0 17.5,17A1.5,1.5 0 0,0 19,18.5M20.5,9.5H18V12H22.46L20.5,9.5M9,18.5A1.5,1.5 0 0,0 10.5,17A1.5,1.5 0 0,0 9,15.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 9,18.5Z" />
                                    </svg>
                                </div>
                              <div className="adjust-delivery" >  
                                  <FlatSelection selections={[{title:'delivery',value:'delivery'},{title:'pickup',value:'pickup'},{title:'both',value:'both'}]}
                                                 defaultChecked={addtnlQuery.orderMode || "both"}
                                                 storeKey='orderMode'
                                                 onClick={this.selectOption}
                                  />
                              </div>
                            </div>
                        </div>
                    </CardText>
				</Card> 
				<div className = 'cuisine-carousel-wrapper'>
					<Carousel
                        slideWidth="80px"
						dragging={true}
                        cellSpacing={10}
                        edgeEasing="easeOutCirc"
                        decorators={carouselArrows}
					>
						{CUISINE_TYPES.map((cuisine,index)=>{
                            return <FlatSelection   key={index}
                                                    name={cuisine.value} 
                                                    selections={[{title:'',value:cuisine.value}]}
                                                    storeKey='cuisineSelectedMap'
                                                    defaultChecked = {(cuisineSelectedMap[cuisine.value] === true)? cuisine.value: undefined }
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
                     <div className="is-center" style={{display:(this.state.showSpinner)?'block':'none'}}>
                        <img src= "/general/loading.svg"/>
                    </div>
                    <div>
                        {(resolvedData && resolvedData.length >0)? 
                        resolvedData.map(function(foodItem,index){
                            return  <FoodItemInSearchPage
                                        key={index}
                                        foodItem={foodItem}
                                        foodItemClicked={self.foodItemClicked}
                                        mode = {"onOrder"}
                                    />
                                })
                                :
                                <div style={{display:(!this.state.showSpinner)?'block':'none'}} className="is-center no-results-wrapper">
                                    <div>Sorry! no results were found</div>
                                    <div className="sub-text">Tried broadening filters ?</div>
                                </div>
                        } 
                    </div>
                {
                    (data  && data.length >= 12*(pageNum+1))?
                    <div className="load-more-center">
                        <RaisedButton 
                            label="Show more results" 
                            primary={true} 
                            style={{width:'50%',margin:"1em"}}
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
    globalState: PropTypes.object.isRequired,
    flushOutStaleData: PropTypes.func.isRequired,
    fetchMayBeSecuredData: PropTypes.func.isRequired,
    selectCuisineOrDiet: PropTypes.func.isRequired,
    selectAddtnlQuery: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    userProfileScrollPosition: PropTypes.func.isRequired,
    setDirty:PropTypes.func.isRequired,
    openModal:PropTypes.func.isRequired,
    foodIdSelected:PropTypes.func.isRequired
};

export default Search;
