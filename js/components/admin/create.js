import displayMessage from "../common/displayMessage.js";
import createNav from "../createNav.js";
import { getToken } from "../../utils/storage.js";

createNav();

async function onCreateProduct(event) {
    event.preventDefault();

    const token = getToken();

    const form = event.target;
    const action = form.action;
    const enctype = form.method;
    const method = form.method;
    const originalFormData = new FormData(form);
    const headers = new Headers({ Authorization: `Bearer ${token}` })
    const body = new FormData();

    // featured checkbox true/false
    document.querySelector("#featured").checked = true;
    document.querySelector("#featured").checked = false;

    if (featured.checked) {
        return true;
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
        const response = await fetch(action, {body, method, enctype, headers})
        const result = await response.json();

        if (result) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if (result.error) {
            displayMessage("error", "Plese fill in proper values", ".message-container");
        }
        console.log(result);

    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
  }

const createForm = document.querySelector('form#create');

if (createForm) {
  createForm.addEventListener('submit', onCreateProduct)
}