let password = ""
let mode = "nightMode"

do{
    if(password == ""){
        password = prompt("Ingrese una contraseña (streamdungeon)");
    }else{
        password = prompt("la contraseña ingresada es incorrecta, intente de nuevo (streamdungeon)");
    }
}while(password != "streamdungeon")

