const countryData = (evt) => {
    console.log(evt.target.dataset.id);
}

elCountriesList.addEventListener("click", countryData);