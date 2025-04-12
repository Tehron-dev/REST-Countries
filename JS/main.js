const elForm = document.querySelector(".js-form");
const elTemp = document.querySelector(".js-temp").content;
const elCountriesList = document.querySelector(".js-countries-list");
const elPeginationBox = document.querySelector(".js-pegination-box");
const elSearchCountry = document.querySelector(".js-search-countries");
const elSortSelect = document.querySelector(".js-sort-select");
const elListPage = document.querySelector(".js-list-page");
const elSelectSortRegion = document.querySelector(".js-sort-region");
let currentPage = window.localStorage.getItem("page") ? JSON.parse(window.localStorage.getItem("page")) : 1;
let itemsPerPage = 8;
let countries = [];
let currentItems = [];

async function fetchUrl(url) {
    try {
        let request = await fetch(url);
        let response = await request.json();
        countries = response.map((country, id) => {
            country.id = id;
            return country;
        });
        renderPage();
    }catch (error) {
        console.log(error);
    };
};

async function renderFunction(arr, regex="") {
    const docFrag = document.createDocumentFragment();
    elCountriesList.innerHTML = ''
    arr.forEach((country) => {
        let clone = elTemp.cloneNode(true);
        const countryFlagImg = clone.querySelector(".js-country-flag-img");
        countryFlagImg.src = country.flags.png;
        countryFlagImg.dataset.id = country.id;
        const countryName = clone.querySelector(".js-country-name");
        if(regex && (regex == "(?:)")) {
            countryName.innerHTML = country.name.common.replaceAll(regex, match => {
                return `<mark>${match}</mark>`
            })
        }else {
            countryName.textContent = country.name.common;
        }
        countryName.dataset.id = country.id;
        clone.querySelector(".js-country-population").textContent = country.population;
        clone.querySelector(".js-country-region").textContent = country.region;
        clone.querySelector(".js-country-capital").textContent = country.capital;
        docFrag.appendChild(clone);
    });
    elCountriesList.append(docFrag)
}

function renderPage(){
    let startInd = (currentPage - 1) * itemsPerPage;
    let lastInd = startInd + itemsPerPage;
    currentItems = countries.slice(startInd, lastInd);
    elCountriesList.innerHTML = '';
    renderFunction(currentItems);
    elListPage.textContent = currentPage;
    window.localStorage.setItem("page", JSON.stringify(currentPage));
};

elPeginationBox.addEventListener("click", evt => {
    if(evt.target.matches(".js-prev-btn")) {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        };
    };
    if(evt.target.matches(".js-next-btn")) {
        if (currentPage * itemsPerPage < countries.length) {
            currentPage++;
            renderPage();
        };
    };
});  

function filterCountries(regex, searchValue){
    let searchResult = currentItems.filter(country => {
        let res = (searchValue == "" || country.name.common.match(regex)) && (elSelectSortRegion.value == '' || country.region.toLowerCase().includes(elSelectSortRegion.value));
        return res;
    });
    renderFunction(searchResult, regex);
};  

const sortCountries = {
    ["a-z"]: function(a, b){
         return a.name.common.localeCompare(b.name.common);
    },
    ["z-a"]: function(a, b){
        return b.name.common.localeCompare(a.name.common);
    },
    ["population"]: function(a, b){
        const A = a.population;
        const B = b.population;
        if(A < B) return 1
        else return -1;
    }
};

elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const searchValue = elSearchCountry.value;
    let regex = new RegExp(searchValue, "gi");
    if(elSortSelect.value){
        currentItems.sort(sortCountries[elSortSelect.value]);
        renderFunction(currentItems);
    };
    filterCountries(regex, searchValue);
})

fetchUrl("https://restcountries.com/v3.1/all");

elCountriesList.addEventListener("click", evt => {
    const id = evt.target.dataset.id;
    let countryName = countries[id].name.common;
    window.localStorage.setItem("countryName", countryName);
    window.location = "/html/main.html";
});

const logoutBtn = document.querySelector(".js-logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            window.location.href = `/html/register.html`;
        });
    }
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = `/html/register.html`;
}
