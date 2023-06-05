const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan')
const routerRegistros = require('./routes/registros.router.js');
mongoose.set("strictQuery", false);

require("dotenv").config();


// Innit
const app = express();


// middlewares
app.use(express.json());
app.use(express.text());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.use('/', routerRegistros);


// Servidor - Base de datos
app.listen(process.env.PORT, async () => {
  console.log(`Server running on PORT ${process.env.PORT}`);

  try {
    await mongoose.connect(process.env.URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexión a la base de datos establecida correctamente");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
});
