import {cart} from '../../data/cart-class.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
// 15f using default export 
import isWeekend from '../utils/isWeekend.js';
// 15g using new name to import for default export 
import isSatSun from '../utils/isWeekend.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

// 15a using day to get today+5 days
const practice15A = dayjs().add(5,'days').format('MMMM D');
console.log(practice15A);
// 15b using dayjs get today+1 month
const practice15B = dayjs().add(1,'months').format('MMMM D');
console.log(practice15B);
// 15 using dayjs subtract today-1month
const practice15C = dayjs().subtract(1,'months').format('MMMM D');
console.log(practice15C);
// 15d using day to get today+5 days
const practice15D = dayjs().format('dddd');
console.log(practice15D);
// 15e making isWeekend function is check if day is weekend or not.
// function isWeekend(day){
//   if (day.format('dddd') === 'Saturday' || day.format('dddd')==='Sunday'){
//     return true;
//   }
//   return false;
// }
// 15f Moving isWeekend in other file and using default export.
console.log(practice15A,isWeekend(dayjs().add(5,'days')));
console.log(practice15B,isWeekend(dayjs().add(1,'months')));
console.log(practice15C,isWeekend(dayjs().subtract(1,'months')));
console.log(practice15D,isWeekend(dayjs()));

// 15g Making isWeekend as named inport in current file.
console.log('15g');
console.log(practice15A,isSatSun(dayjs().add(5,'days')));
console.log(practice15B,isSatSun(dayjs().add(1,'months')));
console.log(practice15C,isSatSun(dayjs().subtract(1,'months')));
console.log(practice15D,isSatSun(dayjs()));



export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    
    const matchingProduct = getProduct(productId);
    // console.log(cartItem);
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);    
    const dateString = calculateDeliveryOption(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-labels js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <!-- 14g creating html for save and update input -->
            <input class="quantity-input js-quantity-inputs js-quantity-input-${matchingProduct.id}" data-product-id ="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link 
            js-delete-link-${matchingProduct.id}" 
            data-product-id="${matchingProduct.id}">
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
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      // 15l check and calculate if deliveryDate is saturday or sunday.
      const dateString =  calculateDeliveryOption(deliveryOption);
      
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option 
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input
            js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
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

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  
  //14f Creating Update quantity link interactive. 
  document.querySelectorAll('.js-update-quantity')
  .forEach((updatelink)=>{
      updatelink.addEventListener('click',()=>{
        const productId = updatelink.dataset.productId;
        // console.log(productId);
        // 14h Adding class is-editing and making update input
        // and save button using css(checkout.css)
        const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
        cartItem.classList.add('is-editing-quantity');
        
      })
  })

  // 14j making save link interactive
  document.querySelectorAll('.js-save-quantity')
  .forEach(saveLink =>{
    saveLink.addEventListener('click',()=>{
      let productId = saveLink.dataset.productId;
      let newQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;
      // console.log(productId);
      // 14k building add to cart logic
      // 14n building additional validation on quantity
      if (Number(newQuantity) > 0 && Number(newQuantity) <1000 ){
        cart.updateQuantity(productId, newQuantity);
      }
      else {   
        alert('Incorrect Quantity.');
      }
      const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
      cartItem.classList.remove('is-editing-quantity');
      // 14m updating quantity in cartQuantity and totalQuantity.
      // 15i rendering PaymentSummary to make change on clicking save link
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    })
  })

  document.querySelectorAll('.js-quantity-inputs')
  .forEach((quantityInput) =>{
    quantityInput.addEventListener('keydown', (event)=>{
      if (event.key === 'Enter'){
        let productId = quantityInput.dataset.productId;
        let newQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;
        // console.log(productId);
        // 14k building add to cart logic
        // 14n building additional validation on quantity
        if (Number(newQuantity) > 0 && Number(newQuantity) <1000 ){
          cart.updateQuantity(productId, newQuantity);
            
        }
        else {   
          alert('Incorrect Quantity.');
        }
        const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
        cartItem.classList.remove('is-editing-quantity');
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();  
      }      
    })
  })

}