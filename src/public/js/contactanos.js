function validar_contactanos(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var asunto = document.getElementById("asunto").value;
    var descripcion = document.getElementById("descripcion").value;

    if(nombre.length==0 || apellido.length==0 || asunto.length==0 || descripcion.length==0){
        alert("¡Campos vacíos!");
    }
    else{
        alert("Datos enviados correctamente");
    }
}