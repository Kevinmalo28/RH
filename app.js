const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
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
  const usuario = req.body.usuario;
  const contraseña = req.body.contrasena;
  await conexion.query(
    "select count(id_usuario) as total from usuario where nick_usuario = '" +
      usuario +
      "' and contrasena_usuario = '" +
      contraseña +
      "' and estado_usuario = 'activo';", //Revisar la columna: "estado_usuario" en el script
    (err, rows) => {
      res.send("" + rows[0].total); //Retornamos la respuesta de la base de datos
    }
  );
  conexion.end();
});

//Servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
