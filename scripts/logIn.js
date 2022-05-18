const datos = {user: "", pass: ""};

user = document.querySelector("#user")
password = document.querySelector("#pass")
formularioInicio = document.querySelector("#formInicio")

user.addEventListener("input", () => datos.user = event.target.value)

password.addEventListener("input", () => datos.pass = event.target.value)

formularioInicio.addEventListener("submit", () =>{ 
    event.preventDefault();
    datos.user == "Admin" && datos.pass == "Admin" ? mensajeIngresa() : mensajeError()
})

function mensajeIngresa(){
window.location.href = "./presentacion.html"
   // alert("ingresa")
}

function mensajeError(){
    alert("error")
}

registro = document.querySelector("#registro")
registro.addEventListener("click", () => {registrarse()}, {once: true});

function registrarse(){
    const h3 = document.createElement('h3');
    h3.textContent = "Registro";
    const div_user = document.createElement('div');
    const div_pass = document.createElement('div');
    const div_C_pass = document.createElement('div');
    const div_enviar = document.createElement('div');

    innerDiv(div_user,"Usuario","","","text","Ingrese nombre de usuario.","user_imput")
    innerDiv(div_pass,"Contraseña","","","password","Ingrese contraseña.","pass_input")
    innerDiv(div_C_pass,"Confirmación","","","password","Reingrese contraseña","C_pass_input")

    const btn_enviar = document.createElement("button")
    btn_enviar.textContent = "hola"
    div_enviar.appendChild(btn_enviar)

    const formularioRegistro = document.createElement("form")

    formularioRegistro.appendChild(div_user)
    formularioRegistro.appendChild(div_pass)
    formularioRegistro.appendChild(div_C_pass)
    formularioRegistro.appendChild(div_enviar)

    const section_form = document.querySelector(".section__form")
    section_form.appendChild(formularioRegistro)

    formularioInicio.classList.remove("form")
    formularioInicio.classList.add("display--none")
    registro.classList.add("display--none")
    
    
}

function innerDiv(div,mensaje='',clase_lbl='',clase_input='',typeI='', plchldr='',id='' ){
    const label = document.createElement('label');
     const input = document.createElement('input');
 
    label.textContent = mensaje;
    //label.classList.add();
 
    // input.classList.add();
     input.type = typeI;
     input.placeholder = plchldr;
     input.id = id;
 
     div.appendChild(label);
     div.appendChild(input);
 }
