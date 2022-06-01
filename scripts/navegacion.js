//-------------- Inicializacion de Variables --------------------------------------------------------------------

let etiqueta
let filtros = "off"

const API_KEY = "api_key=9710362e22c45a4c7c3cf4e7afca34d7"
const  BASE_URL = "https://api.themoviedb.org/3"
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + "/search/movie?" + API_KEY

const fecha = new Date();

let dia = fecha.getDate()
dia > 9? dia = fecha.getDate() : dia = `0${fecha.getDate()}`
let mes = fecha.getMonth()
mes > 9? mes = fecha.getMonth() : mes = `0${fecha.getMonth()}`

const API_URL_LATEST = BASE_URL + `/discover/movie?primary_release_date.gte=${fecha.getFullYear()}-${mes}-${dia-1}&primary_release_date.lte=${fecha.getFullYear()}-${mes}-${dia}&` + API_KEY

let generos = [
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

// ------------------ Constructor HTML -------------------------------------------------------------------------------

const biblioteca = document.querySelector("#main__section");

function getPopMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.results != 0){
        showMovies(data.results)
      }else{
        biblioteca.innerHTML= "No se encontraron resultados"
      }
    })

    .catch(err => console.log(err))
}

function getLatMovies(url){
  fetch(url)
  .then(res => res.json())
  .then(data => showCarousel(data.results))
  //.catch(err => console.log(err))
}

function showCarousel(data){
  data.forEach(movie => {
    const {title, poster_path, vote_average, overview, id} = movie;
    const carousel = document.querySelector(".carousel");
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

const return__btn = document.querySelector(".return__btn")
return__btn.addEventListener("click", () => window.scrollTo({top: 0, behavior:"smooth"}))

// -----------------------------LLamado a Eventos ----------------------

document.addEventListener("DOMContentLoaded", () => localStorage.getItem("theme") == "nightMode" ? nightTheme() : dayTheme())

let btn_sol = document.querySelector("#sol");
btn_sol.addEventListener("click", dayTheme) 

let btn_luna = document.querySelector("#luna");
btn_luna.addEventListener("click", nightTheme)


let btn_filtros = document.querySelector("#filtros")
btn_filtros.addEventListener("click", mostrarFiltros)

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
    marcarSeleccion()
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
    marcarSeleccion()
}

//_____________ Filtros ______________________________


function mostrarFiltros(){
    const main__section__div = document.querySelector("#main__section__div")
    if(filtros == "off"){
    main__section__div.classList.add("view80")
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
    mostarCategorias()
    marcarSeleccion()
    }else{
    main__section__div.classList.remove("view80")
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

//________________BUSQUEDA_____________

const form_busq = document.querySelector("#form_busq")
const busqueda = document.querySelector(".busqueda")
const main__section__div = document.querySelector(".main__section__div")
const estrenos = document.querySelector("#estrenos")

form_busq.addEventListener("submit", (e) => {
  e.preventDefault()
  biblioteca.innerHTML = ""
  const searchTerm = busqueda.value
  catSeleccionada = []
  if(searchTerm){
    main__section__div.classList.add("display--none")
    estrenos.classList.add("display--none")
    getPopMovies(searchURL + "&query=" + searchTerm)
  }else{
    estrenos.classList.remove("display--none")
    main__section__div.classList.remove("display--none")
    getLatMovies(API_URL_LATEST);
    getPopMovies(API_URL);
  }
})

//________________FILTROS_____________

const listaCats = document.querySelector("#listaCats")
let catSeleccionada = []
function mostarCategorias() {
  listaCats.innerHTML= ""
  generos.forEach(genero => {
      const t = document.createElement('li');
      t.classList.add('listaCats__cat');
      t.id=genero.id;
      t.innerText = genero.name;
      t.addEventListener('click', () => {
          if(catSeleccionada.length == 0){
            catSeleccionada.push(genero.id);
          }else{
              if(catSeleccionada.includes(genero.id)){
                catSeleccionada.forEach((id, idx) => {
                      if(id == genero.id){
                        catSeleccionada.splice(idx, 1);
                      }
                  })
              }else{
                catSeleccionada.push(genero.id);
              }
          }
          console.log(catSeleccionada)
          estrenos.innerHTML= ""
          main__section__div.innerHTML= ""
          biblioteca.innerHTML= ''
          getPopMovies(API_URL + '&with_genres='+ encodeURI(catSeleccionada.join(',')))
          marcarSeleccion()
      })
      listaCats.append(t);
  })
}

function marcarSeleccion() {
  const tags = document.querySelectorAll('.listaCats__cat');
  tags.forEach(tag => {
      tag.classList.remove('highlight--night')
      tag.classList.remove('highlight--day')
  })
  clearBtn()
  if(catSeleccionada.length !=0){   
      catSeleccionada.forEach(id => {
          const hightlightedTag = document.getElementById(id);
          localStorage.getItem("theme") == "nightMode" ? hightlightedTag.classList.add('highlight--night') : hightlightedTag.classList.add('highlight--day')
      })
  }

}

function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      localStorage.getItem("theme") == "nightMode" ? clearBtn.classList.add('highlight--night') : clearBtn.classList.add('highlight--day')
  }else{     
      let clear = document.createElement('div');
      clear.classList.add('listaCats__cat');
      localStorage.getItem("theme") == "nightMode" ? clear.classList.add('highlight--night') : clear.classList.add('highlight--day')
      clear.id = 'clear';
      clear.innerText = 'Borrar filtros';
      clear.addEventListener('click', () => {
          catSeleccionada = [];
          biblioteca.innerHTML = ""          
          getPopMovies(API_URL)
          marcarSeleccion()
      })
      listaCats.append(clear);
  }
  
}