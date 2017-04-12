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
            availability:[],
            placeOrderBy:new Date(), 
            placeOrderByErrorMsg:'', 
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