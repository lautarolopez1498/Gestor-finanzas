const mongoose = require("mongoose");

const coleccionRegistros = 'registros';

const registrosSchema = new mongoose.Schema({
  month: String,
  year: Number,
  description: String,
  amount: Number,
  category: { type: String, enum: ['Generales', 'Personales', 'Ahorros']}
});

const registroModel = mongoose.model(coleccionRegistros, registrosSchema);

module.exports = registroModel;

