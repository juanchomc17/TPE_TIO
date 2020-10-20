document.addEventListener("DOMContentLoaded",init);



function init() {
  "use strict";

    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let direccion = document.getElementById("direccion");
    let telefono = document.getElementById("telefono");
    let btnValidar = document.getElementById("btnValidar");

    //Cuando saco el foco del input hace el evento blur.
    nombre.addEventListener("blur",validarNombre);
    email.addEventListener("blur",validarEmail);
    direccion.addEventListener("blur",validarDireccion);
    telefono.addEventListener("blur",validarTelefono);

    btnValidar.addEventListener("click",function(event){
        event.preventDefault();
        validar();
    })


function validarNombre() {
    let valorNombre = nombre.value;

    if(valorNombre === ""){
        document.querySelector(".errorNombre").classList.add("avisoError");
        document.getElementById('nombre').focus();
        return false;
    } else {
        document.querySelector(".errorNombre").classList.remove("avisoError");
        return true;
    }
}

function validarEmail() {
    let valorEmail = email.value;

    if(valorEmail === ""){
        document.querySelector(".errorEmail").classList.add("avisoError");
        document.getElementById('email').focus();
        return false;
    } else {
        document.querySelector(".errorEmail").classList.remove("avisoError");
        return true;
    }
}

function validarDireccion() {
    let valorDireccion = direccion.value;

    if (valorDireccion === "") {
        document.querySelector(".errorDireccion").classList.add("avisoError");
        document.getElementById('direccion').focus();
        return false;
    } else {
        document.querySelector(".errorDireccion").classList.remove("avisoError");   
        return true;
    }
}

function validarTelefono() {
    let valorTelefono = telefono.value;

    if (valorTelefono === "") {
        document.querySelector(".errorTelefono").classList.add("avisoError");
        document.getElementById('telefono').focus();
        return false;
    } else {
        document.querySelector(".errorTelefono").classList.remove("avisoError");    
        return true;
    }
}

function validarCaptcha() {
    let captcha = 'J' + 'G' +'A' + 'N' + 'T' + '3';
    let valorCaptcha = document.getElementById("ingresoCaptcha").value;

    if (valorCaptcha === "") {
        document.querySelector(".vacio").classList.add("avisoError");
        document.getElementById('ingresoCaptcha').focus();
        document.querySelector(".error").classList.remove("avisoError");
    } else if (valorCaptcha != captcha) {
        document.querySelector(".vacio").classList.remove("avisoError");
        document.querySelector(".error").classList.add("avisoError");
        document.getElementById('ingresoCaptcha').focus();
    } else {
        document.querySelector(".correcto").classList.add("avisoCorrecto");
        document.querySelector(".vacio").classList.remove("avisoError");
        document.querySelector(".error").classList.remove("avisoError");
        //en un segundo y medio limpio el formulario.   
        setTimeout(limpiarForm,1500);
    }
}

function validar() {
    //controlo que todos los inputs esten completos.
    if (validarNombre() == false) {
        nombre.focus();
    } else if (validarEmail() == false){
        email.focus();
    } else if (validarDireccion() == false){
        direccion.focus();
    } else if (validarTelefono() == false){
        telefono.focus();
    } else {
        validarCaptcha();
    }
}

function limpiarForm() {
    document.getElementById("miForm").reset();
    document.querySelector(".correcto").classList.remove("avisoCorrecto");
}

}
//window.onload = init;
