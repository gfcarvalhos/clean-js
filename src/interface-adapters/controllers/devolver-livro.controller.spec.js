const { Either } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const devolverLivroController = require('./devolver-livro.controller');

describe('Devolver livro Controller', function () {
  const devolverLivroUseCase = jest.fn();
  test('Deve retornar uma mensagem ao devolver um livro informando uma multa ou não', async function () {
    const httpRequest = {
      body: {
        data_devolucao: '2025-04-21',
      },
      params: {
        emprestimo_id: '1',
      },
    };

    devolverLivroUseCase.mockResolvedValue(
      Either.Right('Multa por atraso: R$ 0'),
    );

    const response = await devolverLivroController({
      httpRequest,
      devolverLivroUseCase,
    });

    expect(response).toEqual(httpResponse(200, 'Multa por atraso: R$ 0'));
    expect(devolverLivroUseCase).toHaveBeenCalledWith({
      ...httpRequest.body,
      ...httpRequest.params,
    });
    expect(devolverLivroUseCase).toHaveBeenCalledTimes(1);
  });
});
