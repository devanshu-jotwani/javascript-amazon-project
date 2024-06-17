import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  
  return deliveryOption || deliveryOptions[0];
}

// 16m creating validDeliveryOption to check in cartjs
export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });
  return found;
}

// 15l Calculating DeliveryDate which is not saturday or sunday
export function calculateDeliveryOption(deliveryOption) {
  let today = dayjs();
  let deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  if (deliveryDate.format('dddd') === 'Saturday' ){
    
    deliveryDate = deliveryDate.add(2,'days');
  }
  else if (deliveryDate.format('dddd')==='Sunday'){
    
    deliveryDate = deliveryDate.add(1,'days');   
  }
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  return dateString;
}
