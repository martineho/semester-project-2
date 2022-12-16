import { baseUrl } from "./settings/api.js";
import createNav from "./components/createNav.js";

createNav();

const url = baseUrl + "api/products?populate=*";
const container = document.querySelector(".products-all");

// fetch products 
const getAllProducts = async () => {

    try {
        const response = await fetch(url);
        let json = await response.json();
        const products = json.data; 
        console.log(products);

        displayProducts(products);
        searchProducts(products);
        
          
    } catch (error) {
        console.log(error);
    }
}
getAllProducts();

// create Html 
const displayProducts = (products) => {
    container.innerHTML = "";
    searchProducts(products);

    products.forEach(function (product) { 

        const title = product.attributes.title;
        const price = product.attributes.price;

        container.innerHTML += `<div class="product col-6 col-lg-3 p-3">
                                    <a href="details.html?id=${product.id}"><img class="product-image" src="http://localhost:1337${product.attributes.image.data.attributes.url}" alt="http://localhost:1337${product.attributes.image.data.attributes.alternativeText}"></a> 
                                    <div class="product-description">
                                        <h6 class="product-title">${title}</h6>
                                        <div class="product-price">${price} NOK</div>
                                    </div>
                                </div>
                                `;
    });
};

// search products
const searchProducts = (products) => {

    const search = document.querySelector("#filterInput")

    search.onkeyup = function (e) {

        const inputValue = e.target.value.trim().toLowerCase();

        const filteredProducts = products.filter(function (product) {
            if (product.attributes.title.toLowerCase().startsWith(inputValue)) {
                return true;
            }
        })
        displayProducts(filteredProducts);
    }
};
