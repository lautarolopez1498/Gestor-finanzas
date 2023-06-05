const { Router } = require("express");
const registroModel = require("../models/Registros.js");

const router = Router();

router.post('/api/nuevo-registro', async (req, res) => {
  try {
    const nuevoRegistro = await registroModel.create({
      month: req.body.month,
      year: req.body.year,
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    });

    return res.json({
      message: "Ok",
      payload: nuevoRegistro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      payload: "Error al crear registro",
    });
  }
});

router.get('/api/registros', async (req, res) => {
  try {
    const registros = await registroModel.find();
    res.json({
      message: "Ok",
      payload: registros,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      payload: 'Error al mostrar registros'
    })
  }
});

router.get('/api/registros/generales', async (req, res) => {
  try {  
    const generales = await registroModel.find({ category: "Generales" });
    res.json({
      message: 'Ok',
      payload: generales
    });

  } catch(error) {
      return res.status(500).json({
        message: 'Error',
        payload: 'Error al mostrar los "Gastos Generales'
      })
  }
});

router.get('/api/registros/personales', async (req, res) => {
  try {  
    const personales = await registroModel.find({ category: "Personales" });
    res.json({
      message: 'Ok',
      payload: personales
    });

  } catch(error) {
      return res.status(500).json({
        message: 'Error',
        payload: 'Error al mostrar los "Gastos Personales'
      })
  }
});

router.get('/api/registros/ahorros', async (req, res) => {
  try {  
    const ahorros = await registroModel.find({ category: "Ahorros" });
    res.json({
      message: 'Ok',
      payload: ahorros
    });

  } catch(error) {
      return res.status(500).json({
        message: 'Error',
        payload: 'Error al mostrar los "Ahorros'
      })
  }
});

module.exports = router;
