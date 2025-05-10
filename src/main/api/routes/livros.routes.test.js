const request = require('supertest');
const { app } = require('../app');
const {
  typeormLivroRepository,
} = require('../../../infra/db/typeorm/repository/livro.repository');

describe('Livros Route', function () {
  beforeEach(async function () {
    await typeormLivroRepository.query('DELETE FROM livros');
  });
  test('Deve ser possível cadastrar um livro', async function () {
    const { statusCode, body } = await request(app).post('/livros').send({
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_autor',
      genero: 'qualquer_genero',
      ISBN: 'qualquer_ISBN',
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test('Deve retornar um erro com os campos obrigatórios ausentes', async function () {
    const { statusCode, body } = await request(app).post('/livros').send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Erro na validação');
    expect(body.erros.fieldErrors).toEqual({
      nome: ['Nome é obrigatório'],
      quantidade: ['Quantidade é obrigatório'],
      autor: ['Autor é obrigatório'],
      genero: ['Gênero é obrigatório'],
      ISBN: ['ISBN é obrigatório'],
    });
  });
});
