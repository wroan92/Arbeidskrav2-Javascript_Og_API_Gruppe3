// TODO: endre api.js til script.js
const urlParams = new URLSearchParams(window.location.search);
const houseName = urlParams.get("houseName");

let caracterCard = document.querySelector("#caracterCardContainer");
let searchInput = document.querySelector("#searchInput");
let houseDropdown = document.querySelector("#houseDropdown");

let newCharacterForm = document.querySelector("#newCharacterForm");

const characters = localStorage.getItem("characters");

if (characters) {
  const parsedData = JSON.parse(characters);
  showCharacters(parsedData);
} else {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("characters", JSON.stringify(data));
      showCharacters(filteredData);
    })
    .catch((error) => {
      alert = "Kunne ikke hente data fra API'et prøv og last inn siden på nytt";
    });
}

const data = characters;

if (data) {
  const characters = JSON.parse(data);
  console.log(characters);
  searchInput.addEventListener("input", () => {
    let searchValue = searchInput.value.toLowerCase();
    filteredData = characters.filter((caracter) =>
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
    filteredData = characters.filter(
      (caracter) => caracter.house === houseDropdown.value
    );
  } else {
    filteredData = characters.filter(
      (caracter) => caracter.house === houseDropdown.value
    );
  }

  houseDropdown.addEventListener("change", () => {
    if (houseDropdown.value !== "all") {
      filteredData = characters.filter(
        (caracter) => caracter.house === houseDropdown.value
      );
    } else {
      filteredData = characters;
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
} else {
  console.log("Ingen data lagret i local storage");
}

newCharacterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = document.querySelector("#nameInput").value;
  let age = document.querySelector("#ageInput").valueAsNumber;
  let house = document.querySelector("#houseInput").value;

  let newCharacter = {
    name: name,
    house: house,
    yearOfBirth: 2023 - age,
    alive: true,
    image: "",
  };

  let characters = JSON.parse(localStorage.getItem("characters"));
  characters.push(newCharacter);
  localStorage.setItem("characters", JSON.stringify(characters));

  newCharacterForm.reset();
  showCharacters(filteredData);
  location.reload();
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
      houseImg = "Images/Ravenclaw.jpg";
    } else if (caracter.house === "Hufflepuff") {
      houseImg = "Images/Hufflepuff.jpg";
    } else {
      houseImg = "";
    }
    caracterCard.innerHTML += `
      <div class="caracterCard" style="width: 18rem; background-image: url('${houseImg}'); background-size: full; background-position: right;">
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
// TODO: Endre get element til query selector, må også endre id og klasse navn i html
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

  if (caracter.house === "Gryffindor") {
    houseImg = "Images/Gryffindor.jpg";
  } else if (caracter.house === "Slytherin") {
    houseImg = "Images/Slytherin.jpg";
  } else if (caracter.house === "Ravenclaw") {
    houseImg = "Images/Ravenclaw.jpg";
  } else if (caracter.house === "Hufflepuff") {
    houseImg = "Images/Hufflepuff.jpg";
  } else {
    houseImg = "";
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
