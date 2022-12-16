import { getUsername } from "../utils/storage.js";
import { logoutBtn, logoutBtnSm } from "./logoutBtn.js";

export default function createNav() {

    const { pathname } = document.location;

    const container = document.querySelector(".top-menu");

    const username = getUsername();
    console.log(username);

    let authLink = `<button id="loginBtn" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#loginModal">Sign in</button>`;
    let authLinkSm = `<button id="loginSm" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#loginModal">Sign in</button>`;
    let adminLink = ``;

    if (username) {
          authLink = `<button id="logoutBtn" type="button" class="btn">Log out</button>`;
          authLinkSm = `<button id="logoutBtnSm" type="button" class="btn">Logout</button>`;
          adminLink = `<a href="admin.html" class="btn ${pathname === "/admin.html" ? "active" : ""}">Admin</a>`;
    }

    container.innerHTML = `
                          <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
                              <div class="container-fluid">
                                  <a class="navbar-brand navbar-brand-centered"><img id="logo" alt="nour" src="/assets/logo.png"></a>

                                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                  </button>

                                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                          <li class="nav-item">
                                            <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" href="/">Home</a>
                                          </li>
                                          <li class="nav-item">
                                            <a class="nav-link ${pathname === "/all-products.html" ? "active" : ""}" href="all-products.html">Products</a>
                                          </li>
                                        </ul>
                                        <ul class="sm-list"> 
                                          <li class="nav-link" id="adminLink"> ${adminLink} </li>
                                          <li class="nav-link" id="loginSm"> ${authLinkSm} </li>
                                        </ul>
                                    <ul class="navbar-nav ml-auto">
                                      <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          <img id="user" alt="user" src="/assets/ui/user_icon.png">
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                                          <li id="adminLink"> ${adminLink} </li>
                                          <li id="login"> ${authLink} </li>
                                        </ul>
                                      </li>
                                      <li class="nav-item">
                                        <a class="nav-link" href="cart.html"><img id="shopping-bag" alt="shopping bag" src="/assets/ui/bag_icon.png"><span class="count">0</span></a>
                                      </li>
                                    </ul>
                                  </div>
                              </div>
                          </nav>`;

    logoutBtn();
    logoutBtnSm();
}
