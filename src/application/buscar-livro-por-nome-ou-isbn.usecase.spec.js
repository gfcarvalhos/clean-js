const buscaLivroPorNomeOuISBNUsecase = require('./busca-livro-por-nome-ou-isbn.usecase');
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

    const sut = buscaLivroPorNomeOuISBNUsecase({ livrosRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual(outputDTO);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor,
    );
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });
});
