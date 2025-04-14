const elForm = document.querySelector(".js-form");
const elTemp = document.querySelector(".js-temp").content;
const elCountriesList = document.querySelector(".js-countries-list");
const elPeginationBox = document.querySelector(".js-pegination-box");
const elSearchCountry = document.querySelector(".js-search-countries");
const elSortSelect = document.querySelector(".js-sort-select");
const elListPage = document.querySelector(".js-list-page");
const elSelectSortRegion = document.querySelector(".js-sort-region");
const elModeChange = document.querySelector(".js-mode-change");
const elCountryList = elTemp.querySelector(".js-country-list")
let currentPage = window.localStorage.getItem("page") ? JSON.parse(window.localStorage.getItem("page")) : 1;
let itemsPerPage = 8;
let countries = [];
let currentItems = [];
let mode = localStorage.getItem("mode") ? window.localStorage.getItem("mode") : "light";

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
        const countryItem = clone.querySelector(".js-country-list");
        if (mode == "light") {
            countryItem.classList.add("dark");
            countryItem.classList.remove("light");
        } else {
            countryItem.classList.add("light");
            countryItem.classList.remove("dark");
        }
        const countryFlagImg = clone.querySelector(".js-country-flag-img");
        countryFlagImg.src = country.flags.png;
        countryFlagImg.dataset.id = country.id;
        const countryName = clone.querySelector(".js-country-name");
        if(regex && !(regex == "(?:)")) {
            countryName.innerHTML = country.name.common.replaceAll(regex, match => {
                return `<mark>${match}</mark>`;
            });
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



function applyMode() {
    if (mode == "light") {
        elCountriesList.classList.add("dark");
        elCountriesList.classList.remove("light");
        document.querySelector(".js-header").classList.add("dark");
        document.querySelector(".js-header").classList.remove("light");
        document.querySelectorAll(".js-country-list").forEach(el => {
            el.classList.add("dark");
            el.classList.remove("light");
        });
        document.querySelector(".js-main").classList.add("dark");
        document.querySelector(".js-main").classList.remove("light");
        document.querySelector(".js-footer").classList.add("dark");
        document.querySelector(".js-footer").classList.remove("light");
        elForm.querySelector(".js-search-countries").classList.add("dark");
        elForm.querySelector(".js-search-countries").classList.remove("light");
        elForm.querySelector(".js-sort-region").classList.add("dark");
        elForm.querySelector(".js-sort-region").classList.remove("light");
        elForm.querySelector(".js-sort-select").classList.add("dark");
        elForm.querySelector(".js-sort-select").classList.remove("light");
        document.querySelector(".js-mode").textContent = "Light Mode";
    } else {
        elCountriesList.classList.remove("dark");
        elCountriesList.classList.add("light");
        document.querySelector(".js-header").classList.add("light");
        document.querySelector(".js-header").classList.remove("dark");
        document.querySelectorAll(".js-country-list").forEach(el => {
            el.classList.add("light");
            el.classList.remove("dark");
        });
        document.querySelector(".js-main").classList.add("light");
        document.querySelector(".js-main").classList.remove("dark");
        document.querySelector(".js-footer").classList.add("light");
        document.querySelector(".js-footer").classList.remove("dark");
        elForm.querySelector(".js-search-countries").classList.add("light");
        elForm.querySelector(".js-search-countries").classList.remove("dark");
        elForm.querySelector(".js-sort-region").classList.add("light");
        elForm.querySelector(".js-sort-region").classList.remove("dark");
        elForm.querySelector(".js-sort-select").classList.add("light");
        elForm.querySelector(".js-sort-select").classList.remove("dark");
        document.querySelector(".js-mode").textContent = "Dark Mode";
    };
};
applyMode();
elModeChange.addEventListener("click", () => {
    mode = mode == "dark" ? "light" : "dark";
    localStorage.setItem("mode", mode);
    applyMode();
});