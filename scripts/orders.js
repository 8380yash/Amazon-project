import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch,  } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart, cart } from "../data/cart.js";


export async function renderOrders() {
  await loadProductsFetch();


  let orderHTML = '';


  orders.forEach((orderItem) => {
    const orderTimeString = dayjs(orderItem.orderTime).format('MMMM D')
    orderHTML +=
      `  <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
           ${productsListHTML(orderItem)}
          </div>
        </div>`;

  });

  function productsListHTML(orderItem) {

    let productsListHTML = '';

    orderItem.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      productsListHTML +=
        `
       <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again"
              data-product-id = "${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
       
      `
    });

    return productsListHTML;
  }




  document.querySelector('.js-order-grid').innerHTML = orderHTML;


updateCartQuantity();
 
  

  document.querySelectorAll('.js-buy-again').forEach((button) => {
   button.addEventListener('click', () => {
    addToCart(button.dataset.productId);
    updateCartQuantity();


    button.innerHTML = 'Added';
    setTimeout(() => {
      button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      `;
    }, 1000);
   });
   
   
  });
  function updateCartQuantity () {
    let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
   }
   updateCartQuantity();
  

}

renderOrders();