const request = require('supertest');
const {
  typeormLivroRepository,
} = require('../../../infra/db/typeorm/repository/livro.repository');
const {
  typeormUsuarioRepository,
} = require('../../../infra/db/typeorm/repository/usuario.repository');
const {
  typeormEmprestimoRepository,
} = require('../../../infra/db/typeorm/repository/emprestimo.repository');
const { app } = require('../app');

describe('Emprestimos Routes', function () {
  beforeEach(async function () {
    await typeormEmprestimoRepository.query('DELETE FROM emprestimos');
    await typeormLivroRepository.query('DELETE FROM livros');
    await typeormUsuarioRepository.query('DELETE FROM usuarios');
  });
  test('Deve ser possível emprestar um livro', async function () {
    const livro = await typeormLivroRepository.save({
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_autor',
      genero: 'qualquer_genero',
      ISBN: 'qualquer_ISBN',
    });
    const usuario = await typeormUsuarioRepository.save({
      nome_completo: 'nome_valido',
      CPF: '123.123.123-12',
      endereco: 'endereco_valido',
      telefone: 'telefone_valido',
      email: 'email_valido@hotmail.com',
    });

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2025-05-10',
      data_retorno: '2025-06-10',
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});
