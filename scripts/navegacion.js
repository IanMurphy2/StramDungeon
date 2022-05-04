let etiqueta
let mode = "dayMode"

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

categoriaArray = ["PERROS", "GATOS"];
peliculasOrdenadas = [pelicula1, pelicula2, pelicula3, pelicula4];

for(let i = 0; i < categoriaArray.length; i++){
    div__categorias.innerHTML += `<h2 class="main__section__title">${categoriaArray[i]}</h2><div id="cat_peliculas" class="main__section__div"></div>`
    cat_peliculas.innerHTML += `<button class="header__btn"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#DA0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>`
    for(let j = 0; j < peliculasOrdenadas.length; j++){
        if(peliculasOrdenadas[j].categoria == categoriaArray[i]){
        cat_peliculas.innerHTML += 
                `
                <button class="header__btn">
                <div class="card__div"><img class="card__img" src="${peliculasOrdenadas[j].foto}" width="250" alt="Foto de un ${peliculasOrdenadas[j].titulo}"></div>
                <h3 class="card__title">${peliculasOrdenadas[j].titulo}</h3>
                </button>
                `
           }
    }
    cat_peliculas.innerHTML += `<button class="header__btn"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#DA0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>`
}

do{
    mode = prompt("Ingrese el modo de la pagina (dayMode / nightMode)")
}while(mode != "dayMode" && mode != "nightMode")

if(mode == "dayMode"){
    etiqueta = document.querySelector("body")
    etiqueta.classList = "body--dayMode"
    etiqueta = document.querySelector(".header__title__span")
    etiqueta.classList.add("header__title__span--dayMode")
    etiqueta = document.querySelectorAll("h1")
    etiqueta.forEach(e => {
        e.classList.add("header__title--dayMode")
    });
    etiqueta = document.querySelectorAll(".card__tilte")
    etiqueta.forEach(e => {
        e.classList.add("card__title--dayMode")
    });
    etiqueta = document.querySelectorAll(".main__section__title")
    etiqueta.forEach(e => {
        e.classList.add("main__section__title--dayMode")
    });

}else{
    etiqueta = document.querySelectorAll("h1")
    etiqueta.forEach(e => {
        e.classList.add("header__title--nightMode")
    });
    etiqueta = document.querySelectorAll(".card__tilte")
    etiqueta.forEach(e => {
        e.classList.add("card__title--nightMode")
    });
    etiqueta = document.querySelectorAll(".main__section__title")
    etiqueta.forEach(e => {
        e.classList.add("main__section__title--nightMode")
    });
}