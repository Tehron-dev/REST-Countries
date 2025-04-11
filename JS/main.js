const elTemp = document.querySelector(".js-temp").content;
const elCountriesList = document.querySelector(".js-countries-list");
const elPeginationBox = document.querySelector(".js-pegination-box");
const elSearchCountry = document.querySelector(".js-search-countries");
const elSortSelect = document.querySelector(".js-sort-select");
let elListPage = document.querySelector(".js-list-page");
let currentPage = 1;
let itemsPerPage = 8;
let countries = [];
let currentItems = [];

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

async function renderFunction(arr, regex="") {
    const docFrag = document.createDocumentFragment();
    elCountriesList.innerHTML = ''
    arr.forEach((country, index) => {
        country["id"] = index + 1;
        let clone = elTemp.cloneNode(true);
        const countryFlagImg = clone.querySelector(".js-country-flag-img");
        countryFlagImg.src = country.flags.png;
        countryFlagImg.dataset.id = country.id;
        const countryName = clone.querySelector(".js-country-name");
        if(regex && (regex == "(?:)")) {
            countryName.innerHTML = country.name.common.replaceAll(regex, match => {
                return `<mark class="rounded-lg">${match}</mark>`
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

function filterCountries(regex, searchValue){
    let searchResult = currentItems.filter(country => {
        let res = searchValue == "" || country.name.common.match(regex);
        return res;
    });
    renderFunction(searchResult, regex);
};  
  
elSearchCountry.addEventListener("input", (evt) => {
    const searchValue = evt.target.value.trim()
    let regex = new RegExp(searchValue, "gi");
    filterCountries(regex, searchValue);
});

function sortCountries(type) {
    if (type == "a-z") {
        countries.sort((a, b) => {
            if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
                return 1;
            } else if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    } else if (type == "z-a") {
        countries.sort((a, b) => {
            if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
                return -1;
            } else if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (type == "population") {
        countries.sort((a, b) => b.population - a.population);
    }

    currentPage = 1;
    renderPage();
}

elSortSelect.addEventListener("change", (evt) => {
    sortCountries(evt.target.value);
});


fetchUrl("https://restcountries.com/v3.1/all");