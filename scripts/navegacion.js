//-------------- Inicializacion de Variables --------------------------------------------------------------------

let etiqueta
let filtros = "off"

const API_KEY = "api_key=9710362e22c45a4c7c3cf4e7afca34d7"
const  BASE_URL = "https://api.themoviedb.org/3"
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const fecha = new Date();

let dia = fecha.getDate()
dia > 9? dia = fecha.getDate() : dia = `0${fecha.getDate()}`
let mes = fecha.getMonth()
mes > 9? mes = fecha.getMonth() : mes = `0${fecha.getMonth()}`

const API_URL_LATEST = BASE_URL + `/discover/movie?primary_release_date.gte=${fecha.getFullYear()}-${mes}-${dia}&primary_release_date.lte=${fecha.getFullYear()}-${mes}-${dia}&` + API_KEY


console.log(`${fecha.getFullYear()}-${mes}-${dia}`)

const generos = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

getLatMovies(API_URL_LATEST);
getPopMovies(API_URL);
getPopMovies(API_URL_LATEST);

// ------------------ Constructor HTML -------------------------------------------------------------------------------

function getPopMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.results)
        console.log(generos)
        showMovies(data.results)
    })
    .catch(err => console.log(err))
}

function getLatMovies(url){
  fetch(url)
  .then(res => res.json())
  .then(data => {
      console.log(data.results)
      console.log(generos)
      showCarousel(data.results)
  })
  .catch(err => console.log(err))
}

function showCarousel(data){
  data.forEach(movie => {
    const {title, poster_path, vote_average, overview, id} = movie;
    const carousel = document.querySelector(".carousel");
    // carousel.innerHTML += `               
    // <div class="card__div movie__btn card__div">
    // <img src="${IMG_URL + poster_path}" class="card__img" alt="" width="250" height="250">
    // </div>
    // ` 
    const carousel_div = document.createElement("div")
    const carousel_btn = document.createElement("button")
    carousel_btn.classList.add("movie__btn")
    const carousel_img = document.createElement("img")
    carousel_img.src = IMG_URL + poster_path
    carousel_img.classList.add("card__img")
    carousel_btn.appendChild(carousel_img)
    carousel_div.appendChild(carousel_btn)
    carousel.appendChild(carousel_div)
  })
}


function showMovies(data){
  data.forEach(movie => {
    const {title, poster_path, vote_average, overview, id} = movie;
    const biblioteca = document.querySelector("#main__section");
    biblioteca.innerHTML += `               
    <div class="card__div movie__btn card__div">
    <img src="${IMG_URL + poster_path}" class="card__img" alt="" width="250" height="250">
    </div>
    ` 
  });
}

scrollPelis = document.querySelector(".carousel")
btnDerecha = document.querySelector("#btnDerecha")



btnDerecha.addEventListener("click", () => {
  scrollPelis.scrollBy({
      left: 1250,
      behavior: "smooth"
  })
})        

btnIzquierda = document.querySelector("#btnIzquierda")

btnIzquierda.addEventListener("click", () => {
  scrollPelis.scrollBy({
      left: -1250,
      behavior: "smooth"
  })
})

// scrollPelis = document.querySelectorAll(".carousel")
// btnArriba = document.querySelectorAll("#btnArriba")

// scrollPelis.forEach(element => {
//     btnDerecha.forEach(e => {
//         e.addEventListener("click", () => {
//             element.scrollBy({
//                 left: 1300,
//                 behavior: "smooth"
//             })
//         })
//     })
// })

// -----------------------------LLamado a Eventos ----------------------

document.addEventListener("DOMContentLoaded", () => localStorage.getItem("theme") == "nightMode" ? nightTheme() : dayTheme())

let btn_sol = document.querySelector("#sol");
btn_sol.addEventListener("click", dayTheme) 

let btn_luna = document.querySelector("#luna");
btn_luna.addEventListener("click", nightTheme)


let btn_filtros = document.querySelector("#filtros")
btn_filtros.addEventListener("click", mostrarFiltros)

let btn_lupa = document.querySelector("#btn_lupa")
btn_lupa.addEventListener("click", mostrarBusqueda)

const header = document.querySelector("#header")

window.addEventListener("scroll", ()=>{
    let scroll = this.scrollY
    if(scroll >= 50){
    header.classList.remove("header__bg--transparent")
    localStorage.getItem("theme") == "nightMode" ? header.classList.add("header__bg--nightMode") : header.classList.add("header__bg--dayMode")
    }else{
        header.classList.add("header__bg--transparent")
        header.classList.remove("header__bg--nightMode")
        header.classList.remove("header__bg--dayMode")
    }    
})

//------------------------  EVENTOS  ---------------------------------

//__________ Modo dia / Modo noche ________________

function dayTheme(){
    etiqueta = document.querySelector("body")
    etiqueta.classList = "body--dayMode"
    etiqueta = document.querySelector(".header__title__span")
    etiqueta.classList.remove("header__title__span--nightMode")
    etiqueta.classList.add("header__title__span--dayMode")
    etiqueta = document.querySelector("#sol")
    etiqueta.classList.add("display--none")
    etiqueta = document.querySelector("#luna")
    etiqueta.classList.remove("display--none")
    etiqueta = document.querySelector("#aside")
    etiqueta.classList.remove("filtros__bg--nightMode")
    etiqueta.classList.add("filtros__bg--dayMode")
    etiqueta = document.querySelector("#header")
    etiqueta.classList.remove("header__bg--nightMode")
    etiqueta.classList.add("header__bg--dayMode")
    etiqueta = document.querySelectorAll("h1")
    etiqueta.forEach(e => {
        e.classList.remove("header__title--nightMode")
        e.classList.add("header__title--dayMode")
    });
    etiqueta = document.querySelectorAll(".card__title")
    etiqueta.forEach(e => {
        e.classList.remove("card__title--nightMode")
        e.classList.add("card__title--dayMode")
    });
    etiqueta = document.querySelectorAll(".main__section__title")
    etiqueta.forEach(e => {
        e.classList.remove("main__section__title--nightMode")
        e.classList.add("main__section__title--dayMode")
    });

    localStorage.setItem("theme", "dayMode")
}

function nightTheme(){
    etiqueta = document.querySelector("body")
    etiqueta.classList = "body--nightMode"
    etiqueta = document.querySelector(".header__title__span")
    etiqueta.classList.remove("header__title__span--dayMode")
    etiqueta.classList.add("header__title__span--nightMode")
    etiqueta = document.querySelector("#luna")
    etiqueta.classList.add("display--none")
    etiqueta = document.querySelector("#sol")
    etiqueta.classList.remove("display--none")
    etiqueta = document.querySelector("#aside")
    etiqueta.classList.remove("filtros__bg--dayMode")
    etiqueta.classList.add("filtros__bg--nightMode")
    etiqueta = document.querySelector("#header")
    etiqueta.classList.remove("header__bg--dayMode")
    etiqueta.classList.add("header__bg--nightMode")
    etiqueta = document.querySelectorAll("h1")
    etiqueta.forEach(e => {
        e.classList.remove("header__title--dayMode")
        e.classList.add("header__title--nightMode")
    });
    etiqueta = document.querySelectorAll(".card__title")
    etiqueta.forEach(e => {
        e.classList.remove("card__title--dayMode")
        e.classList.add("card__title--nightMode")
    });
    etiqueta = document.querySelectorAll(".main__section__title")
    etiqueta.forEach(e => {
        e.classList.remove("main__section__title--dayMode")
        e.classList.add("main__section__title--nightMode")
    });

    localStorage.setItem("theme", "nightMode")
}

//_____________ Filtros ______________________________

function mostrarFiltros(){
    if(filtros == "off"){
    cuerpo = document.querySelector("#main")
    cuerpo.classList.add("mainClass__filtros")
    cuerpo = document.querySelector("#aside")
    cuerpo.classList.remove("display--none")
    cuerpo.classList.add("filtros")
    cuerpo = document.querySelector("#btn_mas")
    cuerpo.classList.add("display--none")
    cuerpo = document.querySelector("#btn_menos")
    cuerpo.classList.remove("display--none")
    filtros = "on"
    }else{
        cuerpo = document.querySelector("#main")
    cuerpo.classList.remove("mainClass__filtros")
    cuerpo = document.querySelector("#aside")
    cuerpo.classList.remove("filtros")
    cuerpo.classList.add("display--none")
    cuerpo = document.querySelector("#btn_menos")
    cuerpo.classList.add("display--none")
    cuerpo = document.querySelector("#btn_mas")
    cuerpo.classList.remove("display--none")
    filtros = "off"
    }
    
}

//________________LUPA_____________

function mostrarBusqueda(){

    const { value: text } = Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      
      if (text) {
        Swal.fire(text)
      }
}