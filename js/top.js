const btn_scrolltop = document.getElementById("btn_scrolltop")
btn_scrolltop.addEventListener('click', () => {
    window.scrollTo(0, 0)
})

window.onscroll = () => {
    add_btn_scrolltop()
}

const add_btn_scrolltop = () => {
    if (window.scrollY < 300) {
        btn_scrolltop.classList.remove("btn-scrolltop-on")
    } else {
        btn_scrolltop.classList.add("btn-scrolltop-on")
    }
}
var conoff = document.querySelector('.logo');

window.addEventListener('offline', event => {
    conoff.innerHTML = 'Sin conexion a internet';
})

window.addEventListener('online', event => {
    conoff.innerHTML = 'Conectado a internet';
})
if (!navigator.onLine){
    console.log('offline');
}