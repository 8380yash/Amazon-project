import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import "../data/product-opps.js";
import "../data/product-oops2.js";

loadProducts(renderProductsgrid);
function renderProductsgrid() {
  //so this products are coming from the product.js file
  let productsHTML = "";

  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      if (!product.keywords || !Array.isArray(product.keywords)) {
        return product.name.toLowerCase().includes(search.toLowerCase());
      }

      let matchingKeyword = product.keywords.some((keyword) =>
        keyword.toLowerCase().includes(search.toLowerCase())
      );

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
   ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="${product.getStarUrl()}">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${product.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select class = "js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    ${product.extraInfoHTML()}
    

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary 
    js-add-to-cart"
    data-product-id = "${product.id}">
      Add to Cart
    </button>
  </div>
    `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  updateCartQuantity();

  function updateCartQuantity() {
    //this will increase the cartQuantity(the header).
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }
  //here we are making the add to cart button interactive
  document.querySelectorAll(".js-add-to-cart").forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      //const {productId} = buttonElement.dataset
      //or
      const productId = buttonElement.dataset.productId;

      addToCart(productId);
      updateCartQuantity();

      //this add the added message above the add to cart button
      const added = document.querySelector(`.js-added-to-cart-${productId}`);

      added.classList.add("addedMessage");

      // Clear any existing timeout for this element (optional but recommended)
      clearTimeout(added.addedMessage); // Assuming a property is used for tracking

      added.addedMessage = setTimeout(() => {
        added.classList.remove("addedMessage");
        // Optionally, clear the timeout property after removal for future use
        delete added.addedMessage;
      }, 2000);
    });
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const searchTerm = document.querySelector(".js-search-bar").value;
    window.location.href = `amazon.html?search=${searchTerm}`;
  });

  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const searchTerm = document.querySelector(".js-search-bar").value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });
}
