import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/payment-summary.js";
import { renderOrderSummary } from "./checkout/order-summary.js";
import { loadProducts } from "../data/products.js";
// import '../data/car.js';
// import '../data/backend-practice.js'


loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});


