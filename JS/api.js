let caracterCard = document.querySelector('#caracterCardContainer');


fetch('https://hp-api.onrender.com/api/characters')
.then(Response => Response.json())
.then(data => {
    console.log(data);
    for (let i = 0; i < 10; i++) {
        caracterCard.innerHTML += `
          <div class="caracterCard" style="width: 18rem;">
                <img src="${data[i].image}" alt="Harry Potter caracter image">
                <div class="card-body">
                  <h5>${data[i].name}</h5>
                  <p class="card-text"></p>
                </div>
                <ul>
                  <li>House: ${data[i].house}</li>
                  <li>Alternate names: ${data[i].alternate_names}</li>
                  <li>Date of Bitrth: ${data[i].dateOfBirth}</li>
                </ul>
                <div class="card-body">
                  <button>Click me</button>
                </div>
              </div>
        `
    }

})
