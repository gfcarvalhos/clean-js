const { AppError } = require('../shared/errors');
const buscarLivroPorNomeOuISBNUseCase = require('./buscar-livro-por-nome-ou-isbn.usecase');
describe('Busca livro por nome ou ISBN usecase', function () {
  const livrosRepository = {
    buscarPorNomeOuISBN: jest.fn(),
  };
  test('Deve retornar um livro válido ao buscar por nome ou ISBN já existente', async function () {
    const nomeISBNDTO = {
      valor: 'valor_valido',
    };
    const outputDTO = [
      {
        id: 'Id_valido',
        nome: 'valor_valido',
        quantidade: 'quantidade_valida',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'valor_valido',
      },
    ];
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue(outputDTO);

    const sut = buscarLivroPorNomeOuISBNUseCase({ livrosRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual(outputDTO);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor,
    );
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um array vazio quando não encontrar livro com o nome ou ISBN informados', async function () {
    const nomeISBNDTO = {
      valor: 'valor_valido',
    };
    const outputDOT = [];
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue(outputDOT);

    const sut = buscarLivroPorNomeOuISBNUseCase({ livrosRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual(outputDOT);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor,
    );
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o livrosRepository não for fornecido', async function () {
    expect(() => buscarLivroPorNomeOuISBNUseCase({})).toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um throw AppError se campo obrigatório não for fornecido', async function () {
    const sut = buscarLivroPorNomeOuISBNUseCase({ livrosRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    );
  });
});
