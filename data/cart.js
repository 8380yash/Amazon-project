export const cart = [];

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
            productId: productId,
            quantity:quantity
            //or
            // productId: productId,
            // quantity:quantity
        });
    }
}
