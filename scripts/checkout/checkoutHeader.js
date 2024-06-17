import { cart } from "../../data/cart-class.js";
export function renderCheckoutHeader() {
    let headerHTML ='';

    // 14b diplaying cart quantity in Checkout() section of the page. 
    function getCartQuantity() {
        let cartQuantity = cart.calculateCartQuantity();
    
        // console.log('Get Cart Quantity was called.')
        document.querySelector('.js-checkout-cart-quantity')
        .innerHTML = `${cartQuantity} items`;
    }

    headerHTML += `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="amazon.html">
                <img class="amazon-logo" src="images/amazon-logo.png">
                <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                </a>
            </div>

            <!-- 14a removing hard coded 2 items from header middle section -->
            <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link js-checkout-cart-quantity"
                href="amazon.html"></a>)
            </div>
            <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>
    `;
    document.querySelector('.js-checkout-header')
        .innerHTML= headerHTML;
    // Calling CartQuantity to update the CartQuantity in Checkout Header
    getCartQuantity();
}