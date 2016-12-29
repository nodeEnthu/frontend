import {Map} from 'immutable'

export const FoodItem = Map({
            imgUrl:'',
            title: '',
            description: '',
            searchText: '',
            place_id: '',
            keepAddressPrivateFlag: false,
            userType: 'provider',
            includeAddressInEmail: true,
            email: '',
            pickUpFlag: true,
            pickUpAddtnlComments: '',
            doYouDeliverFlag: false,
            deliveryRadius: '',
            deliveryMinOrder: '',
            deliveryAddtnlComments: '',
            allClear: false,
            titleErrorMsg: '',
            emailErrorMsg: '',
            descriptionErrorMsg: '',
            imgChanged:false,
            providerAddressJustificationModalOpen: false
        });

export default FoodItem;