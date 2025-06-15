// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Aluno = require('./models/Aluno');

async function seed() {
  try {
    // Conecta ao MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado ao MongoDB para o seed.');

    // Dados de exemplo
    const exemplos = [
      {
        nome: 'Ana',
        apelido: 'Pereira',
        curso: 'Design',
        anoCurricular: 1
      },
      {
        nome: 'João',
        apelido: 'Silva',
        curso: 'Engenharia Informática',
        anoCurricular: 3
      }
    ];

    // Limpa a coleção antes, se quiser
    await Aluno.deleteMany({});
    console.log('🗑️  Coleção alunos limpa.');

    // Insere os documentos
    const inseridos = await Aluno.insertMany(exemplos);
    console.log(`✅ Inseridos ${inseridos.length} alunos:`);

    inseridos.forEach(a => {
      console.log(`  • ${a._id} – ${a.nome} ${a.apelido}`);
    });

  } catch (err) {
    console.error('❌ Erro no seed:', err);
  } finally {
    // Fecha a conexão
    await mongoose.disconnect();
    console.log('🔌 Conexão fechada.');
  }
}

seed();
