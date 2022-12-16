import displayMessage from "./components/common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");


form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();
   
    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
       return displayMessage("error", "Please insert a valid username and/or password", ".message-container");
    }

    loginUser(usernameValue, passwordValue);
}

async function loginUser(username, password) {
    const url = baseUrl + "api/auth/local";
    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.user) {
            displayMessage("success", "You are logged in", ".message-container");
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/";
        }

        if (json.error) {
            console.log("error")
            displayMessage("error", "Invalid login details", ".message-container");
        }

    } catch (error) {
        console.log(error);
    }
}