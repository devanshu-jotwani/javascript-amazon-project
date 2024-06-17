import {cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
  beforeEach(()=>{

    // 16e Creating a MOCK using SpyOn
    // parameters are 1- object we want to mock,2- method we want to mock
    // gives us an object
    spyOn(localStorage, 'setItem');
    
  })  

  it('adds an existing product to the cart', () => {
    spyOn(document,'querySelector').and.callFake(()=>{
      return 1;
    })
    
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([{
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1,
    //     deliveryOptionId: '1'
    //   }]);
    // });
    // // loadFromStorage has a function localStorage.getItems
    // // which will be replace(MOCK) by above codes return value of Object.callFake
    // // Object is returned by spyOn 
    // loadFromStorage();
    cart.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }];
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    // 16c checkif setItem received correct value
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
  });
  
  it('adds a new product to the cart', () => {
    spyOn(document,'querySelector').and.callFake(()=>{
      return 1;
    })
    
    // A mock only last for 1 test case.
    // That is why using beforeEach function
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([]);
    // });
    // loadFromStorage();
    cart.cartItems = [];
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    // 16d Check if localStorage received correct value or not
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
  // 16i building remove from cart test case.
  it('remove a product from cart',()=>{
    
    // spyOn(localStorage,'getItem').and.callFake(()=>{
    //   return JSON.stringify([{
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1,
    //     deliveryOptionId: '1'
    //   },{
    //     productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
    //     quantity: 1,
    //     deliveryOptionId: '2'
    //   }]);
    // })
    // loadFromStorage();
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    },{
      productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
      quantity: 1,
      deliveryOptionId: '2'
    }];

    // removing element that is in cart.
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    // removing that is not in cart.
    cart.removeFromCart('dd82ca78-a18b-4e2a-9250-31e67412f98d');
    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
        quantity: 1,
        deliveryOptionId: '2'
      }]));
  });
});

describe('test suite: updateDeliveryOption',()=>{
  beforeEach(()=>{ 
    spyOn(localStorage, 'setItem');
  });  

  
  // 16k update delivery Option Function test case.
  it('updating delivery Option',()=>{
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([{
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1,
    //     deliveryOptionId: '1'
    //   }]);
    // });
    // loadFromStorage();
    cart.cartItems =[{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '3'
    }]));

  });

  // 16l does notthing test case if productid does not exist.
  it('does nothing if the product is not in the cart', () => {
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([{
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1,
    //     deliveryOptionId: '1'
    //   }]);
    // });
    // loadFromStorage();
    cart.cartItems =[{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
    cart.updateDeliveryOption('does-not-exist', '3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  // 16m checking if delivery-option exist or not.
  it('does nothing if the delivery option does not exist', () => {
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([{
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1,
    //     deliveryOptionId: '1'
    //   }]);
    // });
    // loadFromStorage();
    cart.cartItems =[{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  // afterEach(()=>{
  //   document.querySelector('.js-test-container').innerHTML = '';
  // })
})


  
