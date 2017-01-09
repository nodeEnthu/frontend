import {Map} from 'immutable'

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
            placeOrderBy:new Date(), 
            placeOrderByErrorMsg:'', 
            serviceDate:new Date(), 
            serviceDateErrorMsg:'', 
            pickUpStartTime:'', 
            pickUpEndTime:'', 
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