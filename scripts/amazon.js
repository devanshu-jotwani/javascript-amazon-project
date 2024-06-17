import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import { renderHeader } from './amazonHeader.js';
loadProductsFetch().then(()=>{
  renderHeader();
  renderAmazon();
});

export function renderAmazon(){
  let productsHTML = '';
  // 18p making search bar interactive
  const url = new URL(window.location.href);
  let search = url?.searchParams.get('search');

  let filteredProducts = products;
  // 18q adding keywords based filter.
  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());

    });
  }
  
  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container js-product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
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

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;



  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const { productId } = button.dataset;
        
        const addedMessageTimeouts = {};
        
        let addedToCartEle = document.querySelector(`.js-added-to-cart-${productId}`);
        // Adding class to make 'added to cart' div visible.
        addedToCartEle.classList.add('added-to-cart-visible');
        // Removing the added to cart div effect.
        const previousTimeoutId = addedMessageTimeouts[productId];
        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
          addedToCartEle.classList.remove('added-to-cart-visible');
          renderAmazon();
        }, 2000);

        // Save the timeoutId for this product
        // so we can stop it later if we need to.
        addedMessageTimeouts[productId] = timeoutId;
          
        cart.addToCart(productId);
        updateCartQuantity();
        

      });
    });

}


