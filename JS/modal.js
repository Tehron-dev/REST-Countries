const elFlagImg = document.querySelector(".js-country-data-flag-img");
const elDataCountryName = document.querySelector(".js-data-country-name");
const elDataCountryNativename = document.querySelector(".js-data-country-nativename");

const country = (evt) => {
    if(evt.target.dataset.id){
        // window.location.href = "/html/main.html";
        countryData(evt.target.dataset.id);
    };
};

function countryData(countryId){
    let country = countries.find(country => country.id == countryId);
    console.log(country)
    elFlagImg.src = country.flags.png;
    elDataCountryName.textContent = country.name.common;
    elDataCountryNativename.textContent = country.name.nativeName.eng.common
};
