var conoff = document.querySelector('.logo');

window.addEventListener('offline', event => {
    conoff.innerHTML = 'Sin conexion a internet';
})

window.addEventListener('online', event => {
    conoff.innerHTML = 'Conectado a internet';
})
if (!navigator.onLine) {
    console.log('offline');
}

const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const favs_home = document.getElementById('favs-home');
const favsCards = document.getElementById('favs-cards'); 
const nameHome = document.getElementById('name-h');
const idHome = document.getElementById('id-home');
const imgHome = document.getElementById('img-home');
const namePj = document.querySelector('.name_');
const imagePj = document.querySelector('.image_');
const genderPj = document.querySelector('.gender_');


const constructorDeQuery = (nombre) => `
query {
  characters(filter: { name: "${nombre}" }) {
    results {
      name,
      image,
      gender
    }
  }
}
`
button.addEventListener('click', () => {
    const valorInput = inputElement.value;

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: constructorDeQuery(valorInput)
        })
    }

    fetch('https://rickandmortyapi.com/graphql', options)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            pjRick(json.data);
        })
        .catch(function (err) {
            errorLoad();
        })
});

function errorLoad() {
    namePj.innerHTML = 'Lo siento';
    genderPj.innerHTML = 'Hubo un error al buscar ese personaje, porfavor intente buscando otro.'
}

function pjRick(data) {
    imagePj.src = data.characters.results[0].image;
    namePj.innerHTML = data.characters.results[0].name;
    genderPj.innerHTML = data.characters.results[0].gender;
}

var db;

function init() {
    db = new Dexie('pwaPj');
    row = favsCards.firstElementChild;
    
    document.body.addEventListener('submit', addFav);

    db.version(1).stores({fav: '_id'});
    db.open();
}

function addFav(e) {
    
    e.preventDefault();

    db.fav.add({text: nameHome.innerHTML, _id: idHome.innerHTML, img: imgHome.src})
    .then(function(){
        console.log('fav')
    });
}



init();