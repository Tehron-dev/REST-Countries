const elModeChange = document.querySelector(".js-mode-change");
const elHeader = document.querySelector(".js-header");
const elMain = document.querySelector(".js-main");
const elFooter = document.querySelector(".js-footer");
const elCountryList = elTemp.querySelector(".js-country-list");

// const saytMode = (evt) => {
//     let mode = window.localStorage.getItem("mode") ? JSON.parse(window.localStorage.getItem("mode")) : true;
//     if(mode){
//         elHeader.classList.add("dark");
//         elHeader.classList.remove("light");
//         elMain.classList.add("dark");
//         elMain.classList.remove("light");
//         elCountryList.classList.add("dark");
//         elCountryList.classList.remove("light");
//         elCountriesList.classList.add("dark");   
//         elCountriesList.classList.remove("light");
//         elFooter.classList.add("dark");
//         elFooter.classList.remove("light");
//         window.localStorage.setItem("mode", "false"); 
//     }else {
//         elHeader.classList.add("light");
//         elHeader.classList.remove("dark");
//         elMain.classList.add("light");
//         elMain.classList.remove("dark");
//         elCountryList.classList.add("light");
//         elCountryList.classList.remove("dark");
//         elCountriesList.classList.add("light");
//         elCountriesList.classList.remove("dark");
//         elFooter.classList.add("light");
//         elFooter.classList.remove("dark");
//         window.localStorage.setItem("mode", "true");
//     }
// };

function saytMode({light, dark}){
        if(dark){
        elHeader.classList.add("dark");
        elHeader.classList.remove("light");
        elMain.classList.add("dark");
        elMain.classList.remove("light");
        elCountryList.classList.add("dark");
        elCountryList.classList.remove("light");
        elCountriesList.classList.add("dark");
        elCountriesList.classList.remove("light");
        elFooter.classList.add("dark");
        elFooter.classList.remove("light");
        window.localStorage.setItem("mode", "false"); 
    }else {
        elHeader.classList.add("light");
        elHeader.classList.remove("dark");
        elMain.classList.add("light");
        elMain.classList.remove("dark");
        elCountryList.classList.add("light");
        elCountryList.classList.remove("dark");
        elCountriesList.classList.add("light");
        elCountriesList.classList.remove("dark");
        elFooter.classList.add("light");
        elFooter.classList.remove("dark");
        window.localStorage.setItem("mode", "true");
    }
}

let mode = window.localStorage.getItem("mode") ? JSON.parse(window.localStorage.getItem("mode")) : "true";
saytMode({light: mode, dark: !mode});

elModeChange.addEventListener("click", evt => {
    if(window.localStorage.getItem("mode") && window.localStorage.getItem("mode") == true){
        saytMode({light: false, dark: true});
        window.localStorage.setItem("mode", "false")
    }else{
        saytMode({light: true, dark: false});
        window.localStorage.setItem("mode", "true");
    };
});