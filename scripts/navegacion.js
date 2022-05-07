//-------------- Inicializacion de Variables --------------------------------------------------------------------

let etiqueta
let filtros = "off"

//--------------- Objetos y Arrays -------------------------------------------------------------------------------

function peliculas(categoria, titulo, precio, foto){
    this.categoria = categoria;
    this.titulo = titulo;
    this.precio = precio;
    this.foto = foto;
}

const pelicula1 = new peliculas("PERROS", "Perro Romantico", 10, `./assets/images/perroRomantico.jpg`);
const pelicula2 = new peliculas("PERROS", "Perro Gordo", 15, `./assets/images/perroGordo.jpg`);
const pelicula3 = new peliculas("PERROS", "Marito", 5, `./assets/images/marito.jpg`);
const pelicula4 = new peliculas("GATOS", "Gato Gordo", 20, `./assets/images/gatoGordo.jpg`); 
const pelicula5 = new peliculas("GATOS", "Gato Gordo", 20, `./assets/images/gatoGordo.jpg`);
const pelicula6 = new peliculas("GATOS", "Gato Gordo", 20, `./assets/images/gatoGordo.jpg`); 
const pelicula7 = new peliculas("otra categoria", "Gato Gordo", 20, `./assets/images/gatoGordo.jpg`); 

categoriaArray = ["PERROS", "GATOS", "otra categoria"];
peliculasOrdenadas = [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5, pelicula6, pelicula7];

// ------------------ Constructor HTML -------------------------------------------------------------------------------

const biblioteca = document.querySelector("#main__section");

for(i=0;i<categoriaArray.length;i++){
    const div__categorias = document.createElement("div");
    const tituloCategoria = document.createElement("h2");
    tituloCategoria.classList.add("main__section__title");
    tituloCategoria.classList.add("main__section__title--nightMode");

    tituloCategoria.textContent = categoriaArray[i];

    const btn1 = document.createElement("button");
    btn1.classList.add("header__btn")
    btn1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#DA0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`
    const btn2 = document.createElement("button");
    btn2.classList.add("header__btn")
    btn2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#DA0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`

    const sectionCategoria = document.createElement("div");
    sectionCategoria.classList.add("main__section__div");
    sectionCategoria.appendChild(btn1)
    
    for(j = 0; j < peliculasOrdenadas.length; j++){
        if(peliculasOrdenadas[j].categoria == categoriaArray[i]){
            const boton = document.createElement("button");
            boton.classList.add("header__btn")
            
            const card = document.createElement("div");
            card.classList.add("card__div");
            
            const pic = document.createElement("img");
            pic.classList.add("card__img");
            pic.src = peliculasOrdenadas[j].foto;
            pic.width = 250;
            
            const subtitulo = document.createElement("h3");
            subtitulo.classList.add("card__title")
            subtitulo.classList.add("card__title--nightMode")
            subtitulo.textContent = peliculasOrdenadas[j].titulo;
            
            card.appendChild(pic)
            boton.appendChild(card)
            boton.appendChild(subtitulo)
            sectionCategoria.appendChild(boton)
        }
    }
    
    sectionCategoria.appendChild(btn2)
    div__categorias.appendChild(tituloCategoria);
    div__categorias.appendChild(sectionCategoria);
    
    biblioteca.appendChild(div__categorias);
}

// -----------------------------LLamado a Eventos ----------------------

let btn_sol = document.querySelector("#sol");
btn_sol.addEventListener("click", dayTheme) 

let btn_luna = document.querySelector("#luna");
btn_luna.addEventListener("click", nightTheme)

let btn_filtros = document.querySelector("#filtros")
btn_filtros.addEventListener("click", mostrarFiltros)


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