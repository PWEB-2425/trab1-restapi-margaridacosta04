require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

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

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => {
    console.error('❌ Erro na conexão com MongoDB:', err);
    process.exit(1);
  });
  //teste
  app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Rotas da API
const alunosRouter = require('./routes/alunos');
const cursosRouter = require('./routes/cursos'); // ✅ adiciona esta linha

app.use('/alunos', alunosRouter);
app.use('/cursos', cursosRouter); // ✅ adiciona esta linha

// Rota base
app.get('/', (req, res) => {
  res.send('API funcionando!');
});
// Rota de teste
app.get('/teste', (req, res) => {
  res.send('rota teste ok');
});

// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
