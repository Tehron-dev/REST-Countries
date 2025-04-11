const elTemp = document.querySelector(".js-temp").content;
const elCountriesList = document.querySelector(".js-countries-list");
const elPeginationBox = document.querySelector(".js-pegination-box");
const elSearchInput = document.querySelector("input[type='text']");
let elListPage = document.querySelector(".js-list-page");
let currentPage = 1;
let itemsPerPage = 8;
let countries = [];
let filteredCountries = [];

async function fetchUrl(url) {
  try {
    let request = await fetch(url);
    let response = await request.json();
    countries = response;
    filteredCountries = [...countries]; // search uchun
    renderPage();
  } catch (error) {
    console.log(error);
  }
}

async function renderFunction(arr) {
  const docFrag = document.createDocumentFragment();
  arr.forEach((country, index) => {
    country["id"] = index + 1;
    let clone = elTemp.cloneNode(true);
    const countryFlagImg = clone.querySelector(".js-country-flag-img");
    countryFlagImg.src = country.flags.png;
    countryFlagImg.dataset.id = country.id;

    const countryName = clone.querySelector(".js-country-name");
    countryName.textContent = country.name.common;

    clone.querySelector(".js-country-population").textContent = country.population;
    clone.querySelector(".js-country-region").textContent = country.region;
    clone.querySelector(".js-country-capital").textContent = country.capital;

    docFrag.appendChild(clone);
  });
  elCountriesList.append(docFrag);
}

function renderPage() {
  let startInd = (currentPage - 1) * itemsPerPage;
  let lastInd = startInd + itemsPerPage;
  let currentItems = filteredCountries.slice(startInd, lastInd);
  elCountriesList.innerHTML = "";
  renderFunction(currentItems);
  elListPage.textContent = currentPage;
}

elPeginationBox.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-prev-btn")) {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  }
  if (evt.target.matches(".js-next-btn")) {
    if (currentPage * itemsPerPage < filteredCountries.length) {
      currentPage++;
      renderPage();
    }
  }
});

elSearchInput.addEventListener("input", (evt) => {
  const searchValue = evt.target.value.trim().toLowerCase();
  filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue)
  );
  renderPage();
});

fetchUrl("https://restcountries.com/v3.1/all");
