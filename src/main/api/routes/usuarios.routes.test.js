const request = require('supertest');
const { app } = require('../app');
const {
  typeormUsuarioRepository,
} = require('../../../infra/db/typeorm/repository/usuario.repository');

describe('Usuarios Routes', function () {
  beforeEach(async function () {
    await typeormUsuarioRepository.query('DELETE FROM usuarios');
  });
  test('Deve ser possível cadastar um usuário', async function () {
    const { statusCode, body } = await request(app).post('/usuarios').send({
      nome_completo: 'nome_valido',
      CPF: '123.123.123-12',
      endereco: 'endereco_valido',
      telefone: 'telefone_valido',
      email: 'email_valido@hotmail.com',
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});
