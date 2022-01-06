function getDatos() {
  getPostulantes();
  getCargo();
}
function getPostulantes() {
  let url = "/post-postulantes";
  let json = JSON.stringify({ accion: "cargar_postulantes" });
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
              <td class="columna-2">${ 
                data[i].nombre.substring(0, data[i].nombre.indexOf(" ")) + " " +
                data[i].apellido.substring(0, data[i].apellido.indexOf(" "))
              }</td>
              <td class="columna-3">${data[i].cargo}</td>
              <td class="columna-4">${data[i].celular}</td>
              <td class="columna-5">${data[i].correo}</td>
              <td class="columna-6 iconos-opciones">
                <i class="far fa-eye icono-opcion" onclick="setModalPersona()" data-bs-id="${
                  data[i].id
                }" data-bs-toggle="modal" data-bs-target="#modal_info_persona"></i>
                <i class="fas fa-check-square icono-opcion" id-square="${
                  data[i].id
                }" onclick="contratar(this)"></i>
                <i class="fas fa-trash-alt icono-opcion" id-trash="${
                  data[i].id
                }" onclick="descartarPostulante(this)" ></i>
              </td>
            </tr>
          `;
        }
      }
    })
    .catch((error) => console.log(error));
}
function contratar(btn) {
  let id_contratar = btn.getAttribute("id-square");
  let url = "/post-postulantes";
  let json = JSON.stringify({
    id: id_contratar,
    accion: "contratar_postulante",
  });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.text())
    .then((data) => {
      if(data == "true"){
        window.location.reload();
      }
    })
    .catch((error) => console.log(error));
}
function descartarPostulante(btn) {
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
      if(data == "true"){
        window.location.reload();
      }
    })
    .catch((error) => console.log(error));
}
function getCargo() {
  let url = "/post-postulantes";
  let json = JSON.stringify({ accion: "cargar_cargo" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_cargo = document.querySelector("#cargo");
      for (var i = 0; i < data.length; i++) {
        select_cargo.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
