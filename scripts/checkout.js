import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/payment-summary.js";
import { renderOrderSummary } from "./checkout/order-summary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import "../data/cart-classes.js";
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage() {
  try {
    // throw'error1';
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log(
      "unexpected error happen. Please try again later after some time"
    );
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(values);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})


new Promise ((resolve) => {
loadProducts(() => {
    resolve('value1');
});

}).then((value) => {
return new Promise((resolve) => {
    loadCart(() => {
            resolve();
    });
  });

}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})



callback cause the nesting
loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
