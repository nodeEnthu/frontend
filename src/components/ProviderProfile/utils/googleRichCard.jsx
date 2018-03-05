export default function googleRichCard(provider,window){
	let menuItems = [];
	provider.foodItems.forEach(function(foodItem){
		menuItems.push({
		                "@type":"MenuItem",
		                "name":foodItem.name,
		                "description":foodItem.description,
		                "offers":{
		                   "@type":"Offer",
		                   "price":foodItem.price,
		                   "priceCurrency":"INR"
		                }
		             });
	})
	let result =  {
		       "@context": "http://schema.org",
		       "@type": "Restaurant",
		       "url": window.location.href,
		       "name": provider.title,
		       "description": provider.description,
		       "image": provider.imgUrl,
		       "priceRange": "$",
		       "address": provider.displayAddress,
		       "servesCuisine":[
		          "Indian"
		       ],
		       "menu":{
		          "@type":"Menu",
		          "hasMenuSection":{
		             "@type":"MenuSection",
		             "hasMenuItem":menuItems
		          },
		          "inLanguage":"English"
		       }
        	}
       if(provider.phone) result.telephone = provider.phone;
       return result;
}