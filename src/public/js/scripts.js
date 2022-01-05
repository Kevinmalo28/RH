//Variables globales
var nombre = "";
var apellido = "";
var usuario = "";
var pass_1 = "";
var pass_2 = "";

function soloLectura(){
    document.getElementById("usuario").readOnly = true;
}

function formatearUsuario(){
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellido").value;
    usuario = document.getElementById("usuario").value;

    if(nombre == "" & apellido == ""){ //Los campos Nombre y Apellido estan vacíos
        alert("Rellene los campos \"Nombre\" y \"Apellido\" para continuar...");
    }
    else if(nombre == "" & apellido != ""){ //El campo Nombre esta vacío pero Apellido no
        alert("Falta rellenar el campo \"Nombre\" para continuar...");
    }
    else if(nombre != "" & apellido == ""){ //El campo apellido esta vacío pero Nombre no
        alert("Falta rellenar el campo \"Apellido\" para continuar...");
    }
    else if(nombre != "" & apellido != ""){ //Si los campos no estan vacíos
        document.getElementById("nombre").value = nombre.toLowerCase();
        document.getElementById("apellido").value = apellido.toLowerCase();
        usuarioFormateado = nombre.substring(0,1).toLowerCase() + "." + apellido.toLowerCase();
        document.getElementById("usuario").value = usuarioFormateado; //Asignamos el valor al input
    }
}

function obtenerDatos(){
    //Capturar los datos del formulario
    pass_1 = document.getElementById("contraseña_1").value;
    pass_2 = document.getElementById("contraseña_2").value;
    comprobar(pass_1, pass_2);
}

function comprobar(datoPass_1, datoPass_2){
    //Vomprobar que sean diferentes
    if(datoPass_1 != datoPass_2){
        alert("Las contraseñas no coinciden!");
        return true;
    } else if(datoPass_1.length < 5){ //Comprobar que la contraseña tenga menos de 5 caracteres
        alert("La contraseña es demasiado corta");
        return true;
    } else {
        return false;
    }
}

function compobarFecha(){
    var desde = document.getElementById("desde").value;
    var hasta = document.getElementById("hasta").value;

    if(hasta < desde){
        alert("El periodo seleccionado es incorrecto!");
    }
}

var msg = "";
//Expresiones regulares
expr = /^[a-zA-Z0-9\_\.\-]+\@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]{2,4}$/;
expr_celular = /^(09)[0-9]{8}$/;
solo_letras = /^([a-zA-Z]{0,25}[\s]{1}([a-zA-Z]{0,25})?)$/;

function validarFormulario() {
    nombres = document.getElementById("nombres").value;
    apellidos = document.getElementById("apellidos").value;
    r_nombres = document.getElementById("r-nombres").value;
    r_apellidos = document.getElementById("r-apellidos").value;
    r_parentesco = document.getElementById("r-parentesco").value;
    correo = document.getElementById("correo").value;
    r_correo = document.getElementById("r-correo").value;
    celular = document.getElementById("celular").value;
    r_celular = document.getElementById("r-celular").value;
    f_inicio_1 = document.getElementById("f-inicio-1").value;
    f_fin_1 = document.getElementById("f-fin-1").value;
    f_inicio_2 = document.getElementById("f-inicio-2").value;
    f_fin_2 = document.getElementById("f-fin-2").value;
    f_inicio_c_1 = document.getElementById("f-inicio-c-1").value;
    f_fin_c_1 = document.getElementById("f-fin-c-1").value;
    f_inicio_c_2 = document.getElementById("f-inicio-c-2").value;
    f_fin_c_2 = document.getElementById("f-fin-c-2").value;

    validarLetras(solo_letras, nombres, 1);
    validarLetras(solo_letras, apellidos, 2);
    validarLetras(solo_letras, r_nombres, 3);
    validarLetras(solo_letras, r_apellidos, 4);
    validarLetras(solo_letras, r_parentesco, 5);
    validarCorreo(expr, correo);
    validarCorreo(expr, r_correo);
    validarCelular(expr_celular, celular, 1);
    validarCelular(expr_celular, r_celular, 2);
    validarFechas(f_inicio_1, f_fin_1, 1);
    validarFechas(f_inicio_2, f_fin_2, 2);
    validarFechas(f_inicio_c_1, f_fin_c_1, 3);
    validarFechas(f_inicio_c_2, f_fin_c_2, 4);
}

function validarCorreo(datoExpresion, datoCorreo){
    if (!datoExpresion.test(datoCorreo))
        alert("Error: La dirección de correo \"" + datoCorreo + "\" es incorrecta.");
}

function validarFechas(inicio, fin, id){
    if(id == 1){
        msg = "Estudios realizados 1";
    } else if(id == 2){
        msg = "Estudios realizados 2";
    } else if(id == 3){
        msg = "Experiencia laboral 1";
    } else if(id == 4){
        msg = "Experiencia laboral 2";
    }
    if(inicio > fin){
        alert("Las fechas de \"" + msg + "\" son incorrectas");
    }
}
function validarCelular(datoExpresion, datoNumero, id){
    if(id == 1){
        msg = "personal";
    } else if(id == 2){
        msg = "de la referencia";
    }
    if(!datoExpresion.test(datoNumero)){
        alert("El número celular " + msg + " es incorrecto");
    }
}
function validarLetras(datoExpresion, datoLetra, id){
    if(id == 1){
        msg = "nombres personales";
    } else if(id == 2){
        msg = "apellidos personales";
    } else if(id == 3){
        msg = "nombres de la referencia";
    } else if(id == 4){
        msg = "apellidos de la referencia";
    } else if(id == 5){
        msg = "parentesco de la referencia";
    }
    if(!datoExpresion.test(datoLetra)){
        alert("El campo \"" + msg + "\" es incorrecto");
    }
}

