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

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtém um curso pelo seu ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Curso encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro ao procurar o curso
 */
router.get('/:id', async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       description: Dados do curso a criar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Dados inválidos para criação do curso
 */
router.post('/', async (req, res) => {
  const curso = new Curso(req.body);
  try {
    const novoCurso = await curso.save();
    res.status(201).json(novoCurso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Atualiza os dados de um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do curso a atualizar
 *     requestBody:
 *       description: Dados para atualização do curso
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Dados inválidos para atualização
 *       404:
 *         description: Curso não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Elimina um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do curso a eliminar
 *     responses:
 *       204:
 *         description: Curso eliminado com sucesso
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro ao eliminar o curso
 */
router.delete('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
