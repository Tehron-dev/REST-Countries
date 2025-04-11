const country = (evt) => {
    console.log(evt.target.dataset.id)
    if(evt.target.dataset.id){
        // window.location.href = "/html/main.html";
        countryData(evt.target.dataset.id);
    };
};

function countryData(countryId){
    console.log(countryId)
    let country = countries.filter(country => country.id == countryId);
    console.log(country)
};

elCountriesList.addEventListener("click", country);