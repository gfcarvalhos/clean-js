const {
  usuarioRepository,
  typeormUsuarioRepository,
} = require('./usuario.repository');

describe('Usuario Repository', function () {
  let sut;
  beforeEach(async function () {
    await typeormUsuarioRepository.delete({});
  });
  beforeAll(function () {
    sut = usuarioRepository();
  });
  const usuarioDTO = {
    nome_completo: 'nome_valido',
    CPF: 'CPF_valido',
    telefone: 'telefone_valido',
    endereco: 'endereco_valido',
    email: 'email_valido',
  };
  test('Deve retornar void ao criar um usuario', async function () {
    const usuarioCriado = await sut.cadastrar(usuarioDTO);

    expect(usuarioCriado).toBeUndefined;
  });

  test('Deve retornar um usuário se o mesmo existir buscando por CPF', async function () {
    await typeormUsuarioRepository.save(usuarioDTO);
    const buscarPorCPFCadastrado = await sut.buscarporCpf('CPF_valido');

    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });

  test('Deve retornar null se usuario nao existir ao buscar por CPF', async function () {
    const buscarPorCPFCadastrado = await sut.buscarporCpf('CPF_valido');

    expect(buscarPorCPFCadastrado).toBeNull();
  });

  test('Deve retornar true se usuario existir ao buscar por CPF', async function () {
    await typeormUsuarioRepository.save(usuarioDTO);
    const existePorCpfCadastrado = await sut.existePorCpf('CPF_valido');

    expect(existePorCpfCadastrado).toBe(true);
  });

  test('Deve retornar false se usuario existir ao buscar por CPF', async function () {
    const existePorCpfCadastrado = await sut.existePorCpf('CPF_valido');

    expect(existePorCpfCadastrado).toBe(false);
  });
});
