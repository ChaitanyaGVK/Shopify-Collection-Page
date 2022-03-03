// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal-value");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const modalEl = document.querySelector('.modal');
const cartEl = document.querySelector('.cart');
const productsContainer = document.querySelector('.products-list');
const cartItemCountEl = document.querySelector('.cart-item-count');
var allProductsList;


// Forming the cart items from local storage that are last preserved
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(handleName, id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = dataArrayByCollection[handleName][0].products.find((obj) => obj.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  appNameSpace.classes.generateCart();
  calculateAndUpdateTotal();

  // save the complete cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and update total
function calculateAndUpdateTotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.variants[0].price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = '$'+totalPrice.toFixed(2);
  totalItemsInCartEl.innerHTML = totalItems;
  cartItemCountEl.innerHTML = 'YOUR BAG &nbsp;&nbsp;<span>('+ totalItems + ' ITEM)</span>';
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") { // need to add condition for in stock value, couldn't find one in API
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// Open/Close cart drawer
function toggleCart(show, update) {
  if(update) updateCart();
  var display = show ? 'block': 'none';
  modalEl.style.display = display;
  cartEl.style.display = display;
}

// Toggle men and women collection on page
function toggleCollectionDisplay(handleSupportedId) {
  const collectionClasssToHide = 'collection' + collectionsSupported[handleSupportedId];
  allProductsList.forEach(function(node) {
    if(node.classList.contains(collectionClasssToHide)) {
      node.classList.add('hideProduct');
    } else if(node.classList.contains('hideProduct')) {
      node.classList.remove('hideProduct');
    } else {
      node.classList.remove('hideProduct');
    }
  });
}

// Making API calls for collection on load and render products on data reception
var dataFetchingDone = false;
var collectionsSupported = ['men', 'women'];
var dataArrayByCollection = {
  "men": [],
  "women": []
};
window.addEventListener("load", function() {
  if(typeof ShopifyBuy != "undefined") {
    var collectionPromise = fetchShopifyCollectionByHandle(collectionsSupported[0]);
    collectionPromise.then(function(data) {
      return fetchShopifyCollectionByHandle(collectionsSupported[1]);
    }).then(function(data) {
      dataFetchingDone = true;
      productsContainer.style.display = 'block';
      document.querySelector('.spinner-border').style.display = 'none';
      appNameSpace.classes.renderProducts(dataArrayByCollection[collectionsSupported[0]][0].products,collectionsSupported[0]); // Showing 1st collection by default 
      appNameSpace.classes.renderProducts(dataArrayByCollection[collectionsSupported[1]][0].products, collectionsSupported[1]);
      allProductsList = document.querySelectorAll('.product');
    });
  }
});

document.querySelector('.checkout').addEventListener('click', checkout);

// Final checkout
function checkout(event) {
  event.target.removeEventListener('click', checkout);
  checkoutItems();
}
