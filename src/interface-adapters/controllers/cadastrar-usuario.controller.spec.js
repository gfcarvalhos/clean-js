const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarUsuarioController = require('./cadastrar-usuario.controller');

describe('Cadastrar usuario Controller', function () {
  const cadastrarUsuarioUseCase = jest.fn();
  test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async function () {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome_completo: 'nome_valido',
        CPF: '123.123.123-12',
        telefone: 'telefone_valido',
        endereco: 'endereco_valido',
        email: 'email_valido@email.com',
      },
    };

    const response = await cadastrarUsuarioController({
      cadastrarUsuarioUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o cadastrarUsuarioUseCase e httpRequest não for fornecido', function () {
    expect(() => cadastrarUsuarioController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um httpResponse 400 e error.message para falha no cadastro de usuario devido a logica do useCase', async function () {
    cadastrarUsuarioUseCase.mockResolvedValue(
      Either.Left({ message: 'logica_invalida' }),
    );
    const httpRequest = {
      body: {
        nome_completo: 'nome_valido',
        CPF: '123.123.123-12',
        telefone: 'telefone_valido',
        endereco: 'endereco_valido',
        email: 'email_valido@email.com',
      },
    };

    const response = await cadastrarUsuarioController({
      cadastrarUsuarioUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(400, 'logica_invalida'));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro do zod validator se der erro na validação dos dados', async function () {
    const httpRequest = {
      body: {},
    };

    await expect(() =>
      cadastrarUsuarioController({ cadastrarUsuarioUseCase, httpRequest }),
    ).rejects.toBeInstanceOf(ZodError);
  });
});
