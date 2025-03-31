const cadastrarUsuarioUsecase = require('./cadastrar-usuario.usecase');
const AppError = require('../shared/errors/AppError');

describe('Cadastrar usuario UseCase', function () {
  const usuariosRepository = {
    cadastrar: jest.fn(),
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

    expect(output).toBeUndefined();
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um trhow AppError se o usuarioRepository não for fornecido', function () {
    expect(() => cadastrarUsuarioUsecase({})).toThrow(
      new AppError(AppError.dependencias),
    );
  });
});
