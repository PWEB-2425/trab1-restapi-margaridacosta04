const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

router.get('/', async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
});

module.exports = router;
