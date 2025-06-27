Leandro Costa 26618
Margarida Costa 32425
****************************************************
Link da API: https://trab1-restapi-margaridaandleandro.onrender.com

 Link do Swagger: https://trab1-restapi-margaridaandleandro.onrender.com/api-docs

 Link do frontend: trab1-restapi-margaridacosta04-crzt.vercel.app
****************************************************
Instruções de Instalação e Execução
Pré-requisitos
Node.js e npm instalados

Conta no MongoDB Atlas (ou MongoDB local)

Navegador (Chrome, Edge, Firefox, etc.)

Backend
Aceda à pasta backend no terminal.

Instale as dependências:

npm install
Crie um ficheiro .env com o seguinte conteúdo (substitua os dados conforme o seu MongoDB):

ini
MONGO_URI=mongodb+srv://<utilizador>:<senha>@<cluster>.mongodb.net/alunosdb
PORT=5000
Inicie o servidor com:

node server.js
Se tudo correr bem, verá:
Servidor a correr em http://localhost:5000

Frontend
Aceda à pasta frontend.

Abra o ficheiro index.html no navegador (clicar duas vezes ou arrastar para o browser).

Testar com Postman (opcional)
Enviar pedidos HTTP para http://localhost:5000/alunos com os métodos:

GET para listar alunos

POST para adicionar alunos

PUT para atualizar alunos

DELETE para remover alunos
Descriçao da base de dados:
A base de dados usada neste projeto chama-se "alunosdb" e está alojada no MongoDB Atlas.
****************************************************
Coleção principal: alunos

Cada documento da coleção representa um aluno e tem os seguintes campos:

_id: identificador único gerado automaticamente pelo MongoDB

nome: nome do aluno (ex: Joana)

apelido: apelido ou último nome do aluno (ex: Silva)

curso: nome do curso frequentado (ex: Engenharia Informática)

anoCurricular: número do ano curricular (ex: 1, 2, 3)

Exemplo de um documento na coleção:

{
"nome": "Joana",
"apelido": "Silva",
"curso": "Engenharia Informática",
"anoCurricular": 2
}
****************************************************
Descrição da API (rotas)
A API permite gerir uma lista de alunos através das seguintes rotas:

GET /alunos
Retorna todos os alunos da base de dados.

GET /alunos/:id
Retorna os dados de um aluno específico, com base no seu ID.

POST /alunos
Cria um novo aluno.
Espera um corpo JSON com os campos:

*nome
*apelido
*curso
*noCurricular

PUT /alunos/:id
Atualiza os dados de um aluno existente com o ID fornecido.
Espera um corpo JSON com os campos atualizados.

DELETE /alunos/:id
Remove o aluno com o ID fornecido da base de dados.
****************************************************
Descrição frontend:
Permite ao utilizador interagir com a API de alunos de forma visual e amigável. As principais funcionalidades são:

Listar Alunos: Mostra todos os alunos registados na base de dados.

Adicionar Aluno: Formulário para inserir um novo aluno.

Editar Aluno: Permite atualizar os dados de um aluno existente.

Eliminar Aluno: Remove um aluno da base de dados com confirmação.

O ficheiro index.html apresenta a interface da aplicação.
O ficheiro style.css define o aspeto visual com cores suaves (azul claro) e estilo limpo.
O ficheiro script.js trata da comunicação com a API e da lógica de interface (ex: carregar alunos, lidar com cliques nos botões, enviar dados para a API).

A interface funciona ao abrir o index.html num navegador moderno e requer que o backend esteja em execução (por exemplo, em http://localhost:5000).








