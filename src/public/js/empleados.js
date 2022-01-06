let modal_cargo = document.getElementById("cambiar-cargo");
let modal_departamento = document.getElementById("cambiar-departamento");
modal_cargo.addEventListener("show.bs.modal", function (event) {
  //Div para poner el id del empleado seleccionado
  var div_title = document.querySelector("#id_title");
  //Obtener los datos del botón
  let icon_bagde = event.relatedTarget;
  //Obtener el atributo id del botón
  let id = icon_bagde.getAttribute("data-bs-id");
  //Insertar el id
  div_title.innerHTML = `<h6>Id del empleado seleccionado: ${id}</h6>`;
  //'Leer' el botón confirmar del modal
  let btn_cambiar_cargo = document.querySelector(
    ".modal-footer #btn_cambiar_cargo"
  );
  //Asignar al atributo id a el botón confirmar del modal
  btn_cambiar_cargo.value = id;
});
modal_departamento.addEventListener("show.bs.modal", function (event) {
  var div_title_departamento = document.querySelector(
    "#id_title_departamento"
  );
  let icon_building = event.relatedTarget;
  let id = icon_building.getAttribute("data-bs-id");
  div_title_departamento.innerHTML = `<h6>Id del empleado seleccionado: ${id}</h6>`;
  let btn_cambiar_departamento = document.querySelector(
    ".modal-footer #btn_cambiar_departamento"
  );
  btn_cambiar_departamento.value = id;
});
function cambiarCargo() {
  //Obtener el id del botón del modal
  let btn_cambiar_cargo =
    document.getElementById("btn_cambiar_cargo").value;
  let select_cargo = document.getElementById("select-cargo").value;
  if (select_cargo == "00000") {
    alert("Error: Debe seleccionar un cargo!");
  } else {
    let url = "/post-empleados";
    let json = JSON.stringify({
      id_empleado: btn_cambiar_cargo,
      id_cargo: select_cargo,
      accion: "cambiar_cargo",
    });
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: json,
    })
      .then((res) => res.text())
      .then((data) => {
        if (data == "ok") {
          window.location.reload();
        } else {
          alert(data);
        }
      })
      .catch((error) => console.log(error));
  }
}
function cambiarDepartamento() {
  //Obtener el id del botón del modal
  let btn_cambiar_departamento = document.getElementById(
    "btn_cambiar_departamento"
  ).value;
  let select_departamento = document.getElementById(
    "select-departamento"
  ).value;
  if (select_departamento == "00000") {
    alert("Error: Debe seleccionar un cargo!");
  } else {
    let url = "/post-empleados";
    let json = JSON.stringify({
      id_empleado: btn_cambiar_departamento,
      id_departamento: select_departamento,
      accion: "cambiar_departamento",
    });
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: json,
    })
      .then((res) => res.text())
      .then((data) => {
        if (data == "ok") {
          window.location.reload();
        } else {
          alert(data);
        }
      })
      .catch((error) => console.log(error));
  }
}
function eliminarEmpleado(btn) {
  let id_descartado = btn.getAttribute("id-trash");
  let url = "/post-postulantes";
  let json = JSON.stringify({
    id: id_descartado,
    accion: "descartar_postulante",
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
function getData() {
  getEmpleados();
  getCargo();
  getDepartamento();
}
function getEmpleados() {
  let url = "/post-empleados";
  let json = JSON.stringify({ accion: "cargar_empleados" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      if (data.length >= 1) {
        //Obtener el tbody de la tabla para los innerHTML
        const tbody = document.querySelector("#tbody");
        //Recorrer todos los datos postulantes) de la respuesta del servidor
        for (var i = 0; i < data.length; i++) {
          let color_tr = "";
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
              <td class="columna-2">${data[i].id}</td>
              <td class="columna-3">${
                data[i].nombre.substring(0, data[i].nombre.indexOf(" ")) +
                " " +
                data[i].apellido.substring(
                  0,
                  data[i].apellido.indexOf(" ")
                )
              }</td>
              <td class="columna-4">${data[i].cargo}</td>
              <td class="columna-5">${data[i].departamento}</td>
              
              <td class="columna-6 iconos-opciones">
                <i class="far fa-eye icono-opcion" onclick="setModalPersona()" data-bs-id="${
                  data[i].id
                }" data-bs-toggle="modal" data-bs-target="#modal_info_persona"></i>
                <i class="fas fa-id-badge icono-opcion" data-bs-id="${
                  data[i].id
                }" data-bs-toggle="modal" data-bs-target="#cambiar-cargo"></i>
                <i class="fas fa-building icono-opcion" data-bs-id="${
                  data[i].id
                }" data-bs-toggle="modal" data-bs-target="#cambiar-departamento"></i>
                <i class="far fa-calendar-alt icono-opcion" id-calendar="${
                  data[i].id
                }"></i>
                <i class="fas fa-trash-alt icono-opcion" id-trash="${
                  data[i].id
                }" onclick="eliminarEmpleado(this)"></i>
              </td>
            </tr>
          `;
        }
      }
    })
    .catch((error) => console.log(error));
}
function getCargo() {
  let url = "/post-persons";
  let json = JSON.stringify({ accion: "cargar_cargo" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_cargo = document.querySelector("#cargo");
      let modal_select_cargo = document.querySelector("#select-cargo");
      for (var i = 0; i < data.length; i++) {
        select_cargo.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
        modal_select_cargo.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
function getDepartamento() {
  let url = "/post-persons";
  let json = JSON.stringify({ accion: "cargar_departamento" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_departamento = document.querySelector(
        "#select-departamento"
      );
      for (var i = 0; i < data.length; i++) {
        select_departamento.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
