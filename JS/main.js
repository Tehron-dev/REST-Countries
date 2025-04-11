const elTemp = document.querySelector(".js-temp").content;
const elCountriesList = document.querySelector(".js-countries-list");
const elPeginationBox = document.querySelector(".js-pegination-box");
const elSearchCountry = document.querySelector(".js-serarch-countries");
let elListPage = document.querySelector(".js-list-page");
let currentPage = 1;
let itemsPerPage = 8;
let countries = [];

async function fetchUrl(url) {
    try {
        let request = await fetch(url);
        let response = await request.json();
        countries = response
        renderPage();
    }catch (error) {
        console.log(error);
    };
};

async function renderFunction(arr) {
    const docFrag = document.createDocumentFragment();
    arr.forEach((country, index) => {
        country["id"] = index + 1;
        let clone = elTemp.cloneNode(true);
        clone.querySelector(".js-country-list").dataset.id = country.id;
        clone.querySelector(".js-country-flag-img").src = country.flags.png;
        clone.querySelector(".js-country-name").textContent = country.name.common;
        clone.querySelector(".js-country-population").textContent = country.population;
        clone.querySelector(".js-country-region").textContent = country.region;
        clone.querySelector(".js-country-capital").textContent = country.capital;
        docFrag.appendChild(clone);
    });
    elCountriesList.append(docFrag)
}
fetchUrl("https://restcountries.com/v3.1/all");

function renderPage(){
    let startInd = (currentPage - 1) * itemsPerPage;
    let lastInd = startInd + itemsPerPage;
    let currentItems = countries.slice(startInd, lastInd);
    elCountriesList.innerHTML = '';
    renderFunction(currentItems);
    elListPage.textContent = currentPage;
};

elPeginationBox.addEventListener("click", evt => {
    if(evt.target.matches(".js-prev-btn")) {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }   
    }
    if(evt.target.matches(".js-next-btn")) {
        if (currentPage * itemsPerPage < countries.length) {
            currentPage++;
            renderPage();
        }
    }
});

elSearchCountry.addEventListener("")