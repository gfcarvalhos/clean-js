const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarLivroController = require('./cadastrar-livro.controller');

describe('Cadastrar livro Controller', function () {
  const cadastrarLivroUseCase = jest.fn();
  test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async function () {
    cadastrarLivroUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome: 'nome_valido',
        quantidade: 'quantidade_valida',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido',
      },
    };

    const response = await cadastrarLivroController({
      cadastrarLivroUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o cadastrarLivroUseCase e httpRequest não for fornecido', function () {
    expect(() => cadastrarLivroController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um httpResponse 400 e error.message para falha no cadastro de livro devido a logica do useCase', async function () {
    cadastrarLivroUseCase.mockResolvedValue(
      Either.Left({ message: 'logica_invalida' }),
    );
    const httpRequest = {
      body: {
        nome: 'nome_valido',
        quantidade: 'quantidade_valida',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido',
      },
    };

    const response = await cadastrarLivroController({
      cadastrarLivroUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(400, 'logica_invalida'));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro do zod validator se der erro na validação dos dados', async function () {
    const httpRequest = {
      body: {},
    };

    expect(() =>
      cadastrarLivroController({ cadastrarLivroUseCase, httpRequest }),
    ).rejects.toBeInstanceOf(ZodError);
  });
});
