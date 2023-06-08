const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const routerRegistros = require('./routes/registros.router.js');
mongoose.set('strictQuery', false);

require('dotenv').config();


// Innit
const server = express();


// middlewares
server.use(express.json());
server.use(express.text());
server.use(express.static(__dirname + "/public"));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

// routes
server.use('/api/registros', routerRegistros);


// servidor - base de datos
server.listen(process.env.PORT, async () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});
