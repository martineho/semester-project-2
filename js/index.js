import { baseUrl } from "./settings/api.js";
import { sliderToggle } from "./ui/slider.js";
import { herotop } from "./ui/herotop.js";
import createNav from "./components/createNav.js";

const url = baseUrl + "api/products?populate=*";

createNav();
sliderToggle();
herotop();


async function getAllProducts() {

    const container = document.querySelector(".slider");

    try {
        const response = await fetch(url);
        const json = await response.json();

        const products = json.data; 
        console.log(products);

        container.innerHTML = "";

        products.forEach(function (product) { 

            const title = product.attributes.title;
            const price = product.attributes.price;
            var featured = product.attributes.featured;

            if (featured === true) {

            container.innerHTML += `<div class="product">
                                        <a class="image-container" href="details.html?id=${product.id}"><img class="product-image" src="http://localhost:1337${product.attributes.image.data.attributes.url}" alt="http://localhost:1337${product.attributes.image.data.attributes.alternativeText}"></a> 
                                        <div class="btn btn-primary btn-md btn-light product-btn">View</div>
                                        <div class="product-description">
                                            <h6 class="product-title">${title}</h6>
                                            <div class="product-price">${price} NOK</div>
                                        </div>
                                    </div>
                                    `;
            }
        });
          
    } catch (error) {
        console.log(error);
    }
}
getAllProducts();