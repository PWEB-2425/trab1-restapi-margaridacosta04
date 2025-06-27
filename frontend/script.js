// script.js

// URL da API
const API_URL = 'https://trab1-restapi-margaridaandleandro.onrender.com';

// Elementos do DOM
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const formAluno = document.getElementById('formAluno');
const tabelaAlunosBody = document.querySelector('#tabelaAlunos tbody');
const btnSubmit = formAluno.querySelector('button[type="submit"]');

// Guarda o ID do aluno que está sendo editado (ou null para novo)
let alunoEditandoId = null;

// Alterna abas
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Carrega alunos na tabela
async function carregarAlunos() {
  tabelaAlunosBody.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';
  try {
    const res = await fetch(`${API_URL}/alunos`);
    if (!res.ok) throw new Error('Erro ao buscar alunos');
    const alunos = await res.json();
    if (alunos.length === 0) {
      tabelaAlunosBody.innerHTML = '<tr><td colspan="5">Nenhum aluno cadastrado.</td></tr>';
      return;
    }
    tabelaAlunosBody.innerHTML = alunos.map(aluno => `
      <tr data-id="${aluno._id}">
        <td>${aluno.nome}</td>
        <td>${aluno.apelido}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.anoCurricular}º ano</td>
        <td>
          <button class="btn-edit" onclick="editarAluno('${aluno._id}')">Editar</button>
          <button class="btn-delete" onclick="deletarAluno('${aluno._id}')">Excluir</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tabelaAlunosBody.innerHTML = `<tr><td colspan="5">Erro ao carregar alunos.</td></tr>`;
    console.error(err);
  }
}

// Preenche o formulário para edição
async function editarAluno(id) {
  try {
    const res = await fetch(`${API_URL}/alunos/${id}`);
    if (!res.ok) throw new Error('Aluno não encontrado');
    const aluno = await res.json();
    formAluno.nome.value = aluno.nome;
    formAluno.apelido.value = aluno.apelido;
    formAluno.curso.value = aluno.curso;
    formAluno.anoCurricular.value = aluno.anoCurricular;
    alunoEditandoId = id;
    btnSubmit.textContent = 'Salvar Alterações';
    document.querySelector('[data-tab="criar"]').click();
  } catch (err) {
    alert('Erro ao carregar dados do aluno para edição.');
    console.error(err);
  }
}

// Evento submit (criação ou edição)
formAluno.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = formAluno.nome.value.trim();
  const apelido = formAluno.apelido.value.trim();
  const curso = formAluno.curso.value.trim();
  const anoCurricular = formAluno.anoCurricular.value.trim();
  if (!nome || !apelido || !curso || !anoCurricular) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  try {
    const method = alunoEditandoId ? 'PUT' : 'POST';
    const url = alunoEditandoId ? `${API_URL}/alunos/${alunoEditandoId}` : `${API_URL}/alunos`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, apelido, curso, anoCurricular: Number(anoCurricular) })
    });
    if (!res.ok) throw new Error('Falha na requisição');
    alert(alunoEditandoId ? 'Aluno atualizado com sucesso!' : 'Aluno adicionado com sucesso!');
    formAluno.reset();
    alunoEditandoId = null;
    btnSubmit.textContent = 'Adicionar Aluno';
    document.querySelector('[data-tab="listar"]').click();
    carregarAlunos();
  } catch (err) {
    alert('Erro ao salvar aluno: ' + err.message);
    console.error(err);
  }
});

// Exclui aluno
async function deletarAluno(id) {
  if (!confirm('Tem certeza que deseja excluir este aluno?')) return;
  try {
    const res = await fetch(`${API_URL}/alunos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir aluno');
    alert('Aluno excluído com sucesso!');
    carregarAlunos();
  } catch (err) {
    alert('Erro ao excluir aluno.');
    console.error(err);
  }
}

// Inicia carregando a lista
carregarAlunos();
