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


const favs_cards = document.getElementById('favs-cards');
var db;
var row;

function init() {
    db = new Dexie('pwaPj');

    row = favs_cards.firstElementChild;
    
    document.body.addEventListener('click', delFav);

    db.version(1).stores({fav: '_id'});
    db.open()
        .then(refreshView);
}


function delFav(e) {

    var id;

  if(e.target.hasAttribute('id') && e.target.classList.contains('link-danger')) {
    e.preventDefault();

    id = e.target.getAttribute('id');

    db.fav.where('_id').equals(id).delete()
    .then(refreshView);
  }

}

function refreshView() {
    return db.fav.toArray()
    .then (
        function(favs){

            var html = '';

            for(var i=0; i<favs.length; i++) {

              html += `
                    <div class="col">
                    <div class="card">
                        <img src="${favs[i].img}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${favs[i].text}</h5>
                        <button class="link-danger delete" id="${favs[i]._id}" >Eliminar de favoritos</button>
                        </div>
                    </div>
                    </div>
                `;

            }
            
            row.innerHTML = html;
        }
    )
        
}

init();