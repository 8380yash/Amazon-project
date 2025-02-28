import { cart, removeFromCart, UpdateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/product-opps.js";
import { formatCurrency } from "./../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./payment-summary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";




export function renderOrderSummary() {

  
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

      const matchingProduct = getProduct(productId);
                  //or
        // let matchingProduct;

        // products.forEach((product) => {
        //     if (product.id === productId) {
        //         matchingProduct = product;
        //     }
        // });


        const deliveryOptionId = cartItem.deliveryOptionId;

        // let deliveryOption;

        // deliveryOptions.forEach((option) => {
        //     if (option.id === deliveryOptionId) {
        //         deliveryOption = option;
        //     }
        // });

                //or

                const deliveryOption = getDeliveryOption(deliveryOptionId);

        // const today = dayjs();
        // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        // const dateString = deliveryDate.format('dddd, MMMM, D');
                    //OR

                    const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML +=
            `
<div class="cart-item-container
 js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
       ${matchingProduct.name}
        </div>
        <div class="product-price">
         ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id = "${matchingProduct.id}">
            Update
          </span>
          <input class= "quantity-input 
          js-quantity-input-${matchingProduct.id}">
          <span class = "save-quantity-link link-primary js-save-link"
          data-product-id = "${matchingProduct.id}">
          Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link"
          data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
</div>
    `
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            // const today = dayjs();
            // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

            // const dateString = deliveryDate.format('dddd, MMMM, D');
                          //OR
           const dateString =  calculateDeliveryDate(deliveryOption);
           //

            const priceString = deliveryOption.priceCents === 0
                ? 'Free'

                : `$${formatCurrency(deliveryOption.priceCents)} -`;


            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html +=
                `<div class="delivery-option js-delivery-option"
        data-product-id = "${matchingProduct.id}"
        data-delivery-option-id ="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      
      `
        });
        
        return html
    };
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            removeFromCart(productId);
           
            // const container = document.querySelector(`.js-cart-item-container-${productId}`);

            // container.remove();
            //we are not using the dom for deleting the product we are regenerating the HTML for the ordersummary;
            // updateCartQuantity();
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();


        });

    });

    document.querySelectorAll('.js-update-link').forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const { productId } = updateLink.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.add('is-editing-quantity');

          
        });
    });

    document.querySelectorAll('.js-save-link').forEach
        ((saveLink) => {
            saveLink.addEventListener('click', () => {
                const { productId } = saveLink.dataset;

                const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

                const newQuantity = Number(quantityInput.value);

                if (newQuantity < 0 || newQuantity >= 1000) {
                    alert('Quantity should below 1000 and above the 0');
                    return;
                }


                UpdateQuantity(productId, newQuantity);

                const container = document.querySelector(`.js-cart-item-container-${productId}`);

                container.classList.remove('is-editing-quantity');


                const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

                quantityLabel.innerHTML = newQuantity;

                // updateCartQuantity();
                renderCheckoutHeader();
                renderPaymentSummary();

            });

        });

    document.querySelectorAll('.js-delivery-option').forEach((optionElement) => {
        optionElement.addEventListener('click', () => {

            const { productId, deliveryOptionId } = optionElement.dataset;

            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary();
            renderPaymentSummary();
        })
    });


    // updateCartQuantity();

    // function updateCartQuantity() {
        // let quantity = 0;
        // cart.forEach((cartItem) => {
        //     quantity += cartItem.quantity;
        // });

        // document.querySelector('.js-home-link').innerHTML =
        //     `${quantity} items`;
           
    // }
   

}

renderOrderSummary();