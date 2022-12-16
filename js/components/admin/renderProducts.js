import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";
import createNav from "../createNav.js";

createNav();

const url = baseUrl + "api/products?populate=*";
const container = document.querySelector(".products-all");

// fetch products 
const getAllProducts = async () => {

    try {
        const response = await fetch(url);
        let json = await response.json();
        const products = json.data; 

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
        const description = product.attributes.description;

        container.innerHTML += `<div class="product-details row">
                                    <a class="col-lg-1" href="details.html?id=${product.id}"><img class="product-image" src="http://localhost:1337${product.attributes.image.data.attributes.url}" alt="http://localhost:1337${product.attributes.image.data.attributes.alternativeText}"></a> 
                                        <h6 class="product-title col-lg-4">${title}</h6>
                                        <p class="product-description col-lg-4">${description}</p>
                                        <div class="product-price col-lg-1">${price} NOK</div>
                                        <div class="col-lg-2 links">
                                            <a class="btn btn-primary btn-dark" href="edit.html?id=${product.id}">Edit</a>
                                            <div class="delete-container"><button type="button" id="delete" class="btn btn-primary delete">Delete</button></div>
                                        </div>
                                </div>`;

        // Get delete buttons                        
        document.querySelectorAll('button.delete').forEach(button => {
            button.addEventListener('click', () => deleteProduct(product.id));
        })
    });
};

// Delete product
async function deleteProduct(id) {

    const doDelete = confirm("Are you sure you want to delete this?");

    if (doDelete) {
        const deleteUrl = baseUrl + "api/products/" + id ;
        const token = getToken();

        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(deleteUrl, options);
            const json = await response.json();
            console.log(json);
            location.href = "admin.html";

        } catch (error) {
            console.log(error);
        }
    }
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
