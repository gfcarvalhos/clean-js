const { AppError } = require('../shared/errors');
const devolverLivroUsecase = require('./devolver-livro.usecase');

describe('Desvolver Livro UseCase', function () {
  const emprestimosRepository = {
    devolver: jest.fn(),
  };
  test('Deve ser possivel devolver um livro sem multa', async function () {
    emprestimosRepository.devolver.mockResolvedValue({
      data_retorno: new Date('2025-04-10'),
    });
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

  test('Deve ser possivel devolver um livro com multa', async function () {
    emprestimosRepository.devolver.mockResolvedValue({
      data_retorno: new Date('2025-04-01'),
    });
    const devolverLivroDTO = {
      emprestimo_id: 'qualquer_id',
      data_devolucao: new Date('2025-04-05'),
    };

    const sut = devolverLivroUsecase({ emprestimosRepository });
    const output = await sut(devolverLivroDTO);

    expect(output.right).toBe('Multa por atraso: R$ 10,00');
    expect(emprestimosRepository.devolver).toHaveBeenCalledWith(
      devolverLivroDTO,
    );
    expect(emprestimosRepository.devolver).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o emprestimosRepository não for fornecido', async function () {
    expect(() => devolverLivroUsecase({})).toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um throw AppError se campo obrigatório não for fornecido', async function () {
    const sut = devolverLivroUsecase({ emprestimosRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    );
  });
});
