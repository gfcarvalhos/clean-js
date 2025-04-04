const cadastrarUsuarioUsecase = require('./cadastrar-usuario.usecase');
const AppError = require('../shared/errors/AppError');
const { Either } = require('../shared/errors');

describe('Cadastrar usuario UseCase', function () {
  const usuariosRepository = {
    cadastrar: jest.fn(),
    existePorCpf: jest.fn(),
  };

  test('Deve cadastrar um usuario', async function () {
    const usuarioDTO = {
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      endereco: 'endereco_valido',
      email: 'email_valido',
    };

    const sut = cadastrarUsuarioUsecase({ usuariosRepository });
    const output = await sut(usuarioDTO);

    expect(output.right).toBeNull();
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o usuarioRepository não for fornecido', function () {
    expect(() => cadastrarUsuarioUsecase({})).toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um throw AppError se os campos obrigatórios não forem fornecidos', async function () {
    const sut = cadastrarUsuarioUsecase({ usuariosRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    );
  });

  test('Deve um throw AppError se já existir usuário cadastrado com o mesmo CPF', async function () {
    usuariosRepository.existePorCpf.mockResolvedValue(true);
    const usuarioDTO = {
      nome_completo: 'nome_valido',
      CPF: 'CPF_ja_cadastrado',
      telefone: 'telefone_valido',
      endereco: 'endereco_valido',
      email: 'email_valido',
    };

    const sut = cadastrarUsuarioUsecase({
      usuariosRepository,
    });
    const output = await sut(usuarioDTO);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.CpfJaCadastrado('CPF'));
    expect(usuariosRepository.existePorCpf).toHaveBeenCalledWith(
      usuarioDTO.CPF,
    );
    expect(usuariosRepository.existePorCpf).toHaveBeenCalledTimes(1);
  });
});
