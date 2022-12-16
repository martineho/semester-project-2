import createNav from "../createNav.js";
import displayMessage from "../common/displayMessage.js";
import { getToken } from "../../utils/storage.js";

createNav();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "http://localhost:1337/api/products/" + id ;

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const checkBox = document.querySelector("#featured");

const getDetails = async () => {

    try {
        const response = await fetch(url);
        let details = await response.json();

        title.value = details.data.attributes.title;
        price.value = details.data.attributes.price;
        description.value = details.data.attributes.description;
        idInput.value = details.data.id;
        featured = details.data.attributes.featured;

        // display featured true/false
        if (featured) {
              if (featured == true) {
                checkBox.value = true;
              }
              else {
                checkBox.value = false;
              }
        }
        
    } catch (error) {
        console.log(error);
    }
}
getDetails();

async function submitForm(event) {
    event.preventDefault();

    const token = getToken();

    const form = event.target;
    const originalFormData = new FormData(form);
    const headers = new Headers({ Authorization: `Bearer ${token}` })
    const body = new FormData();

    if (checkBox.checked) {
        checkBox.checked = true;
    }

    // loop over input values and append to request
    for (const [key, value] of originalFormData.entries()) {
      if (key.includes('files.')) {
        body.append(key, value);
        originalFormData.delete(key);
      }
    }
  
    const data = Object.fromEntries(originalFormData.entries());
    body.append('data', JSON.stringify(data));

    try {
        const response = await fetch (url, 
        {
            enctype: form.enctype,
            method: "PUT",
            body,
            headers,
        });

        const result = await response.json();

        if (result) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if (result.error) {
            displayMessage("error", "Plese fill in proper values", ".message-container");
        }

        console.log(result);

    } catch (error) {
        displayMessage("error", "An error occured", ".message-container");
    }
  }

const editForm = document.querySelector('form#edit');

if (editForm) {
  editForm.addEventListener('submit', submitForm)
}