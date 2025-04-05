const devolverLivroUsecase = require('./devolver-livro.usecase');

describe('Desvolver Livro UseCase', function () {
  const emprestimosRepository = {
    devolver: jest.fn(),
  };
  test('Deve ser possivel devolver um livro sem multa', async function () {
    const devolverLivroDTO = {
      emprestimo_id: 'qualquer_id',
      data_devolucao: new Date('2025-04-05'),
    };

    const sut = devolverLivroUsecase({ emprestimosRepository });
    const output = await sut(devolverLivroDTO);

    expect(output.right).toBe('Multa por atraso: R$ 0');
    expect(emprestimosRepository.devolver).toHaveBeenCalledWith(
      devolverLivroDTO,
    );
    expect(emprestimosRepository.devolver).toHaveBeenCalledTimes(1);
  });
});
