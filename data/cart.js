export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
   cart = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:2,
        deliveryOptionId:'2'
    }];
}

function saveToStorage () {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart (productId) {

    //this will check if the same product is in the cart
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

     //this code is for the select dropdown menu
     const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

     const quantity = Number(quantitySelector.value);

    //if the same product in the cart we just update its quantity here
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        //if its not in the cart then we will push the product in the cart
        cart.push({
            productId,
            quantity,
            deliveryOptionId:'1'
            //or
            // productId: productId,
            // quantity:quantity
        });
    }
    saveToStorage();
}


export function removeFromCart (productId) {

let newCart = [];

cart.forEach((cartItem) => {
    if(cartItem.productId != productId){
        newCart.push(cartItem);
    }
});

cart = newCart;
saveToStorage();
}


export function UpdateQuantity(productId, newQuantity){

    let matchingItem;

    cart.forEach((cartItem) => {
            if(productId === cartItem.productId){
               matchingItem = cartItem
            }
    });
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}
