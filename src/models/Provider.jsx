import {Map} from 'immutable';

const Provider = Map({
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
            providerAddressJustificationModalOpen: false
        });

export default Provider;