import { baseUrl } from "../settings/api.js";
const heroUrl = baseUrl + "api/home?populate=hero_banner";

export async function herotop() {

    const container = document.querySelector("#herotop");

    try {
        const response = await fetch(heroUrl);
        const json = await response.json();

        const result = json.data;

        container.innerHTML += `<div class="herotop container" style="background-image: url('http://localhost:1337${result.attributes.hero_banner.data.attributes.url}')">
                                    <div class="row">
                                        <div class="col-12 col-lg-6">
                                            <div class="herotop-text">
                                            <h1>Glowing and balanced summer skin.</h1>
                                            <a class="btn btn-primary btn-lg btn-light" href="all-products.html">Shop skincare</a>
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-6"></div>
                                    </div>
                                </div>`;

        // container.innerHTML += `<img src="http://localhost:1337${result.attributes.hero_banner.data.attributes.url}">`;
        // container.style.backgroundImage = "url('http://localhost:1337${result.attributes.hero_banner.data.attributes.url}')";
        // container.style.backgroundImage = "url("`http://localhost:1337${result.attributes.hero_banner.data.attributes.url}`;");"
    }
    catch {

    }
}
