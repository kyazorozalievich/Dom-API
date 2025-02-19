let dogsBlock = document.querySelector(".dogsBlocks");
let dogsImage = document.querySelector(".dogsImage");
let nullImage = document.querySelector(".nullImage");
let dogsFilter = document.querySelector(".dogFilter");
let dogsBreed = document.querySelector(".dogBreed");
let input = document.querySelector("input");
let search = document.querySelector(".search");

let dogData = [];
let trueImg = false;

function allDogs() {
  axios(`https://dog.ceo/api/breeds/list/all`)
    .then((res) => {
      let result = Object.keys(res.data.message);
      console.log(result);
      getDogs(result);
      dogData = result;
    })
    .then(() => getBtn());
}
allDogs();

function getDogs(data) {
  dogsBlock.innerHTML = "";
  data.map((el) => {
    dogsBlock.innerHTML += `
    <button class="getBreed">${el}</button>
    `;
    dogsBreed.innerHTML += `
    <option vlaue="${el}">${el}</option>
    `;
  });
}

dogsFilter.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "a-z":
      let res = dogData.sort((a, z) => a.localeCompare(z));
      getDogs(res);
      break;
    case "z-a":
      let res2 = dogData.sort((a, z) => z.localeCompare(a));
      getDogs(res2);
      break;
  }
});

dogsBreed.addEventListener("change", (e) => {
  let target = e.target.value;
  trueImg = true;
  getImage(target);
  getImage2(target);
  getImage3(target);
  getImage4(target);
  noneImg();
});

function searchingDog() {
  trueImg = true;
  getImage(input.value.toLowerCase());
  getImage2(input.value.toLowerCase());
  getImage3(input.value.toLowerCase());
  getImage4(input.value.toLowerCase());
  noneImg();
}

search.addEventListener("click", () => {
  searchingDog();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchingDog();
  }
});

function getBtn() {
  const allBtn = document.querySelectorAll(".getBreed");
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      trueImg = true;
      getImage(btn.innerHTML);
      getImage2(btn.innerHTML);
      getImage3(btn.innerHTML);
      getImage4(btn.innerHTML);
      noneImg();
    });
  });
}

function noneImg() {
  dogsImage.style.display = "none";
  if (trueImg === true) {
    (dogsImage.style.display = "block"), (nullImage.style.display = "none");
  } else {
    (dogsImage.style.display = "none"), (nullImage.style.display = "block");
  }
}
noneImg();

function getImage(breed) {
  dogsImage.innerHTML = "";
  axios(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) => {
    dogsImage.innerHTML += `
        <img src="${res.data.message}" alt="" width="300"/>
        `;
  });
}
function getImage2(breed) {
  dogsImage.innerHTML = "";
  axios(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) => {
    dogsImage.innerHTML += `
          <img src="${res.data.message}" alt="" width="300"/>
          `;
  });
}
function getImage3(breed) {
  dogsImage.innerHTML = "";
  axios(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) => {
    dogsImage.innerHTML += `
            <img src="${res.data.message}" alt="" width="300"/>
            `;
  });
}
function getImage4(breed) {
  dogsImage.innerHTML = "";
  axios(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) => {
    dogsImage.innerHTML += `
              <img src="${res.data.message}" alt="" width="300"/>
              `;
  });
}
