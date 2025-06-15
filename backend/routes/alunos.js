const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Operações relacionadas com alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Obtém a lista de todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Erro ao obter a lista de alunos
 */
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Obtém um aluno pelo seu ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao procurar o aluno
 */
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       description: Dados do aluno a criar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Dados inválidos para criação do aluno
 */
router.post('/', async (req, res) => {
  const aluno = new Aluno(req.body);
  try {
    const novoAluno = await aluno.save();
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza os dados de um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno a atualizar
 *     requestBody:
 *       description: Dados para atualização do aluno
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Dados inválidos para atualização
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Elimina um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno a eliminar
 *     responses:
 *       204:
 *         description: Aluno eliminado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao eliminar o aluno
 */
router.delete('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
