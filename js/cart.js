import createNav from "./components/createNav.js";
createNav();

const container = document.querySelector(".cart-products");
const cartTotalContainer = document.querySelector("#cartTotal");
const pageTitle = document.querySelector(".page-title");

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    let numberOfProducts = localStorage.getItem('cartQuantity');
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);

    if (cartItems && container) {
 
        container.innerHTML = '';
        cartTotalContainer.innerHTML = '';
        pageTitle.innerHTML = '';
        
        Object.values(cartItems).map( item => {

          pageTitle.innerHTML = `<h1>Shopping cart (${numberOfProducts})<h1>`;

            container.innerHTML += `
            <div class="product-details row">
                                        <a class="image col-12 col-lg-1" href="details.html?id=${item.data.id}">
                                            <img class="product-image" alt="${item.data.attributes.image.data.attributes.alternativeText}" src="http://localhost:1337${item.data.attributes.image.data.attributes.url}">
                                        </a> 
                                        <h6 class="product-title col-12 col-lg-5">${item.data.attributes.title}</h6>
                                        <div class="product-price col-12 col-lg-2">${item.data.attributes.price},00 NOK</div>
                                        <div class="product-quantity col-12 col-lg-2">
                                            <button class="decrease" id="decrease"><img class="icon" src="./assets/ui/decrease.png" alt="decrease"></button>
                                            <span>${item.inCart}</span>
                                            <button class="increase" id="increase"><img class="icon" src="./assets/ui/increase.png" alt="decrease"></button>
                                        </div>
                                        <div class="product-total col-12 col-lg-2">
                                             ${item.inCart * item.data.attributes.price},00 NOK
                                        </div>
            </div>`;

            cartTotalContainer.innerHTML = `${cartCost},00 NOK`;

            document.querySelectorAll('#clear').forEach(button => {
              button.addEventListener('click', () => clearCart(item));
            })
            

        });
    }
}
displayCart();


function clearCart(item) {
  let numberOfProducts = localStorage.getItem('cartQuantity');
  let cartCost = localStorage.getItem('totalCost');
  let cartItems = localStorage.getItem('productsInCart');

  numberOfProducts = parseInt(numberOfProducts);
  cartItems = JSON.parse(cartItems); 

  if ( numberOfProducts ) {
    localStorage.setItem('cartQuantity', numberOfProducts - numberOfProducts );
    document.querySelector(".count").textContent = numberOfProducts - numberOfProducts ;
    localStorage.setItem("totalCost", cartCost - cartCost);
    localStorage.removeItem('productsInCart', item);

    cartTotalContainer.innerHTML = "0";
    container.innerHTML = '<div class="message">Your shopping cart is empty..</div>';

  }   

   displayCart();  
}



/*
function decreaseBtn(item) {
    let numberOfProducts = localStorage.getItem('cartQuantity');
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart');
    numberOfProducts = parseInt(numberOfProducts);
    cartItems = JSON.parse(cartItems); 

    if ( numberOfProducts ) {
      localStorage.setItem('cartQuantity', numberOfProducts - 1);
      document.querySelector(".count").textContent = numberOfProducts - 1;
      localStorage.setItem("totalCost", cartCost - item.data.attributes.price);
      item.data.inCart - 1; 
    }   

    if ( numberOfProducts <= 1 || cartCost == 0 ) {
      localStorage.removeItem('productsInCart', item);
      cartTotalContainer.innerHTML = "";
      headerContainer.innerHTML = "";
     }

     displayCart();  
}

/*
function increaseBtn(item) {
  let numberOfProducts = localStorage.getItem('cartQuantity');
  let cartItems = localStorage.getItem('productsInCart');
  let cartCost = localStorage.getItem('totalCost');
  numberOfProducts = parseInt(numberOfProducts);
  cartItems = JSON.parse(cartItems); 

  if ( numberOfProducts ) {
    localStorage.setItem('cartQuantity', numberOfProducts + 1);
    document.querySelector(".count").textContent = numberOfProducts + 1; 
    localStorage.setItem("totalCost", cartCost + item.data.attributes.price);
  }   
  if ( !numberOfProducts ) {
    localStorage.removeItem('cartQuantity', numberOfProducts);
    localStorage.removeItem('productsInCart', item);
    localStorage.removeItem("totalCost", 0);
    cartTotalContainer.innerHTML = "";
    headerContainer.innerHTML = "";
   }
   displayCart();  
}
*/