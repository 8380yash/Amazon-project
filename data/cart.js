export const cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1,
},{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:2
}];

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
