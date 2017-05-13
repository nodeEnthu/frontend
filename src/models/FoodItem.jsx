import {Map,List} from 'immutable'
import moment from 'moment'
export const FoodItem = Map({
            name:'',
            imgUrl:'',
            _creator:'',
            nameErrorMsg:'', 
            description:'', 
            cuisineType:'',
            cuisineTypeErrorMsg:'', 
            price:'',
            priceErrorMsg:'',
            descriptionErrorMsg:'', 
            availability:List(),
            availabilityErrorMsg:'',
            placeOrderBy:0,
            rating:0, 
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