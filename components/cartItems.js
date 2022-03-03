// Cart formation
(function(appNameSpace) {
	// Generate Cart
	function generateCart() {
	  cartItemsEl.innerHTML = ""; // clear cart element
	  cart.forEach((item, index) => {
	    cartItemsEl.innerHTML += `
	        <div class="cart-item row">
	            <div class="item-info">
	                <img src="${item.images[0].src}" alt="${item.name}">
	            </div>
	            <div class="item-info desc">
	            	<p>Title</p>
	            	<p>Variant</p>
	            	<div class ="update-item">
		            	<div class="btn minus btn-sm" onclick="changeNumberOfUnits('minus', '${item.id}')">-</div>
		                <div class="btn disabled btn-sm number">${item.numberOfUnits}</div>
		                <div class="btn btn-sm plus" onclick="changeNumberOfUnits('plus', '${item.id}')">+</div>
	            	</div>
	            </div>
	            <div class="units">
	                <button class="btn" onclick="removeItemFromCart('${item.id}')">X</button>          
	            	<p>$${item.variants[0].price}</p>
	            </div>
	        </div>
	        <hr class = "item-separator">
	      `;
	  });
	}
	appNameSpace.classes.generateCart = generateCart;
})(appNameSpace);