// RENDER PRODUCTS
(function(appNameSpace) {
    function renderProducts(collection, handleName) {
      collection.forEach((product, index) => {
        productsEl.innerHTML += `
                <div class="item product collection${handleName}">
                    <div class="item-container">
                        <div class="item-img">
                            <img src="${product.images[0].src}" alt="${product.images[0].altText}">
                        </div>
                        <div class="desc row">
                            <span>${product.vendor}</span>
                            <span><small>$</small>${product.variants[0].price}</span>
                        </div>
                        <div class="color-variant">
                            <span class="color-button"></span>
                            <span class="color-button"></span>
                            <span class="color-button"></span>
                            <span class="color-button"></span>
                            <span class="color-button"></span>
                        </div>
                        <div class="size-variant">
                            <button class="size-button btn btn-outline-dark btn-sm">XS</button>
                            <button class="size-button btn btn-outline-dark btn-sm">S</button>
                            <button class="size-button btn btn-outline-dark btn-sm">M</button>
                            <button class="size-button btn btn-outline-dark btn-sm">L</button>
                            <button class="size-button btn btn-outline-dark btn-sm">XL</button>
                        </div>
                        <div class="add-to-cart" onclick="addToCart('${handleName}', '${product.id}')">
                            <button type="button" class="btn btn-outline-dark btn-block">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            `;
      });
    }  
    appNameSpace.classes.renderProducts = renderProducts;
})(appNameSpace);    