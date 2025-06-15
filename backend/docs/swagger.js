const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API da Escola - Documentação Swagger",
      version: "1.0.0",
      description: "Documentação detalhada da API para gerir alunos e cursos da escola.",
      contact: {
        name: "Margarida Costa",
        email: "margarida@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor local de desenvolvimento",
      },
      {
        url: "https://sua-api-publica.onrender.com",
        description: "Servidor de produção",
      },
    ],
    components: {
      schemas: {
        Aluno: {
          type: "object",
          required: ["nome", "idade", "curso"],
          properties: {
            _id: {
              type: "string",
              description: "ID único do aluno",
              example: "60f7cbb8e1d2c826d8b3f1a0",
            },
            nome: {
              type: "string",
              description: "Nome completo do aluno",
              example: "Maria Silva",
            },
            idade: {
              type: "integer",
              description: "Idade do aluno",
              example: 21,
            },
            curso: {
              type: "string",
              description: "Curso em que o aluno está inscrito",
              example: "Engenharia Informática",
            },
          },
        },
        Curso: {
          type: "object",
          required: ["nome"],
          properties: {
            _id: {
              type: "string",
              description: "ID único do curso",
              example: "60f7cc0fe1d2c826d8b3f1a3",
            },
            nome: {
              type: "string",
              description: "Nome do curso",
              example: "Engenharia Informática",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // procura os comentários em todas as rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
