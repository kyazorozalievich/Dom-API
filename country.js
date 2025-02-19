let countries = document.querySelector(".countries");
let next = document.querySelector(".next");
let textFilter = document.querySelector(".textFilter");
let numberFilter = document.querySelector(".numberFilter");
let regionFilter = document.querySelector(".regionFilter");
let input = document.querySelector("input");
let search = document.querySelector(".search");

let countryData = [];
let countryFilter = [];
let searchData = [];
let count = 4;

function allCountry() {
  axios(`https://restcountries.com/v3.1/all`).then((res) => {
    console.log(res.data);
    countryData = res.data;
    getCountry(res.data);
  });
}
allCountry();

textFilter.addEventListener("change", (e) => {
  numberFilter.value = "";
  regionFilter.value = "";
  input.value = "";

  switch (e.target.value) {
    case "coun(a-z)":
      countryFilter = countryData.sort((a, z) =>
        a.name.common.localeCompare(z.name.common)
      );
      getCountry(countryFilter);
      break;
    case "coun(z-a)":
      countryFilter = countryData.sort((a, z) =>
        z.name.common.localeCompare(a.name.common)
      );
      getCountry(countryFilter);
      break;
    case "reg(a-z)":
      countryFilter = countryData.sort((a, z) =>
        a.region.localeCompare(z.region)
      );
      getCountry(countryFilter);
      break;
    case "reg(z-a)":
      countryFilter = countryData.sort((a, z) =>
        z.region.localeCompare(a.region)
      );
      getCountry(countryFilter);
      break;
  }
});
numberFilter.addEventListener("change", (e) => {
  textFilter.value = "";
  regionFilter.value = "";
  input.value = "";

  switch (e.target.value) {
    case "area+":
      countryFilter = countryData.sort((a, z) => z.area - a.area);
      getCountry(countryFilter);
      break;
    case "area-":
      countryFilter = countryData.sort((a, z) => a.area - z.area);
      getCountry(countryFilter);
      break;
    case "pop+":
      countryFilter = countryData.sort((a, z) => z.population - a.population);
      getCountry(countryFilter);
      break;
    case "pop-":
      countryFilter = countryData.sort((a, z) => a.population - z.population);
      getCountry(countryFilter);
      break;
  }
});
regionFilter.addEventListener("change", (e) => {
  numberFilter.value = "";
  textFilter.value = "";
  input.value = "";

  switch (e.target.value) {
    case "Asia":
      countryFilter = countryData.filter((el) => el.region === "Asia");
      getCountry(countryFilter);
      break;
    case "Europe":
      countryFilter = countryData.filter((el) => el.region === "Europe");
      getCountry(countryFilter);
      break;
    case "Americas":
      countryFilter = countryData.filter((el) => el.region === "Americas");
      getCountry(countryFilter);
      break;
    case "Antarctic":
      countryFilter = countryData.filter((el) => el.region === "Antarctic");
      getCountry(countryFilter);
      break;
    case "Africa":
      countryFilter = countryData.filter((el) => el.region === "Africa");
      getCountry(countryFilter);
      break;
    case "Oceania":
      countryFilter = countryData.filter((el) => el.region === "Oceania");
      getCountry(countryFilter);
      break;
  }
});

search.addEventListener("click", () => {
  searching();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    return searching();
  }
});
function searching() {
  textFilter.value = "";
  numberFilter.value = "";
  regionFilter.value = "";

  searchData = countryData.filter(
    (el) =>
      el.region.toLowerCase() === input.value.toLowerCase() ||
      el.name.common.toLowerCase() === input.value.toLocaleLowerCase()
  );
  getCountry(searchData);
}

next.addEventListener("click", () => {
  count += 4;
  getCountry(countryFilter.length === 0 ? countryData : countryFilter);
});

function getCountry(data) {
  countries.innerHTML = "";
  data.slice(0, count).map((el) => {
    countries.innerHTML += `
       <div class="countryCard">
            <img src="${el.flags.svg}" alt="">
            <div class="countryText">
            <h4>${el.name.common}</h4>
            <div class="content">
            <div class="text">
            <h4>Region <ion-icon name="location-outline"></ion-icon>:</h4>
            <h5>${el.region}</h5>
            </div>
            <div class="text">
            <h4>Area <ion-icon name="map-outline"></ion-icon>:</h4>
            <h5>${el.area}</h5>
            </div>
            <div class="text">
            <h4>Population <ion-icon name="people-outline"></ion-icon>:</h4>
            <h5>${el.population}</h5>
            </div>
            </div>
            <a href="${el.maps.googleMaps}" target="_blank">Map country</a>
            </div>
         </div>
    `;
  });
}
