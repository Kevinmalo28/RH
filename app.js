const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const mysql = require("mysql");
const { json } = require("body-parser");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "recursos_humanos_uleam",
});

conexion.connect((error) => {
  if (error) {
    console.error("Error de conexión: " + error);
    return;
  }
  console.log("Conexión completa a la Base de Datos!");
});

//Inicialización
const app = express();

//Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

//Carpeta estática
app.use(express.static(__dirname + "/src/public"));

//Rutas principales
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/terminos-y-condiciones", (req, res) => {
  res.render("public/terminos-y-condiciones.ejs");
});
app.get("/contactanos", (req, res) => {
  res.render("public/contactanos.ejs");
});
app.get("/sobre-nosotros", (req, res) => {
  res.render("public/sobre-nosotros.ejs");
});
app.get("/ayuda", (req, res) => {
  res.render("public/ayuda.ejs");
});
app.get("/configuraciones", (req, res) => {
  res.render("private/configuraciones.ejs");
});
app.get("/empleados", (req, res) => {
  res.render("private/empleados.ejs");
});
app.get("/formularios", (req, res) => {
  res.render("private/formularios.ejs");
});
app.get("/reportes", (req, res) => {
  res.render("private/reportes.ejs");
});
app.get("/solicitudes", (req, res) => {
  res.render("private/solicitudes.ejs");
});
app.get("/usuarios", (req, res) => {
  res.render("private/usuarios.ejs");
});

//Rutas con respuestas del servidor
app.post("/post-users", (req, res) => {
  res.setHeader("content-type", "text/plain");
  const accion = req.body.accion;
  if (accion == "ingresar") {
    const usuario = req.body.usuario;
    const contraseña = req.body.contrasena;
    conexion.query(
      `select count(id_usuario) as total, nombre_usuario as nombre, apellido_usuario as apellido,
      nombre_permiso as permisos from usuario inner join permiso on usuario.id_permiso = permiso.id_permiso
      where nick_usuario = '${usuario}' and contrasena_usuario = '${contraseña}' and estado_usuario = 'activo';`,
      (err, rows) => {
        res.send("" + rows[0].total); //Retornamos la respuesta de la base de datos
        if (rows[0].total >= 1) {
          //Existe el usuario
          var json = JSON.stringify({
            lname: rows[0].nombre.charAt(0).toUpperCase() + rows[0].nombre.slice(1),
            fname: rows[0].apellido.charAt(0).toUpperCase() +
              rows[0].apellido.slice(1),
            permisos: rows[0].permisos.charAt(0).toUpperCase() +
              rows[0].permisos.slice(1),
          });
          json = "[" + json + "]"; //Formato para que pueda ser leído
          var file = fs.writeFileSync("./src/public/json/usuario.json", json);
        }
      }
    );
  } else if (accion == "cargar_usuarios") {
    conexion.query(
      "select id_usuario as id, nick_usuario as nick, nombre_permiso as permisos, estado_usuario " +
        "as estado from usuario inner join permiso on usuario.id_permiso = permiso.id_permiso;",
      (err, rows) => {
        if(!err){
          res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
        }
      }
    );
  } else if (accion == "consultar_ultimo_id") {
    conexion.query(
      "select id_usuario as id from usuario order by id_usuario desc limit 1;",
      (err, rows) => {
        res.send(rows[0].id); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "crear_usuario") {
    const id = req.body.id;
    const permisos = req.body.permisos;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nick = req.body.nick;
    const contrasena = req.body.contrasena;
    conexion.query(
      `insert into usuario values ('${id}', '00002', '${permisos}', '${nombre}', 
      '${apellido}', '${nick}', '${contrasena}', 'activo')`,
      (err, rows) => {
        if(!err) {
          res.send("true"); //Se registro el usuario en la Base de Datos
        }
      }
    );
  } else if (accion == "consultar_usuario") {
    const id = req.body.id;
    conexion.query(
      `select id_usuario as id, nombre_usuario as nombre, apellido_usuario as apellido,
      nick_usuario as nick, id_permiso as permisos from usuario where id_usuario = '${id}';`,
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "actualizar_usuario") {
    const id = req.body.id;
    const permisos = req.body.permisos;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nick = req.body.nick;
    const contrasena = req.body.contrasena;
    conexion.query(
      `update usuario set id_permiso = '${permisos}', nombre_usuario = '${nombre}', 
      apellido_usuario = '${apellido}', nick_usuario = '${nick}', contrasena_usuario = '${contrasena}' 
      where id_usuario = '${id}'`,
      (err, rows) => {
        if (!err) {
          res.send("true"); //Se actualizó el usuario en la Base de Datos
        }
      }
    );
  } else if (accion == "cambiar_estado_usuario") {
    const id = req.body.id;
    let estado = req.body.estado;
    if (estado == 1) {
      estado = "inactivo";
    } else {
      estado = "activo";
    }
    conexion.query(
      `update usuario set estado_usuario = '${estado}' where id_usuario = '${id}'`,
      (err, rows) => {
        if (err) {
          res.send("false"); //No se ha echo el cambio de estado
        } else {
          res.send("true"); //Se realizo el cambio de estado
        }
      }
    );
  }
});

//Tabla persona
app.post("/post-persons", (req, res) => {
  res.setHeader("content-type", "text/plain");
  const accion = req.body.accion;
  if (accion == "consultar_ultimo_id_persona") {
    conexion.query(
      "select id_persona as id from persona order by id_persona desc limit 1;",
      (err, rows) => {
        res.send("" + rows[0].id); //Retornamos la respuesta de la base de datos
      }
    );
    //conexion.end();
  } else if (accion == "cargar_sexos") {
    conexion.query(
      "select id_sexo as id, nombre_sexo as nombre from sexo order by id_sexo;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "cargar_estados_civiles") {
    conexion.query(
      "select id_estado as id, nombre_estado as nombre from estado_civil order by id_estado;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "cargar_nacionalidad") {
    conexion.query(
      "select id_nacionalidad as id, nombre_nacionalidad as nombre from nacionalidad order by id_nacionalidad;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "cargar_escolaridad") {
    conexion.query(
      "select id_escolaridad as id, nombre_escolaridad as nombre from escolaridad order by id_escolaridad;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "cargar_cargo") {
    conexion.query(
      "select id_cargo as id, nombre_cargo as nombre from cargo order by id_cargo;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "cargar_departamento") {
    conexion.query(
      "select id_departamento as id, nombre_departamento as nombre from departamento order by id_departamento;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "crear_vacante") {
    nuevo_id = req.body.id;
    nombres = req.body.data_nombres;
    apellidos = req.body.data_apellidos;
    sexo = req.body.data_sexo;
    estado_civil = req.body.data_estado_civil;
    f_nacimiento = req.body.data_f_nacimiento;
    celular = req.body.data_celular;
    correo = req.body.data_data_correo;
    direccion = req.body.data_direccion;
    nacionalidad = req.body.data_nacionalidad;
    escolaridad = req.body.data_escolaridad;
    n_institucion = req.body.data_n_institucion_1;
    titulo_obt = req.body.data_titulo_obt_1;
    f_inicio = req.body.data_f_inicio_1;
    f_fin = req.body.data_f_fin_1;
    r_nombres = req.body.data_r_nombres;
    r_apellidos = req.body.data_r_apellidos;
    r_correo = req.body.data_r_correo;
    r_parentesco = req.body.data_r_parentesco;
    r_celular = req.body.data_r_celular;
    r_direccion = req.body.data_r_direccion;
    cargo = req.body.data_cargo;
    departamento = req.body.data_departamento;
    n_compania = req.body.data_n_compania_1;
    c_desempeniado = req.body.data_c_desempeniado_1;
    f_inicio_c = req.body.data_f_inicio_c_1;
    f_fin_c = req.body.data_f_fin_c_1;
    tipo = req.body.data_tipo;

    //Flag para verificar que el usuario fue creado correctamente
    let flagError = false;

    //Insertar los datos en la DB
    conexion.query(
      `insert into estudios values 
      ('${nuevo_id}', '${n_institucion}', '${titulo_obt}', '${f_inicio}', '${f_fin}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    conexion.query(
      `insert into referencia values
      ('${nuevo_id}', '${r_nombres}', '${r_apellidos}', '${r_correo}', '${r_parentesco}', 
      '${r_celular}', '${r_direccion}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    conexion.query(
      `insert into experiencia_laboral values
      ('${nuevo_id}', '${n_compania}', '${c_desempeniado}', '${f_inicio_c}', '${f_fin_c}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    conexion.query(
      `insert into persona values
      ('${nuevo_id}', '${sexo}', '${estado_civil}', '${nacionalidad}', '${escolaridad}', '${cargo}', 
      '${departamento}', '${tipo}', '${nombres}', '${apellidos}', '${f_nacimiento}', '${celular}', 
      '${correo}', '${direccion}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    conexion.query(
      `insert into persona_estudios values ('${nuevo_id}', '${nuevo_id}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    conexion.query(
      `insert into persona_referencia values ('${nuevo_id}', '${nuevo_id}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    conexion.query(
      `insert into persona_experiencia values ('${nuevo_id}', '${nuevo_id}');`,
      (err, rows) => {
        if (err) {
          flagError = true;
          console.log("Error: " + err);
        }
      }
    );
    if (flagError != true) {
      res.send("Postulante registrado correctamente en la Base de Datos!");
    }
  }
});

//Tabla postulantes
app.post("/post-postulantes", (req, res) => {
  res.setHeader("content-type", "text/plain");
  const accion = req.body.accion;
  if (accion == "cargar_postulantes") {
    conexion.query(
      `select id_persona as id, nombre_persona as nombre, apellido_persona as apellido, nombre_cargo as cargo, 
      celular_persona as celular, correo_persona as correo from persona inner join cargo on 
      persona.id_cargo = cargo.id_cargo where id_tipo = '00001' order by id_persona;`,
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if (accion == "contratar_postulante"){
    const id = req.body.id;
    conexion.query(
      `update persona set id_tipo='00002' where id_persona='${id}'`,
      (err, rows) => {
        if(!err){
          res.send("true"); //Se contrató el postulante
        }
      }
    );
  }
  else if (accion == "descartar_postulante"){
    const id = req.body.id;
    conexion.query(`delete from persona_referencia where id_persona='${id}'`);
    conexion.query(`delete from persona_experiencia where id_persona='${id}'`);
    conexion.query(`delete from persona_estudios where id_persona='${id}'`);
    conexion.query(`delete from referencia where id_referencia='${id}'`);
    conexion.query(`delete from experiencia_laboral where id_experiencia='${id}'`);
    conexion.query(`delete from estudios where id_estudio='${id}'`);
    conexion.query(`delete from persona where id_persona='${id}'`);
    res.send("true"); //Se descartó el postulante
  } else if (accion == "cargar_cargo") {
    conexion.query(
      "select id_cargo as id, nombre_cargo as nombre from cargo order by id_cargo;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  }
});

//Tabla empleados
app.post("/post-empleados", (req, res) => {
  res.setHeader("content-type", "text/plain");
  const accion = req.body.accion;
  if (accion == "cargar_empleados") {
    conexion.query(
      `select id_persona as id, nombre_persona as nombre, apellido_persona as apellido, nombre_cargo as cargo, 
      nombre_departamento as departamento from persona inner join cargo on 
      persona.id_cargo = cargo.id_cargo inner join departamento on 
      persona.id_departamento = departamento.id_departamento where id_tipo = '00002' order by id_persona;`,
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  } else if(accion == "cambiar_cargo"){
    const id_empleado = req.body.id_empleado;
    const id_cargo = req.body.id_cargo;
    conexion.query(
      `update persona set id_cargo = '${id_cargo}' where id_persona = '${id_empleado}'`,
      (err, rows) => {
        if (err) {
          res.send("" + err);
        } else {
          res.send("ok");
        }
      }
    );
  } else if(accion == "cambiar_departamento"){
    const id_empleado = req.body.id_empleado;
    const id_departamento = req.body.id_departamento;
    conexion.query(
      `update persona set id_departamento = '${id_departamento}' where id_persona = '${id_empleado}'`,
      (err, rows) => {
        if (err) {
          res.send("" + err);
        } else {
          res.send("ok");
        }
      }
    );
  }
});


//Modal persona (Postulantes o empleados)
app.post("/post-persona", (req, res) => {
  res.setHeader("content-type", "text/plain");
  const accion = req.body.accion;
  if (accion == "set_modal_persona") {
    const id = req.body.id;
    conexion.query(
      `select persona.id_persona as id, nombre_sexo as sexo, nombre_nacionalidad as nacionalidad, 
      nombre_escolaridad as escolaridad, nombre_cargo as cargo, nombre_departamento as departamento, 
      nombre_persona as nombres, apellido_persona as apellidos, fecha_nacimiento_persona as f_nacimiento, 
      celular_persona as celular, correo_persona as correo, direccion_persona as direccion, 
      referencia.id_referencia as id_r, nombre_referencia as nombre_r, apellido_referencia as apellido_r, 
      correo_referencia as correo_r, celular_referencia as celular_r, direccion_referencia as direccion_r, 
      nombre_institucion as institucion, titulo_obtenido as titulo, fecha_inicio_estudio as f_inicio, 
      fecha_fin_estudio as f_fin from persona 
      inner join sexo on persona.id_sexo = sexo.id_sexo
      inner join nacionalidad on persona.id_nacionalidad = nacionalidad.id_nacionalidad
      inner join escolaridad on persona.id_escolaridad = escolaridad.id_escolaridad
      inner join cargo on persona.id_cargo = cargo.id_cargo
      inner join departamento on persona.id_departamento = departamento.id_departamento
      inner join persona_referencia on persona.id_persona = persona_referencia.id_persona 
      inner join referencia on persona_referencia.id_referencia = referencia.id_referencia
      inner join persona_estudios on persona.id_persona = persona_estudios.id_persona 
      inner join estudios on persona_estudios.id_estudio = estudios. id_estudio 
      where persona.id_persona = '${id}';`,
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
  }
});

//Servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
