import { cart } from "../data/cart-class.js";
export function renderHeader(){

    let amazonHeaderHTML = '';

    amazonHeaderHTML = `
    <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
            src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
    </div>

    <div class="amazon-header-middle-section">
        <input class="search-bar js-search-bar" type="text" placeholder="Search">

        <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
        </button>
    </div>

    <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity">0</div>
        <div class="cart-text">Cart</div>
        </a>
    </div>
    `
    document.querySelector('.js-amazon-header').innerHTML = amazonHeaderHTML;

    document.querySelector('.js-search-button')
    .addEventListener('click', ()=>{
        let searchInput = document.querySelector('.js-search-bar').value;
        // console.log(searchInput);
        // console.log('search button clicked');
        window.location.href = `amazon.html?search=${searchInput}`;
    }) 

    document.querySelector('.js-search-bar')
        .addEventListener('keydown', (event)=>{
            if (event.key ==='Enter'){
                let searchInput = document.querySelector('.js-search-bar').value;
                // console.log(searchInput);
                // console.log('search button clicked');
                window.location.href = `amazon.html?search=${searchInput}`;
            }
    });

    function updateCartQuantity() {
        let cartQuantity = cart.calculateCartQuantity();
    
        document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;
      }
      // 14d Calling updateCartQuantity for setting correct 
      // qunatity on page laod.
      updateCartQuantity();
}


    

