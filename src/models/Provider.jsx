import {Map} from 'immutable';

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
            userType: 'provider',
            email: '',
            serviceOffered: 'pickup',
            providerTypeErrorMsg:'',
            addtnlComments: '',
            deliveryRadius: '',
            deliveryMinOrder: '',
            titleErrorMsg: '',
            emailErrorMsg: '',
            descriptionErrorMsg: '',
            imgChanged:false,
            providerAddressJustificationModalOpen: false,
            snackBarOpen:false, 
            snackBarMessage:''
        });

export default Provider;