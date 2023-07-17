const { Router } = require("express");
const registroModel = require("../models/Registros.js");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const nuevoRegistro = await registroModel.create({
      date: req.body.date,
      title: req.body.title,
      amount: req.body.amount,
    });

    return res.json({
      message: "Ok, registro ingresado correctamente",
      payload: nuevoRegistro,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error}`,
      payload: "Error al crear registro",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const registros = await registroModel.find();
    res.json({
      message: "Ok",
      payload: registros,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error}`,
      payload: "Error al mostrar registros",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const registo = await registroModel.findById(id);
    res.json({
      message: "Ok",
      payload: registo,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error}`,
      payload: "Error al mostrar registro",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const registoID = req.params.id;
    const registroEliminado = await registroModel.findByIdAndRemove(registoID);
    res.json({
      message: "Ok, registro eliminado",
      payload: registroEliminado,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error}`,
      payload: "Error al intentar borrar un registro",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const registroActualizado = await registroModel.findByIdAndUpdate(id, {
      date: req.body.date,
      title: req.body.title,
      amount: req.body.amount,
    });
    res.json({
      message: "Ok, registro actualizado",
      payload: registroActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error}`,
      payload: "Error al intentar actualizar un registro",
    });
  }
});

module.exports = router;
