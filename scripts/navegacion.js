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

const API_URL_LATEST = BASE_URL + `/discover/movie?primary_release_date.gte=${fecha.getFullYear()}-${mes}-${dia}&primary_release_date.lte=${fecha.getFullYear()}-${mes}-${dia}&` + API_KEY

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
        biblioteca.innerHTML= `<div class="noresults">No se encontraron resultados</div>`
      }
    })

    //.catch(err => console.log(err))
}

function getLatMovies(url){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    showCarousel(data.results) 
    console.log(data.results)})
  
  //.catch(err => console.log(err))
}

function showCarousel(data){
  data.forEach(movie => {
    const {title, poster_path, overview, vote_average, id} = movie;
    const carousel = document.querySelector(".carousel")
    const carousel_div = document.createElement("div")
    carousel_div.id = id
    const carousel_btn = document.createElement("button")
    carousel_btn.classList.add("movie__btn")
    const carousel_img = document.createElement("img")
    carousel_img.src = IMG_URL + poster_path
    carousel_img.classList.add("card__img")

    carousel_btn.appendChild(carousel_img)
    carousel_div.appendChild(carousel_btn)
    carousel.appendChild(carousel_div)

    let peli = document.getElementById(id)
    peli.addEventListener("click", () => mostrarDetalles(title, poster_path, overview, vote_average, id))
  })
}


function showMovies(data){
  data.forEach(movie => {
    const {title, poster_path, overview, vote_average, id} = movie;
    const biblioteca__div = document.createElement("div")
    biblioteca__div.classList.add("card__div","movie__btn","card__div")
    biblioteca__div.id = id
    const biblioteca__div__img = document.createElement("img")
    biblioteca__div__img.classList.add("card__img")
    biblioteca__div__img.src = IMG_URL + poster_path
    biblioteca__div.appendChild(biblioteca__div__img)

    biblioteca.appendChild(biblioteca__div)
    
    let peli = document.getElementById(id)
    peli.addEventListener("click", () => mostrarDetalles(title, poster_path, overview, vote_average, id))
  });
}

scrollPelis = document.querySelector(".carousel")
btnDerecha = document.querySelector("#btnDerecha")

const carousel = document.querySelector(".carousel")

btnDerecha.addEventListener("click", () => {
  scrollPelis.scrollBy({
      left: carousel.clientWidth,
      behavior: "smooth"
  })
})        

btnIzquierda = document.querySelector("#btnIzquierda")

btnIzquierda.addEventListener("click", () => {
  scrollPelis.scrollBy({
      left: -carousel.clientWidth,
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

const carrito__btn = document.querySelector("#carrito__btn")
carrito__btn.addEventListener("click", carrito)

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

//________________DETALLES_____________

function mostrarDetalles(title, poster_path, overview, vote_average){

  const descripcion = document.createElement("section")
  descripcion.classList.add("descripcion")
  
  const descripcion__div = document.createElement("div")
  descripcion__div.classList.add("descripcionTarjeta")
  
  const descripcion__foto = document.createElement("img")
  descripcion__foto.classList.add("descripcionFoto")
  descripcion__foto.src = IMG_URL + poster_path
  descripcion__foto.alt = title
  
  const descripcion__tituloDesc = document.createElement("div")
  descripcion__tituloDesc.classList.add("descripcion__tituloDesc")
  
  const descripcion__TyC = document.createElement("div")
  descripcion__TyC.classList.add("tituloycarro")
  
  const div__titulo = document.createElement("div")
  div__titulo.classList.add("div__titulo")
  const descripcion__titulo = document.createElement("h3")
  descripcion__titulo.classList.add("descTitle")
  descripcion__titulo.innerHTML = title
  const descripcion__vote = document.createElement("span")
  descripcion__vote.classList.add("vote_average")
  descripcion__vote.innerHTML = vote_average
  vote_average < 5 ? descripcion__vote.classList.add("vote__red") : vote_average < 8 ? descripcion__vote.classList.add("vote__oranje") : descripcion__vote.classList.add("vote__green")
  //logo
  const section__carrito = document.createElement("section")
  section__carrito.classList.add("section__carrito")
  const div__carrito = document.createElement("div")
  div__carrito.classList.add("divCarrito")
  const añadiralcarro = document.createElement("button")
  añadiralcarro.classList.add("header__btn")
  añadiralcarro.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#da0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>`

  const descripcion__texto__div = document.createElement("div")
  descripcion__texto__div.classList.add("descripcion__texto__div")
  const descripcion__texto = document.createElement("p")
  descripcion__texto.classList.add("descripcionTexto")
  descripcion__texto.innerHTML = overview
  
  descripcion__div.appendChild(descripcion__foto)
  descripcion__div.appendChild(descripcion__tituloDesc)
  descripcion__tituloDesc.appendChild(descripcion__TyC)
  descripcion__texto__div.appendChild(descripcion__texto)
  descripcion__tituloDesc.appendChild(descripcion__texto__div)
  div__titulo.appendChild(descripcion__titulo)
  section__carrito.appendChild(descripcion__vote)
  descripcion__TyC.appendChild(div__titulo)
  section__carrito.appendChild(div__carrito)
  div__carrito.appendChild(añadiralcarro)
  descripcion__TyC.appendChild(section__carrito)

  document.body.appendChild(descripcion)
  document.body.appendChild(descripcion__div)

  descripcion.addEventListener("click", () => {
    descripcion.classList.add("display--none")
    descripcion__div.classList.remove("descripcionTarjeta")
    descripcion__div.classList.add("display--none")
  })

  div__carrito.addEventListener("click", () => {
    carritoPeliculas = JSON.parse(localStorage.getItem("carritoPeliculas"))
    if(carritoPeliculas.some(peli => peli.title == title)){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Este titulo ya se encuentra en el carrito'
      })
    }else{
    carritoPeliculas = JSON.parse(localStorage.getItem("carritoPeliculas"))
    carritoPeliculas.push({"title": title, "foto": poster_path, "val": vote_average})
    localStorage.setItem("carritoPeliculas", JSON.stringify(carritoPeliculas))
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Añadido exitosamente al carrito'
    })
    }
  })

}

//________________CARRITO_____________

let carritoPeliculas = []
localStorage.setItem("carritoPelis", JSON.stringify(carritoPeliculas))
let precioTotal = 0

function carrito(){
  console.log(carritoPeliculas)
  const tapaTodo = document.createElement("section")
  tapaTodo.classList.add("tapaTodo")

  const section__aside = document.createElement("section")
  section__aside.classList.add("sectionaside")
  const carrito__aside = document.createElement("aside")
  carrito__aside.classList.add("aside")
  const carrito__title = document.createElement("h3")
  carrito__title.classList.add("carrito__title")
  carritoPeliculas = JSON.parse(localStorage.getItem("carritoPeliculas"))
  carrito__title.innerHTML = `Carrito (${carritoPeliculas.length})`
  const aside__ul = document.createElement("ul")
  aside__ul.classList.add("aside__ul")
  if(carritoPeliculas.length != 0){
    carritoPeliculas.forEach(element => {
      const aside__li = document.createElement("li")
      aside__li.classList.add("aside__li")
      const ul__img = document.createElement("img")
      ul__img.classList.add("ul__img")
      ul__img.width = 50
      ul__img.alt = element.title
      ul__img.src = IMG_URL + element.foto
      const ul__title = document.createElement("h3")
      ul__title.classList.add("ul__title")
      ul__title.innerHTML = element.title
      const ul__span = document.createElement("span")
      ul__span.classList.add("ul__span")
      ul__span.innerHTML = element.val + "$"
      const ul__div__btn = document.createElement("div")
      ul__div__btn.classList.add("ul__div__btn")
      const ul__btn = document.createElement("button")
      ul__btn.classList.add("ul__btn")
      ul__btn.innerHTML = "Eliminar"

      ul__btn.addEventListener("click", () => {

        carritoPeliculas = JSON.parse(localStorage.getItem("carritoPeliculas"))
        carritoPeliculas.forEach((peli, idx) => {
          if(peli.title == element.title){
            carritoPeliculas.splice(idx, 1);
            localStorage.setItem("carritoPeliculas", JSON.stringify(carritoPeliculas))
            precioTotal = 0
            tapaTodo.classList.add("display--none")
            section__aside.classList.add("display--none")
            carrito__aside.classList.add("display--none")
            carrito__aside.classList.remove("aside")
            carrito()
          }
        })

      })

      ul__div__btn.appendChild(ul__btn)
      aside__li.appendChild(ul__img)
      aside__li.appendChild(ul__title)
      aside__li.appendChild(ul__span)
      aside__li.appendChild(ul__div__btn)
      aside__ul.appendChild(aside__li)

      precioTotal += element.val
    });
  }else{
    aside__ul.innerHTML = `<h3 class="carrito__title">Su carrito esta vacío</h3>`
  }

  const total__div = document.createElement("div")
  total__div.classList.add("total__div")
  const total__div__precio = document.createElement("div")
  total__div__precio.classList.add("total__div__precio")
  const total__title = document.createElement("h3")
  total__title.classList.add("total__title")
  total__title.innerHTML = "Precio Total:"
  const precio__total = document.createElement("span")
  precio__total.classList.add("precio__total")
  precio__total.innerHTML = precioTotal.toFixed(1)
  total__div__precio.appendChild(total__title)
  total__div__precio.appendChild(precio__total)
  const borrar__compras__div = document.createElement("div")
  borrar__compras__div.classList.add("borrar__compras__div")
  const borrar__compras = document.createElement("button")
  borrar__compras.classList.add("borrar__compras")
  borrar__compras.innerHTML = "Borrar"

  borrar__compras__div.addEventListener("click", () => {
    carritoPeliculas = []
    localStorage.setItem("carritoPeliculas", JSON.stringify(carritoPeliculas))
    precioTotal = 0
    tapaTodo.classList.add("display--none")
    section__aside.classList.add("display--none")
    carrito__aside.classList.add("display--none")
    carrito__aside.classList.remove("aside")
    carrito()
    })

  borrar__compras__div.appendChild(borrar__compras)

  total__div.appendChild(total__div__precio)
  total__div.appendChild(borrar__compras__div)

  carrito__aside.appendChild(carrito__title)
  carrito__aside.appendChild(aside__ul)
  carrito__aside.appendChild(total__div)

  section__aside.appendChild(carrito__aside)

  document.body.appendChild(tapaTodo)
  document.body.appendChild(section__aside)

  tapaTodo.addEventListener("click", () => {
    tapaTodo.classList.add("display--none")
    section__aside.classList.add("display--none")
    carrito__aside.classList.add("display--none")
    carrito__aside.classList.remove("aside")

  })
}