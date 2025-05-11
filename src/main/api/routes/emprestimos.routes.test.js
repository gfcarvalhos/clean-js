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
  const livroDTO = {
    nome: 'qualquer_nome',
    quantidade: 3,
    autor: 'qualquer_autor',
    genero: 'qualquer_genero',
    ISBN: 'qualquer_ISBN',
  };
  const usuarioDTO = {
    nome_completo: 'nome_valido',
    CPF: '123.123.123-12',
    endereco: 'endereco_valido',
    telefone: 'telefone_valido',
    email: 'email_valido@hotmail.com',
  };
  test('Deve ser possível emprestar um livro', async function () {
    const livro = await typeormLivroRepository.save(livroDTO);
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      livro_id: livro.id,
      usuario_id: usuario.id,
      nome_usuario: usuario.nome_completo,
      data_saida: '2025-05-10',
      data_retorno: '2025-06-10',
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test('Deve retornar 200 e uma mensagem de multa não aplicada', async function () {
    const livro = await typeormLivroRepository.save(livroDTO);
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const emprestimo = await typeormEmprestimoRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      nome_usuario: usuario.nome_completo,
      data_saida: '2025-05-10',
      data_retorno: '2025-06-10',
    });

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({
        data_devolucao: '2025-06-10',
      });

    expect(statusCode).toBe(200);
    expect(body).toBe('Multa por atraso: R$ 0');
  });
});
