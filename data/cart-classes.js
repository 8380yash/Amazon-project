class Cart {
  cartItems = undefined;
  #localStoragekey = undefined;

  constructor(localStoragekey) {
    this.#localStoragekey = localStoragekey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    //this will check if the same product is in the cart
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    //this code is for the select dropdown menu
    //  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    //  const quantity = Number(quantitySelector.value);

    //if the same product in the cart we just update its quantity here
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      //if its not in the cart then we will push the product in the cart
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
        //or
        // productId: productId,
        // quantity:quantity
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    let newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  UpdateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("cart-opp6");
const businessCart = new Cart("cart-businessCart");

console.log(cart);
console.log(businessCart);
