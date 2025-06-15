const Aluno = require('../models/Aluno');

const listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const obterAlunoPorId = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

const criarAluno = async (req, res) => {
  const aluno = new Aluno(req.body);
  try {
    const novoAluno = await aluno.save();
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const atualizarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const apagarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listarAlunos,
  obterAlunoPorId,
  criarAluno,
  atualizarAluno,
  apagarAluno,
};
