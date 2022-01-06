var msg = "";
//Expresiones regulares
expr = /^[a-zA-Z0-9\_\.\-]+\@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]{2,4}$/;
expr_celular = /^(09)[0-9]{8}$/;
solo_letras = /^([a-zA-Z]{0,25}[\s]{1}([a-zA-Z]{0,25})?)$/;

function validarFormulario() {
  //Información personal
  nombres = document.getElementById("nombres").value;
  apellidos = document.getElementById("apellidos").value;
  sexo = document.getElementById("sexo").value;
  estado_civil = document.getElementById("estado-civil").value;
  f_nacimiento = document.getElementById("fecha-nacimiento").value;
  celular = document.getElementById("celular").value;
  correo = document.getElementById("correo").value;
  direccion = document.getElementById("direccion").value;
  nacionalidad = document.getElementById("nacionalidad").value;
  escolaridad = document.getElementById("escolaridad").value;
  //Estudios realizados
  n_institucion_1 = document.getElementById("n-institucion-1").value;
  titulo_obt_1 = document.getElementById("t-obtenido-1").value;
  f_inicio_1 = document.getElementById("f-inicio-1").value;
  f_fin_1 = document.getElementById("f-fin-1").value;
  //Referencia personal
  r_nombres = document.getElementById("r-nombres").value;
  r_apellidos = document.getElementById("r-apellidos").value;
  r_correo = document.getElementById("r-correo").value;
  r_parentesco = document.getElementById("r-parentesco").value;
  r_celular = document.getElementById("r-celular").value;
  r_direccion = document.getElementById("r-direccion").value;
  //Datos del empleo solicitado
  cargo = document.getElementById("cargo").value;
  departamento = document.getElementById("departamento").value;
  //Experiancia laboral
  n_compania_1 = document.getElementById("n-compania-1").value;
  c_desempeniado_1 = document.getElementById("c-desempeniado-1").value;
  f_inicio_c_1 = document.getElementById("f-inicio-c-1").value;
  f_fin_c_1 = document.getElementById("f-fin-c-1").value;

  let alerta = "";
  alerta += validarLetras(solo_letras, nombres, 1);
  alerta += validarLetras(solo_letras, apellidos, 2);
  alerta += validarLetras(solo_letras, r_nombres, 3);
  alerta += validarLetras(solo_letras, r_apellidos, 4);
  alerta += validarCorreo(expr, correo);
  alerta += validarCorreo(expr, r_correo);
  alerta += validarCelular(expr_celular, celular, 1);
  alerta += validarCelular(expr_celular, r_celular, 2);
  alerta += validarFechas(f_inicio_1, f_fin_1, 1);
  alerta += validarFechas(f_inicio_c_1, f_fin_c_1, 3);
  alerta += validarSelect(sexo, 1);
  alerta += validarSelect(estado_civil, 2);
  alerta += validarSelect(nacionalidad, 3);
  alerta += validarSelect(escolaridad, 4);
  alerta += validarSelect(cargo, 5);
  alerta += validarSelect(departamento, 6);
  if (alerta.length >= 1) {
    alert(alerta);
  }

  //Verificar que los campos requeridos no esten vacíos
  if (
    alerta.length >= 1 ||
    nombres == "" ||
    apellidos == "" ||
    sexo == "" ||
    estado_civil == "" ||
    f_nacimiento == "" ||
    celular == "" ||
    correo == "" ||
    direccion == "" ||
    nacionalidad == "" ||
    escolaridad == "" ||
    n_institucion_1 == "" ||
    titulo_obt_1 == "" ||
    f_inicio_1 == "" ||
    f_fin_1 == "" ||
    r_nombres == "" ||
    r_apellidos == "" ||
    r_correo == "" ||
    r_parentesco == "" ||
    r_celular == "" ||
    r_direccion == "" ||
    cargo == "" ||
    departamento == "" ||
    n_compania_1 == "" ||
    c_desempeniado_1 == "" ||
    f_inicio_c_1 == "" ||
    f_fin_c_1 == ""
  ) {
    alert("Campos obligatorios vacíos!");
  } else {
    let url = "/post-persons";
    let json = JSON.stringify({ accion: "consultar_ultimo_id_persona" });
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: json,
    })
      .then((res) => res.text())
      .then((data) => {
        let nuevo_id = ("0000" + (parseInt(data) + 1)).slice(-5);
        let json = JSON.stringify({
          id: nuevo_id,
          data_nombres: nombres,
          data_apellidos: apellidos,
          data_sexo: sexo,
          data_estado_civil: estado_civil,
          data_f_nacimiento: formatData(f_nacimiento),
          data_celular: celular,
          data_data_correo: correo,
          data_direccion: direccion,
          data_nacionalidad: nacionalidad,
          data_escolaridad: escolaridad,
          data_n_institucion_1: n_institucion_1,
          data_titulo_obt_1: titulo_obt_1,
          data_f_inicio_1: formatData(f_inicio_1),
          data_f_fin_1: formatData(f_fin_1),
          data_r_nombres: r_nombres,
          data_r_apellidos: r_apellidos,
          data_r_correo: r_correo,
          data_r_parentesco: r_parentesco,
          data_r_celular: r_celular,
          data_r_direccion: r_direccion,
          data_cargo: cargo,
          data_departamento: departamento,
          data_n_compania_1: n_compania_1,
          data_c_desempeniado_1: c_desempeniado_1,
          data_f_inicio_c_1: formatData(f_inicio_c_1),
          data_f_fin_c_1: formatData(f_fin_c_1),
          data_tipo: "00001",
          accion: "crear_vacante",
        });
        fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: json,
        })
          .then((res) => res.text())
          .then((data) => alert(data))
          .catch((error) => console.log(error));
      });
  }
}

function formatData(value) {
  let year = value.substring(0, 4);
  let month = value.substring(5, 7);
  let day = value.substring(8, 10);
  return year + "/" + month + "/" + day;
}

function validarSelect(valueSelect, id) {
  let msg = "";
  if (id == 1) {
    msg = "un sexo";
  } else if (id == 2) {
    msg = "un estado civil";
  } else if (id == 3) {
    msg = "una nacionalidad";
  } else if (id == 4) {
    msg = "una escolaridad";
  } else if (id == 5) {
    msg = "un cargo";
  } else if (id == 6) {
    msg = "un departamento";
  }
  if (valueSelect == "00000") {
    return "  -  Debe seleccionar " + msg + " para la persona. \n";
  } else {
    return "";
  }
}

function validarCorreo(datoExpresion, datoCorreo) {
  if (!datoExpresion.test(datoCorreo)) {
    if (datoCorreo == "") {
      datoCorreo = "null";
    }
    return '  -  La dirección de correo "' + datoCorreo + '" es incorrecta. \n';
  } else {
    return "";
  }
}

function validarFechas(inicio, fin, id) {
  if (id == 1) {
    msg = "Estudios realizados 1";
  } else if (id == 2) {
    msg = "Estudios realizados 2";
  } else if (id == 3) {
    msg = "Experiencia laboral 1";
  } else if (id == 4) {
    msg = "Experiencia laboral 2";
  }
  if (inicio == "") {
    inicio = "null";
  }
  if (inicio > fin) {
    return '  -  Las fechas de "' + msg + '" son incorrectas. \n';
  } else {
    return "";
  }
}
function validarCelular(datoExpresion, datoNumero, id) {
  if (id == 1) {
    msg = "personal";
  } else if (id == 2) {
    msg = "de la referencia";
  }
  if (!datoExpresion.test(datoNumero)) {
    return "  -  El número de celular " + msg + " es incorrecto. \n";
  } else {
    return "";
  }
}
function validarLetras(datoExpresion, datoLetra, id) {
  if (id == 1) {
    msg = "nombres personales";
  } else if (id == 2) {
    msg = "apellidos personales";
  } else if (id == 3) {
    msg = "nombres de la referencia";
  } else if (id == 4) {
    msg = "apellidos de la referencia";
  }
  if (!datoExpresion.test(datoLetra)) {
    return '  -  El campo "' + msg + '" es incorrecto. \n';
  } else {
    return "";
  }
}
