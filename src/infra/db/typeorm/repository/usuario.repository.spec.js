const {
  usuarioRepository,
  typeormUsuarioRepository,
} = require('./usuario.repository');

describe('Usuario Repository', function () {
  beforeEach(async function () {
    await typeormUsuarioRepository.delete({});
  });
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

  test('Deve retornar void ao criar um usuario', async function () {
    await typeormUsuarioRepository.save({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      endereco: 'endereco_valido',
      email: 'email_valido',
    });
    const sut = usuarioRepository();
    const buscarPorCPFCadastrado = await sut.buscarporCpf('CPF_valido');

    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });
});
