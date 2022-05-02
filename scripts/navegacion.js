
function peliculas(categoria, titulo, precio, foto){
    this.categoria = categoria;
    this.titulo = titulo;
    this.precio = precio;
    this.foto = foto;
}

const pelicula1 = new peliculas({categoria: "PERROS", titulo: "Perro Romantico", precio: 10, foto: `./assets/images/perroRomantico.jpg`});
const pelicula2 = new peliculas({categoria: "PERROS", titulo: "Perro Gordo", precio: 15, foto: `./assets/images/perroGordo.jpg`});
const pelicula3 = new peliculas({categoria: "PERROS", titulo: "Perro Feo", precio: 5, foto: `./assets/images/marito.jpg`});
const pelicula4 = new peliculas({categoria: "GATOS", titulo: "Gato Gordo", precio: 20, foto: `./assets/images/gatoGordo.jpg`});

categoriaArray = ["PERROS", "GATOS"];
peliculasOrdenadas = [pelicula1, pelicula2, pelicula3, pelicula4];

for(let i = 0; i < categoriaArray.length; i++){
    div__categorias.innerHTML += `<h2 class="main__section__title">${categoriaArray[i]}</h2><div id="cat_peliculas" class="main__section__div"></div>`
    cat_peliculas.innerHTML += `<button class="header__btn"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#DA0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>`
    for(let j = 0; j < peliculasOrdenadas.length; j++){
        if(peliculasOrdenadas[j].categoria.categoria == categoriaArray[i]){
        cat_peliculas.innerHTML += 
                `
                <button class="header__btn">
                <div class="card__div"><img class="card__img" src="${peliculasOrdenadas[j].categoria.foto}" width="250" alt="Foto de un ${peliculasOrdenadas[j].categoria.titulo}"></div>
                <h3 class="card__title">${peliculasOrdenadas[j].categoria.titulo}</h3>
                </button>
                `
           }
    }
    cat_peliculas.innerHTML += `<button class="header__btn"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#DA0037" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>`
}

