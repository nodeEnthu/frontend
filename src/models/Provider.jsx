import {Map} from 'immutable';

const Provider = Map({
            imgUrl:'',
            title: '',
            description: '',
            chars_left:'',
            searchText: '',
            place_id: '',
            keepAddressPrivateFlag: false,
            userType: 'provider',
            includeAddressInEmail: true,
            email: '',
            pickUpFlag: true,
            providerTypeErrorMsg:'',
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

export default Provider;