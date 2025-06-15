// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log de requisições (opcional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Verifica variável de ambiente
console.log('MONGO_URI:', process.env.MONGO_URI);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => {
    console.error('❌ Erro na conexão com MongoDB:', err);
    process.exit(1);
  });

// Rotas
const alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);

// Rota base
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});

