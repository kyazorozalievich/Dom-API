let users = document.querySelector(".users");
let userSelect = document.querySelector(".peopleFilter");

let filterUser = [];

function userData() {
  axios(`https://jsonplaceholder.typicode.com/users`).then((res) => {
    console.log(res.data);
    filterUser = res.data;
    getUser(res.data);
  });
}
userData();

userSelect.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "a-z":
      let res = filterUser.sort((a, z) => a.username.localeCompare(z.username));
      getUser(res);
      break;
    case "z-a":
      let res2 = filterUser.sort((a, z) => z.username.localeCompare(a.username));
      getUser(res2);
      break;
  }
});

function getUser(data) {
  users.innerHTML = "";
  data.map((el) => {
    users.innerHTML += `
       <div class="userCard">
                <div class="main">
                <img src="./img/user.webp" alt="">
                <h2>${el.username}</h2>
                </div>
                <div class="hr"></div>
                <div class="content">
                <div class="text">
                <h3>Name:</h3>
                <h4>${el.name}</h4>
                </div>
                  <div class="hr"></div>
                  <div class="text">
                <h3>Email:</h3>
                <h4>${el.email}</h4>
                </div>
                  <div class="hr"></div>
                  <div class="text">
                <h3>Phone:</h3>
                <h4>${el.phone}</h4>
                </div>
                  <div class="hr"></div>
                  <div class="text">
                <h3>Website:</h3>
                <h4>${el.website}</h4>
                </div>
                  <div class="hr"></div>
                  <div class="text">
                <h3>Address:</h3>
                <h4>city - ${el.address.city},<br/> street - ${el.address.street}</h4>
                </div>
                  <div class="hr"></div>
                  <div class="text">
                <h3>Company:</h3>
                <h4>${el.company.name}</h4>
                </div>
                </div>
            </div>
    `;
  });
}
