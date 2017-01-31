import {Map} from 'immutable'
import moment from 'moment'
export const FoodItem = Map({
            name:'',
            imgUrl:'',
            nameErrorMsg:'', 
            description:'', 
            cuisineType:'',
            cuisineTypeErrorMsg:'', 
            price:'',
            priceErrorMsg:'',
            descriptionErrorMsg:'', 
            oneTime:true,
            availability:[],
            dateRangeStartDate:new Date(),
            dateRangeStopDate:moment(new Date()).add(7,'days').toDate(),
            placeOrderBy:new Date(), 
            placeOrderByErrorMsg:'', 
            serviceDate:new Date(), 
            serviceDateErrorMsg:'', 
            pickUpStartTime:'', 
            pickUpEndTime:'',
            enableReview:false, 
            organic:false, 
            vegetarian:false, 
            glutenfree:false, 
            lowcarb:false, 
            vegan:false, 
            nutfree:false, 
            oilfree:false, 
            nondairy:false, 
            indianFasting:false, 
            allClear:false, 
            snackBarOpen:false, 
            snackBarMessage:''        
      });

export default FoodItem;