import createNav from "./components/createNav.js";
createNav();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const options = {};
const url = "http://localhost:1337/api/products/" + id + "?populate=*";

const container = document.querySelector(".details");
const title = document.querySelector("title");
const breadcrumbs = document.querySelector(".breadcrumbs");

export const getProductDetails = async () => { 
    
    try {
        const response = await fetch(url, options);
        let json = await response.json();
        const product = json;

        product.inCart =  0;

        createProduct(product);
        updateTitle(product);
        createBreadcrumbs(product);
        
        const addToCart = () => { 
          const addBtn = document.querySelector("#add");
                                
          addBtn.addEventListener('click', function() { // On add to cart click eventlistener

                  saveToStorage(product);
                  totalCost(product);
                 
                  addBtn.innerHTML = "Added";
                  addBtn.style.backgroundColor = "gray";
                  addBtn.style.borderColor = "gray"; 
          });
        }
        addToCart();
          
    } catch (error) {
        console.log(error);
    }
};
getProductDetails ();

const createProduct = (product) => {
        container.innerHTML += `<div class="row">
                                      <div class="col-12 col-lg-6 p-3 product-image">
                                          <img src="http://localhost:1337${product.data.attributes.image.data.attributes.url}" alt="http://localhost:1337${product.data.attributes.image.data.attributes.alternativeText}">
                                      </div>
                                      <div class="col-12 col-lg-6 p-3 product-details">
                                          <h1>${product.data.attributes.title}</h1>
                                          <div class="product-price">${product.data.attributes.price} NOK</div>
                                          <p class="product-description">${product.data.attributes.description}</p>
                                          <button id="add" class="btn btn-dark">Add to cart</button>
                                          
                                              <div class="accordion accordion-flush" id="productAccordion">
                                                  <div class="accordion-item">
                                                    <h2 class="accordion-header" id="flush-headingOne">
                                                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        Details
                                                      </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#productAccordion">
                                                      <div class="accordion-body">Placeholder content.</div>
                                                    </div>
                                                  </div>
                                                  <div class="accordion-item">
                                                    <h2 class="accordion-header" id="flush-headingTwo">
                                                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                        Ingredients
                                                      </button>
                                                    </h2>
                                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#productAccordion">
                                                      <div class="accordion-body">Malpighia Emarginata (Acerola) Fruit Extract, Euterpe Oleracea Fruit Extract, Propanediol, Alcohol, Niacinamide, Butylene Glycol, Moringa Pterygosperma Seed Extract, Melia Azadirachta Extract, Prunus Mume Fruit Extract, Nasturtium Officinale Extract, Nelumbium Speciosum Flower Extract, Glutathione, Glycerin, Lecithin, Bis-PEG-18 Methyl Ether Dimethyl Silane, Sodium Magnesium Silicate, Adenosine, PEG-60 Hydrogenated Castor Oil, Water, Disodium EDTA, Fragrance</div>
                                                    </div>
                                                </div>
                                          </div>
                                      </div>
                                  </div>`;
        
};

const updateTitle = (product) => {
        document.title = `${product.data.attributes.title} - noor.com`;
        title.innerHTML = `${product.data.attributes.title} - noor.com`;  
};

const createBreadcrumbs = (product) => {
        breadcrumbs.innerHTML += `<ul>
                                    <li><a href="index.html">Home </a></li>
                                    <li><a href="all-products.html">Products</a></li>
                                    <li><a class="active" href="#">${product.data.attributes.title}</a></li>
                                  </ul>`; 
};

// save product number to local storage
export function saveToStorage(product) {

    let numberOfProducts = localStorage.getItem('cartQuantity');
    numberOfProducts = parseInt(numberOfProducts);

    // if product exists add another one
    if ( numberOfProducts ) {
      localStorage.setItem('cartQuantity', numberOfProducts + 1);
      //document.querySelector(".count").style.opacity = "1";
      document.querySelector(".count").textContent = numberOfProducts + 1;
    }
    // if product does not exist add only one
    else {
      localStorage.setItem('cartQuantity', 1);
      document.querySelector(".count").textContent = 1;
    }
    setItem(product);
}

// save product to local storage 
function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); // parse to make it a JS object
    
    if (cartItems != null) { 
          if (cartItems[product.data.attributes.title] == undefined) {
            cartItems = {
                  ...cartItems,
                  [product.data.attributes.title]: product
            }
    }
      cartItems[product.data.attributes.title].inCart += 1; 
    } else {
        product.inCart =  1;
        cartItems = {
          [product.data.attributes.title]: product, // Set beginning of object to be the title
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
  
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost); // updating from string to a number
        localStorage.setItem("totalCost", cartCost + product.data.attributes.price);
    } else {
        localStorage.setItem("totalCost", product.data.attributes.price);
    }
}
