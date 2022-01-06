function soloLectura() {
  document.getElementById("usuario").readOnly = true;
}

function formatearUsuario() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var usuario = document.getElementById("usuario").value;

  if ((nombre == "") & (apellido == "")) {
    //Los campos Nombre y Apellido estan vacíos
    alert('Rellene los campos "Nombre" y "Apellido" para continuar...');
  } else if ((nombre == "") & (apellido != "")) {
    //El campo Nombre esta vacío pero Apellido no
    alert('Falta rellenar el campo "Nombre" para continuar...');
  } else if ((nombre != "") & (apellido == "")) {
    //El campo apellido esta vacío pero Nombre no
    alert('Falta rellenar el campo "Apellido" para continuar...');
  } else if ((nombre != "") & (apellido != "")) {
    //Si los campos no estan vacíos
    document.getElementById("nombre").value = nombre.toLowerCase();
    document.getElementById("apellido").value = apellido.toLowerCase();
    usuarioFormateado =
      nombre.substring(0, 1).toLowerCase() + "." + apellido.toLowerCase();
    document.getElementById("usuario").value = usuarioFormateado; //Asignamos el valor al input
  }
}

function obtenerDatos() {
  //Capturar los datos del formulario
  var pass_1 = document.getElementById("contraseña_1").value;
  var pass_2 = document.getElementById("contraseña_2").value;
  comprobar(pass_1, pass_2);
}

function comprobar(datoPass_1, datoPass_2) {
  //Vomprobar que sean diferentes
  if (datoPass_1 != datoPass_2) {
    alert("Las contraseñas no coinciden!");
    return true;
  } else if (datoPass_1.length < 5) {
    //Comprobar que la contraseña tenga menos de 5 caracteres
    alert("La contraseña es demasiado corta");
    return true;
  } else {
    return false;
  }
}

function setData() {
  soloLectura();
  cargarUsuarios();
}

function cargarUsuarios() {
  const tbody = document.getElementById("tbody");
  let url = "/post-users";
  let json = JSON.stringify({ accion: "cargar_usuarios" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length >= 1) {
        for (var i = 0; i < data.length; i++) {
          let color_tr = "";
          let btn_estado = "";
          if (data[i].estado == "activo") {
            btn_estado = `<i class="fas fa-toggle-on"  id_user="${data[i].id}" 
                          value="1" onClick="cambiarEstado(this)"></i>`;
          } else {
            btn_estado = `<i class="fas fa-toggle-off"  id_user="${data[i].id}" 
                          value="0" onClick="cambiarEstado(this)"></i>`;
          }
          if (i % 2 == 0) {
            color_tr = `<tr>`;
          } else {
            color_tr = `<tr class="fila-w">`; //Colorear fila blanca
          }
          tbody.innerHTML += `
            ${color_tr}
              <td class="columna-1">
                <i class="fas fa-user-circle img-tabla"></i>
              </td>
              <td class="columna-1">${data[i].id}</td>
              <td class="columna-2">${data[i].nick}</td>
              <td class="columna-3">${data[i].permisos}</td>
              <td class="columna-4 iconos-opciones">
                <i class="fas fa-pen" id="${data[i].id}" onClick="obtenerDatosUsuario(this)"></i>
                ${btn_estado}
              </td>
            </tr>
          `;
        }
      }
    })
    .catch((error) => console.log(error));
}
function crearUsuario(id_accion) {
  let lname = document.getElementById("nombre").value;
  let fname = document.getElementById("apellido").value;
  let user = document.getElementById("usuario").value;
  let pass_1 = document.getElementById("contraseña_1").value;
  let pass_2 = document.getElementById("contraseña_2").value;
  let perm = document.getElementById("permisos").checked;
  if (
    lname != "" &&
    fname != "" &&
    user != "" &&
    pass_1 != "" &&
    pass_2 != ""
  ) {
    let flag_pass = comprobar(pass_1, pass_2);
    if (flag_pass != true) {
      //Contraseñas ingresadas iguales y largas
      if (perm == true) {
        perm = "00002";
      } else {
        perm = "00001";
      }
      let url = "/post-users";
      if (id_accion == "01") {
        //Crear usuario
        let json = JSON.stringify({ accion: "consultar_ultimo_id" });
        fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: json,
        })
          .then((res) => res.text())
          .then((data) => {
            let nuevo_id = ("0000" + (parseInt(data) + 1)).slice(-5);
            if (nuevo_id != "") {
              let nuevo_usuario = JSON.stringify({
                id: nuevo_id,
                permisos: perm,
                nombre: lname,
                apellido: fname,
                nick: user,
                contrasena: pass_1,
                accion: "crear_usuario",
              });
              fetch(url, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: nuevo_usuario,
              })
                .then((res) => res.text())
                .then((data) => {
                  if (data == "true") {
                    window.location.reload();
                  }
                })
                .catch((error) => console.log(error));
            }
          });
      } else {
        //Actualizar usuario
        let id_actualizar = document
          .querySelector("#input_actualizar")
          .getAttribute("id_usuario");
        let json = JSON.stringify({
          id: id_actualizar,
          permisos: perm,
          nombre: lname,
          apellido: fname,
          nick: user,
          contrasena: pass_1,
          accion: "actualizar_usuario",
        });
        fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: json,
        })
          .then((res) => res.text())
          .then((data) => {
            if (data == "true") {
              window.location.reload();
            }
          })
          .catch((error) => console.log(error));
      }
    }
  } else {
    alert("Campos vacíos!");
  }
}
function obtenerDatosUsuario(btn) {
  let id_a_consultar = btn.id;
  let url = "/post-users";
  let json = JSON.stringify({
    id: id_a_consultar,
    accion: "consultar_usuario",
  });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("nombre").value = data[0].nombre;
      document.getElementById("apellido").value = data[0].apellido;
      document.getElementById("usuario").value = data[0].nick;
      if (data[0].permisos == "00002") {
        document.getElementById("permisos").checked = true;
      } else {
        document.getElementById("permisos").checked = false;
      }
      document
        .querySelector("#input_actualizar")
        .setAttribute("id_usuario", data[0].id);
    })
    .catch((error) => console.log(error));
}
function cambiarEstado(btn) {
  let id_cambiar = btn.getAttribute("id_user");
  let value = btn.getAttribute("value");
  let url = "/post-users";
  let json = JSON.stringify({
    id: id_cambiar,
    estado: value,
    accion: "cambiar_estado_usuario",
  });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.text())
    .then((data) => {
      if (data == "true") {
        window.location.reload();
      }
    })
    .catch((error) => console.log(error));
}
