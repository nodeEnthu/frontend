export default function getSearchAddressAndPlaceId(user) {
    
    return{
    	address:user.searchText,
    	placeId:user.place_id
    }
}
