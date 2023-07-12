const mongoose = require("mongoose");

const coleccionRegistros = "registros";

const registrosSchema = new mongoose.Schema({
  date: { type: Date },
  title: String,
  category: { type: String, enum: ["Generales", "Personales", "Ahorros"] },
  amount: Number,
});

const registroModel = mongoose.model(coleccionRegistros, registrosSchema);

module.exports = registroModel;
