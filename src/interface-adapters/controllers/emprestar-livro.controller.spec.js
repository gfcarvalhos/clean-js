const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const emprestarLivroController = require('./emprestar-livro.controller');

describe('Emprestar livro Controller', function () {
  const emprestarLivroUseCase = jest.fn();
  test('Deve ser possível emprestar livro', async function () {
    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: '2025-04-01',
        data_retorno: '2025-04-21',
      },
    };

    emprestarLivroUseCase.mockResolvedValue(Either.Right(null));

    const response = await emprestarLivroController({
      emprestarLivroUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date),
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um httpResponse 400 e error.message se o emprestimo não for realizado com sucesso por lógica de UseCase', async function () {
    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: '2025-04-01',
        data_retorno: '2025-04-21',
      },
    };

    emprestarLivroUseCase.mockResolvedValue(
      Either.Left({ message: 'validacao_invalida' }),
    );

    const response = await emprestarLivroController({
      emprestarLivroUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(400, 'validacao_invalida'));
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date),
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o emprestarLivroUseCase e httpRequest não forem fornecidos', function () {
    expect(() => emprestarLivroController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um erro do zodValidator se der erro na validação', function () {
    const httpRequest = {
      body: {},
    };

    expect(() =>
      emprestarLivroController({
        emprestarLivroUseCase,
        httpRequest,
      }),
    ).rejects.toBeInstanceOf(ZodError);
  });
});
