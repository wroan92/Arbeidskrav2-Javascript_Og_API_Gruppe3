// TODO: Husk og slette og endre kommentarer, de komentarene som er her nå er for og huske hvordan logikken og koden er skrevet.
let caracterCard = document.querySelector("#caracterCardContainer");
let searchInput = document.querySelector("#searchInput");
let houseDropdown = document.querySelector("#houseDropdown");
// Henter data fra api og lagrer det i variabelen data
fetch("https://hp-api.onrender.com/api/characters")
  // Konverterer data til json
  .then((Response) => Response.json())
  // Henter data fra variabelen data og lagrer det i variabelen data
  .then((data) => {
    console.log(data);
    // Variabelen filteredData lagrer data fra variabelen data
    let filteredData = data;
    // Lytter etter endringer i søkefeltet og kaller på funksjonen searchInput med parameteret "input"
    searchInput.addEventListener("input", () => {
      // variabelen searchValue lagrer verdien av søkefeltet i små bokstaver
      let searchValue = searchInput.value.toLowerCase();
      // Filtrerer ut alle karakterene i data som ikke inneholder søkeverdien fra searchValue
      filteredData = data.filter((caracter) =>
        caracter.name.toLowerCase().includes(searchValue)
      );
      // Filtrerer ut alle karakterene i arrayet som ikke tilhører huset valgt i dropdown-menyen
      if (houseDropdown.value !== "all") {
        filteredData = filteredData.filter(
          (caracter) => caracter.house === houseDropdown.value
        );
      }
      // Viser resultatet av søket ved og kalle på funksjonen displayCharacters med parameteret filteredData, så den viser karakterene som er filtrert ut i i filteredData
      showCharacters(filteredData);
    });
    houseDropdown.addEventListener("change", () => {
      // Ser om det er valgt et annet hus en alle
      if (houseDropdown.value !== "all") {
        // Hvis dropdown ikke er alle, filtreres karakterene fra data som tilhører det valgte huset og lagrer resultatet i filteredData
        filteredData = data.filter(
          (caracter) => caracter.house === houseDropdown.value
        );
        // Hvis brukeren har valgt alle hus, filtreres ikke karakterene fra data og alle husene vises
      } else {
        filteredData = data;
      }
      // For og kunne søke innenfor valgte hus
      // Ser om søkefeltet er tomt
      if (searchInput.value !== "") {
        // Hvis søkefeltet ikke er tomt lagres veriden i searchValue
        let searchValue = searchInput.value.toLowerCase();
        // Hvis det er tekst i søkefeltet så filtrers karakterene fra filteredData som inneholder søkeverdien fra searchValue
        filteredData = filteredData.filter((caracter) =>
          caracter.name.toLowerCase().includes(searchValue)
        );
      }
      // Kaller på funksjonen showCharacters med filteredData som parameter som viser resultatet av filtreringen basert på valgt hus og søkefelt.
      showCharacters(filteredData);
    });
    showCharacters(filteredData);
  });
// funksjon som tar med seg data som parameter og viser karakterene i html
function showCharacters(data) {
  // Tømmer html-elementet caracterCard
  caracterCard.innerHTML = "";
  // Går gjennom hver karakter i data (arrayet) med forEach for hver karakter legges variablene currentAge og ageClass til
  data.forEach((caracter) => {
    // Variabelen currentAge lagrer alderen til karakteren ved og trekke fra årstallet karakteren ble født fra 2023
    let currentAge = 2023 - caracter.yearOfBirth;
    let ageClass = "";
    // Hvis karakteren er død, så settes currentAge til "Død" og ageClass til "dead"
    if (caracter.alive === false) {
      currentAge = "Død";
      ageClass = "dead";
      // Hvis informasjonen om karakterens alder ikke er tilgjengelig, så settes currentAge til "Uvisst"
    } else if (caracter.yearOfBirth === null) {
      currentAge = "Uvisst";
    }
    // Hvis karakteren ikke har et bilde, så settes bilde til et bilde av Harry Potter logoen
    if (caracter.image === "") {
      caracter.image = `Images/harry-potter-logo.jpg`;
    }
    // Switch som sjekker hvilket hus karakteren tilhører og setter variabelen houseColor til et bilde av huset
    let houseColor = "";
    switch (caracter.house) {
      case "Gryffindor":
        houseImg = "Images/Gryffindor.jpg";
        break;
      case "Slytherin":
        houseImg = "Images/Slytherin.jpg";
        break;
      case "Ravenclaw":
        houseImg = "Images/Ravenclaw.png";
        break;
      case "Hufflepuff":
        houseImg = "Images/Hufflepuff.jpg";
        break;
      default:
        houseImg = "white";
    }
    // Legger til html-elementer med informasjon om karakteren i html-elementet caracterCard
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
