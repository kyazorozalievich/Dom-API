let products = document.querySelector(".products");
let price = document.querySelector(".priceFilter");
let title = document.querySelector(".titleFilter");
let rate = document.querySelector(".rateFilter");
let count = document.querySelector(".countFilter");

let filterData = [];

axios(`https://fakestoreapi.com/products`).then((res) => {
  console.log(res.data);
  filterData = res.data;
  getProducts(res.data);
});

price.addEventListener("change", (e) => {
  let target = e.target.value;
  switch (target) {
    case "expensive":
      let expensive = filterData.sort((a, b) => b.price - a.price);
      getProducts(expensive);
      break;
    case "cheap":
      let cheap = filterData.sort((a, b) => a.price - b.price);
      getProducts(cheap);
      break;
    default:
      getProducts(filterData);
      break;
  }
});

title.addEventListener("change", (e) => {
  let target = e.target.value;
  switch (target) {
    case "a-z":
      let az = filterData.sort((a, z) => a.title.localeCompare(z.title));
      getProducts(az);
      break;
    case "z-a":
      let za = filterData.sort((a, z) => z.title.localeCompare(a.title));
      getProducts(za);
      break;
    default:
      getProducts(filterData);
      break;
  }
});

rate.addEventListener("change", (e) => {
  let target = e.target.value;
  switch (target) {
    case "vip":
      let vip = filterData.sort((a, b) => b.rating.rate - a.rating.rate);
      getProducts(vip);
      break;
    case "simple":
      let simple = filterData.sort((a, b) => a.rating.rate - b.rating.rate);
      getProducts(simple);
      break;
    default:
      getProducts(filterData);
      break;
  }
});

count.addEventListener("change", (e) => {
  let target = e.target.value;
  switch (target) {
    case "many":
      let many = filterData.sort((a, b) => b.rating.count - a.rating.count);
      getProducts(many);
      break;
    case "little":
      let little = filterData.sort((a, b) => a.rating.count - b.rating.count);
      getProducts(little);
      break;
    default:
      getProducts(filterData);
      break;
  }
});

function getProducts(data) {
  products.innerHTML = "";
  data?.map((el) => {
    products.innerHTML += `
         <div class="product" style=" 
         border: 2px solid ${el.price > 100 ? "red" : "black"}
         ">
         ${
           Math.round(el.price) > 100
             ? '<img src="./img/productSale.png" alt="sale" class="sale" />'
             : ""
         }
          
              <img src="${el.image}" alt="" />
              ${
                el.rating.rate > 4
                  ? '<img src="./img/productVip.webp" alt="vip" class="vip"/>'
                  : ""
              }
              <div class="text">
              <h2>${
                el.title.length > 30 ? el.title.slice(0, 30) + "..." : el.title
              }</h2>
              <div class="price">
              <h4 style="color:  ${el.price > 100 ? "red" : "black"}; 
              }">$${
                Math.round(el.price) > 100
                  ? Math.round(el.price * 0.8)
                  : Math.round(el.price)
              }</h4>
              ${
                Math.round(el.price) > 100
                  ? `<h5><strike>$${Math.round(el.price)}</strike></h5>`
                  : ""
              }
              </div>
              <div class="rating">
              <div class="number">
              <h4>count:</h4>
              <h4>${el.rating.count}</h4>
              </div>
              <div class="number">
              <h4>rate:</h4>
              <h4>⭐️${el.rating.rate}</h4>
              </div>
              </div>
              <p>${
                el.description.length > 100
                  ? el.description.slice(0, 120) + "..."
                  : el.description
              }</p>
              </div>
            </div>
        `;
  });
}

getProducts();
