function getDatosSelect(){
  getSexos();
  getEstadosCiviles();
  getNacionalidad();
  getEscolaridad();
  getCargo();
  getDepartamento();
}

//Obtener los datos para los select
function getSexos() {
  let url = "/post-persons";
  let json = JSON.stringify({ accion: "cargar_sexos" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_sexo = document.querySelector("#sexo");
      for (var i = 0; i < data.length; i++) {
        select_sexo.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
function getEstadosCiviles() {
  let url = "/post-persons";
  let json = JSON.stringify({ accion: "cargar_estados_civiles" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_estados_civiles =
        document.querySelector("#estado-civil");
      for (var i = 0; i < data.length; i++) {
        select_estados_civiles.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
function getNacionalidad() {
  let url = "/post-persons";
  let json = JSON.stringify({ accion: "cargar_nacionalidad" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_nacionalidad = document.querySelector("#nacionalidad");
      for (var i = 0; i < data.length; i++) {
        select_nacionalidad.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
function getEscolaridad() {
  let url = "/post-persons";
  let json = JSON.stringify({ accion: "cargar_escolaridad" });
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      let select_escolaridad = document.querySelector("#escolaridad");
      for (var i = 0; i < data.length; i++) {
        select_escolaridad.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
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
      for (var i = 0; i < data.length; i++) {
        select_cargo.innerHTML += `
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
      let select_departamento = document.querySelector("#departamento");
      for (var i = 0; i < data.length; i++) {
        select_departamento.innerHTML += `
          <option value="${data[i].id}">${data[i].nombre}</option>
        `;
      }
    })
    .catch((error) => console.log(error));
}
