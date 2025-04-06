const { usuarioRepository } = require('./usuario.repository');

describe('Usuario Repository', function () {
  test('Deve retornar void ao criar um usuario', async function () {
    const sut = usuarioRepository();
    const usuarioCriado = await sut.cadastrar({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      endereco: 'endereco_valido',
      email: 'email_valido',
    });

    expect(usuarioCriado).toBeUndefined;
  });
});
