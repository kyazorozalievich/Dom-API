let block = document.querySelector(".weatherBlock");
let input = document.querySelector("input");
let search = document.querySelector(".search");
let select = document.querySelector("select");

let city = "Bishkek";
let language = "ru";

function rename() {
  city = input.value.trim();
}

select.addEventListener("change", (e) => {
  language = e.target.value;
  getWeather();
});

function getWeather() { 
  axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6b4c292e3e049dbf64d6c2441cc77864&lang=${language}`
  )
    .then((res) => {
      const obj = res.data;
      block.innerHTML = `
        <div class="main">
          <img src="https://openweathermap.org/img/w/${obj.weather[0].icon}.png" alt="" />
          <h2>${obj.name}</h2>
        </div>
        <div class="hr"></div>
        <div class="content">
          <h2>Подробнее</h2>
          <div class="text">
            <h3>Температура:</h3>
            <h4>${obj.main.temp}°C</h4>
          </div>
          <div class="text">
            <h3>Описание:</h3>
            <h4>${obj.weather[0].description}</h4>
          </div>
          <div class="text">
            <h3>Влажность:</h3>
            <h4>${obj.main.humidity}%</h4>
          </div>
          <div class="text">
            <h3>Ветер:</h3>
            <h4>${obj.wind.speed} м/с</h4>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      block.innerHTML = `<h3 style="color: red;">Ошибка: Город не найден</h3>`;
      console.error(err);
    });
}
getWeather();

search.addEventListener("click", () => {
  rename();
  getWeather();
});
