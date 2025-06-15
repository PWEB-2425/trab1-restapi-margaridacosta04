const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Operações relacionadas com cursos
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtém a lista de todos os cursos disponíveis
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Erro ao obter a lista de cursos
 */
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
