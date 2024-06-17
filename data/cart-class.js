import {validDeliveryOption} from './deliveryOptions.js';
class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    let quantity = document.querySelector(`.js-quantity-selector-${productId}`)?.value ;
    if (quantity == null){
      quantity=1 ;
    }
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += Number(quantity);
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: Number(quantity),
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (!matchingItem) {
      return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  calculateCartQuantity(){
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });

    this.saveToStorage();
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity){
    let matchingItem;

    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity= Number(newQuantity);

    this.saveToStorage();
  }
  // 18m creating Clear Cart when place order is clicked.
  clearCart(){
    this.cartItems = [];
    this.saveToStorage();
  }
}
export let cart = new Cart('cart');;

const businessCart = new Cart('cart-business');

// console.log(cart);
// console.log(businessCart);
// console.log(businessCart instanceof Cart);
export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart')
  const text = await response.text();
  console.log(text);
  // return text;
}
