export default function getSearchAddressAndPlaceId(user) {
    let customerAddress, customerPlaceId;
    if (user.userType === 'provider') {
        customerAddress = user.userSeachLocations[user.deliveryAddressIndex].searchText;
        customerPlaceId = user.userSeachLocations[user.deliveryAddressIndex].place_id;
    } else if (user.userType === 'consumer') {
        customerAddress = user.loc.searchText;
        customerPlaceId = user.loc.place_id;
    }
    return{
    	address:customerAddress,
    	placeId:customerPlaceId
    }
}
