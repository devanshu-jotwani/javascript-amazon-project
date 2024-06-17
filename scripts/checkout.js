import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProductsFetch} from '../data/products.js';
import { loadCartFetch} from '../data/cart-class.js';

async function loadPage(){
    try {
        await loadCartFetch();
        await loadProductsFetch();
    } 
    catch (error) {
      console.log('Unexpected error. Please try again later.');
    }
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
/*
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
*/
