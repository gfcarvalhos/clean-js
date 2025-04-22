const buscarPendentes = require('../../../tests/fixtures/buscar-pendentes');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const buscarEmprestimosPendentesController = require('./buscar-emprestimos-pendentes.controller');

describe('Buscar emprestimos pendentes Controller', function () {
  const buscarEmprestimosPendentesUseCase = jest.fn();
  test('Deve retornar um httpResponse 200 e os emprestimos pendentes', async function () {
    buscarEmprestimosPendentesUseCase.mockResolvedValue(
      Either.Right(buscarPendentes),
    );
    const response = await buscarEmprestimosPendentesController({
      buscarEmprestimosPendentesUseCase,
    });

    expect(response).toEqual(httpResponse(200, buscarPendentes));
  });

  test('Deve retornar um erro se o buscarEmprestimosPendentesUseCase não for fornecido', async function () {
    await expect(() =>
      buscarEmprestimosPendentesController({}),
    ).rejects.toThrow(new AppError(AppError.dependencias));
  });
});
