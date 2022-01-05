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
app.post("/post-users", async (req, res) => {
  res.setHeader("content-type", "text/plain");
  const accion = req.body.accion;
  if (accion == "ingresar") {
    const usuario = req.body.usuario;
    const contraseña = req.body.contrasena;
    await conexion.query(
      `select count(id_usuario) as total, nombre_usuario as nombre, apellido_usuario as apellido,
      nombre_permiso as permisos from usuario inner join permiso on usuario.id_permiso = permiso.id_permiso
      where nick_usuario = '${usuario}' and contrasena_usuario = '${contraseña}' and estado_usuario = 'activo';`, //Revisar la columna: "estado_usuario" en el script
      (err, rows) => {
        res.send("" + rows[0].total); //Retornamos la respuesta de la base de datos
        if (rows[0].total >= 1) {
          //Existe el usuario
          var json = JSON.stringify({
            lname: (rows[0].nombre.charAt(0).toUpperCase() + rows[0].nombre.slice(1)),
            fname: (rows[0].apellido.charAt(0).toUpperCase() + rows[0].apellido.slice(1)),
            permisos: (rows[0].permisos.charAt(0).toUpperCase() + rows[0].permisos.slice(1)),
          });
          json = "[" + json + "]"; //Formato para que pueda ser leído
          var file = fs.writeFileSync("./src/public/json/usuario.json", json);
        }
      }
    );
    conexion.end();
  } else if (accion == "cargar_usuarios") {
    conexion.query(
      "select id_usuario as id, nick_usuario as nick, nombre_permiso as permisos, estado_usuario " +
        "as estado from usuario inner join permiso on usuario.id_permiso = permiso.id_permiso;",
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
    conexion.end();
  } else if (accion == "consultar_ultimo_id") {
    conexion.query(
      "select id_usuario as id from usuario order by id_usuario desc limit 1;",
      (err, rows) => {
        res.send(rows[0].id); //Retornamos la respuesta de la base de datos
      }
    );
    conexion.end();
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
        //res.send("t"); //Retornamos la respuesta de la base de datos
      }
    );
    conexion.end();
  } else if (accion == "consultar_usuario") {
    const id = req.body.id;
    conexion.query(
      `select id_usuario as id, nombre_usuario as nombre, apellido_usuario as apellido,
      nick_usuario as nick, id_permiso as permisos from usuario where id_usuario = '${id}';`,
      (err, rows) => {
        res.send(JSON.stringify(rows)); //Retornamos la respuesta de la base de datos
      }
    );
    conexion.end();
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
        if (err) {
          res.send("" + err);
        }
      }
    );
    conexion.end();
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
          res.send("" + err);
        }
      }
    );
    conexion.end();
  }
});

//Servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
