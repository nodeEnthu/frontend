import {Map,List} from 'immutable';

const Provider = Map({
            imgUrl:'',
            title: '',
            description: '',
            chars_left:'',
            searchText: '',
            searchTextErrorMsg: '',
            place_id: '',
            place_idErrorMsg:'',
            keepAddressPrivateFlag: false,
            methodsOfPayment: List([]),
            userType: 'provider',
            email: '',
            phone:'',
            code:'',
            serviceOffered: 'pickup',
            providerTypeErrorMsg:'',
            addtnlComments: '',
            deliveryRadius: '',
            deliveryMinOrder: '',
            titleErrorMsg: '',
            emailErrorMsg: '',
            phoneErrorMsg:'',
            descriptionErrorMsg: '',
            imgChanged:false,
            providerAddressJustificationModalOpen: false,
            snackBarOpen:false, 
            snackBarMessage:'Please fill the required fields',
            currency:undefined
        });

export default Provider;