let univerCards = document.querySelector(".universities");
let univerCountry = document.querySelector(".univerCountry");
let inputUniver = document.querySelector("input");
let search = document.querySelector(".search");

let country = "Kyrgyzstan";

function countryApi() {
  axios(`https://restcountries.com/v3.1/all`).then((res) => {
    univerCountry.innerHTML = "";
    res.data.map((el) => {
      univerCountry.innerHTML += `
      <option value="${el.name.common}">${el.name.common}</option>
      `;
    });
  });
}
countryApi();

search.addEventListener("click", () => {
  let title = inputUniver.value;
  country = title.slice(0, 1).toUpperCase() + title.slice(1).toLowerCase();
  univerApi();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let title = inputUniver.value;
    country = title.slice(0, 1).toUpperCase() + title.slice(1).toLowerCase();
    univerApi();
  }
});

univerCountry.addEventListener("change", (e) => {
  country = e.target.value;
  univerApi();
});

function univerApi() {
  axios(`http://universities.hipolabs.com/search?country=${country}`).then(
    (res) => {
      console.log(res.data);
      getUniver(res.data);
    }
  );
}
univerApi();

function getUniver(data) {
  univerCards.innerHTML = "";
  data.map((el) => {
    univerCards.innerHTML += `
         <div class="univerCard">
         <div class="univerImg">
         <h3>${el.country.toUpperCase()}</h3>
         </div>
         <div class="univerText">
         <h3>${el.name}</h3>
         <h4>${el.alpha_two_code}</h4>
         <a href="${el.web_pages}" target="_blank" >${el.domains}</a>
         </div>
         </div>
    `;
  });
}
