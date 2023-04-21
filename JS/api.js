const urlParams = new URLSearchParams(window.location.search);
const houseName = urlParams.get("houseName");

let caracterCard = document.querySelector("#caracterCardContainer");
let searchInput = document.querySelector("#searchInput");
let houseDropdown = document.querySelector("#houseDropdown");

let newCharacterForm = document.querySelector("#newCharacterForm");
let dataFromLocalStorage = JSON.parse(localStorage.getItem("characters")) || [];
let filteredData = dataFromLocalStorage;
console.log(filteredData);
fetch("https://hp-api.onrender.com/api/characters")
  .then((Response) => Response.json())
  .then((data) => {
    console.log(data);
    filteredData = dataFromLocalStorage.concat(data);

    searchInput.addEventListener("input", () => {
      let searchValue = searchInput.value.toLowerCase();
      filteredData = data.filter((caracter) =>
        caracter.name.toLowerCase().includes(searchValue)
      );
      if (houseDropdown.value !== "all") {
        filteredData = filteredData.filter(
          (caracter) => caracter.house === houseDropdown.value
        );
      }
      showCharacters(filteredData);
    });
    if (houseName) {
      houseDropdown.value = houseName;
      filteredData = data.filter(
        (caracter) => caracter.house === houseDropdown.value
      );
    } else {
      filteredData = data.filter(
        (caracter) => caracter.house === houseDropdown.value
      );
    }

    houseDropdown.addEventListener("change", () => {
      if (houseDropdown.value !== "all") {
        filteredData = data.filter(
          (caracter) => caracter.house === houseDropdown.value
        );
      } else {
        filteredData = data;
      }
      if (searchInput.value !== "") {
        let searchValue = searchInput.value.toLowerCase();
        filteredData = filteredData.filter((caracter) =>
          caracter.name.toLowerCase().includes(searchValue)
        );
      }
      showCharacters(filteredData);
    });
    showCharacters(filteredData);
  });

newCharacterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = document.querySelector("#nameInput").value;
  let house = document.querySelector("#houseInput").value;
  let age = document.querySelector("#ageInput").valueAsNumber;

  let newCharacter = {
    name: name,
    house: house,
    yearOfBirth: 2023 - age,
    alive: true,
    image: "",
  };
  filteredData.push(newCharacter);
  dataFromLocalStorage = filteredData;
  localStorage.setItem("characters", JSON.stringify(dataFromLocalStorage));
  showCharacters(filteredData);
  newCharacterForm.reset();
});

function showCharacters(data) {
  caracterCard.innerHTML = "";
  data.forEach((caracter) => {
    let currentAge = 2023 - caracter.yearOfBirth;
    let ageClass = "";
    if (caracter.alive === false) {
      currentAge = "Død";
      ageClass = "dead";
    } else if (caracter.yearOfBirth === null) {
      currentAge = "Uvisst";
    }
    if (caracter.image === "") {
      caracter.image = `Images/harry-potter-logo.jpg`;
    }

    if (caracter.house === "Gryffindor") {
      houseImg = "Images/Gryffindor.jpg";
    } else if (caracter.house === "Slytherin") {
      houseImg = "Images/Slytherin.jpg";
    } else if (caracter.house === "Ravenclaw") {
      houseImg = "Images/Ravenclaw.png";
    } else if (caracter.house === "Hufflepuff") {
      houseImg = "Images/Hufflepuff.jpg";
    } else {
      houseImg = "";
    }
    caracterCard.innerHTML += `
      <div class="caracterCard" style="width: 18rem; ${backgroundStyle}">
        <img src="${caracter.image}" alt="Harry Potter caracter image">
        <div class="card-body">
          <h1>${caracter.name}</h1>
          <p class="card-text"></p>
        </div>
        <ul>
          <li>House: ${caracter.house}</li>
          <li class="${ageClass}" >Alder: ${currentAge} </li>
        </ul>
      </div>
    `;
  });
}

// random karakter 

const addCharacterBtn = document.getElementById("addCharacterBtn");
addCharacterBtn.addEventListener("click", getRandomCharacter);

async function getRandomCharacter() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  const data = await response.json();
  const randomCharacter = data[Math.floor(Math.random() * data.length)];
  showCharacter(randomCharacter);
}

function showCharacter(caracter) {
  let currentAge = 2023 - caracter.yearOfBirth;
  let ageClass = "";
  if (caracter.alive === false) {
    currentAge = "Død";
    ageClass = "dead";
  } else if (caracter.yearOfBirth === null) {
    currentAge = "Uvisst";
  }
  if (caracter.image === "") {
    caracter.image = `Images/harry-potter-logo.jpg`;
  }

  let houseColor = "";
  switch (caracter.house) {
    case "Gryffindor":
      houseColor = "Gryffindor";
      break;
    case "Slytherin":
      houseColor = "Slytherin";
      break;
    case "Ravenclaw":
      houseColor = "Ravenclaw";
      break;
    case "Hufflepuff":
      houseColor = "Hufflepuff";
      break;
    default:
      houseColor = "white";
  }

  let backgroundStyle = "";
  if (houseColor !== "white") {
    backgroundStyle = `background-image: url('Images/${houseColor}.jpg'); background-size: full; background-position: right;`;
  }
  caracterCard.innerHTML = `
    <div class="caracterCard" style="width: 18rem; ${backgroundStyle}">
      <img src="${caracter.image}" alt="Harry Potter caracter image">
      <div class="card-body">
        <h1>${caracter.name}</h1>
        <p class="card-text"></p>
      </div>
      <ul>
        <li>House: ${caracter.house}</li>
        <li class="${ageClass}" >Alder: ${currentAge} </li>
      </ul>
    </div>
  `;
}

//karakter
function addNewCharacter() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const house = document.getElementById("house").value;

  const newCharacter = {
    name: name,
    yearOfBirth: 2023 - age,
    house: house,
    alive: true,
    image: ""
  };

  showCharacters([newCharacter], house.toLowerCase());
}




