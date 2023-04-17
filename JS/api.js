fetch('https://hp-api.onrender.com/api/characters')
.then(Response => Response.json())
.then(data => {
    console.log(data);
})
