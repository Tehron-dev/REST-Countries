const elFlagCountry = document.querySelector(".js-country-data-flag-img");
const elCountryName = document.querySelector(".js-data-country-name");
const elCountryNativeName = document.querySelector(".js-data-country-nativename");
const elPopulation = document.querySelector(".js-country-data-population");
const elCountryRegion = document.querySelector(".js-data-country-region");
const elCountrySubRegion = document.querySelector(".js-data-country-sub-region");
const elCoutnryCapital = document.querySelector(".js-data-country-capital");
const elCountryBorders = document.querySelector(".js-data-country-borders");
const elCountryDomain = document.querySelector(".js-country-domain");
const elCountryCurrencie = document.querySelector(".js-country-cuurencie");
const elCountryLanguages = document.querySelector(".js-country-languages");

let data = []

async function handleCountry(){
    let country = window.localStorage.getItem("countryName");
    let req = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    data = await req.json();
    handleRenderCountry(data);
};
handleCountry()

function handleRenderCountry(arr){
    arr.forEach(country => {
        elFlagCountry.src = country.flags.png ? country.flags.png : "Flag picture wasn't found";
        elCountryName.textContent = country.name.common ? country.name.common : "Name was not found";
        elCountryNativeName.textContent = country.name.official;
        elPopulation.textContent = country.population ? country.population : "Country population was not found";
        elCountryRegion.textContent = country.region ? country.region : "Region was not found";
        elCountrySubRegion.textContent = country.subregion ? country.subregion : "Subregion was not found";
        elCoutnryCapital.textContent = country.capital[0] ? country.capital[0] : "Capital was not found";
        elCountryBorders.textContent = country.borders ? country.borders.join(", ") : "Borders were not found";
        elCountryDomain.textContent = country.domain ? country.domain : "Domain was not found";
        elCountryCurrencie.textContent = country.currencies ? Object.values(country.currencies)[0].name : "Currencie was not found";
        elCountryLanguages.textContent = country.languages ? Object.values(country.languages) : "Languages were not found";
    })
}