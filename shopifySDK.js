const initializeShopifyClient = (function() {	
	// Initializing a client to return translated content
	const shopifyClient = ShopifyBuy.buildClient({
	  domain: 'demo-dawn-vibha.myshopify.com',
	  storefrontAccessToken: 'ea1baba50c81816b5fea3d076cb21a37'
	});

	return shopifyClient;
})();

function fetchShopifyCollectionByHandle(handle) {
	//Fetches a collection by handle on the shop.
	return initializeShopifyClient.collection.fetchByHandle(handle).then((data) => {
	  dataArrayByCollection[handle].push(data);
	  Object.freeze(dataArrayByCollection[handle]);
	});
}

function checkoutItems() {
	// creates checkout with an empty object
	return initializeShopifyClient.checkout.create().then(checkout => {
	  if(checkout.webUrl) {
	  	window.location = checkout.webUrl;
	  }
	});
}