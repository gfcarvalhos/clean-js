const { Either } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const buscarLivroOorNomeOuIsbnController = require('./buscar-livro-por-nome-ou-isbn.controller');

describe('Buscar livro por nome ou ISBN Controller', function () {
  const buscarLivroPorNomeOuISBNUseCase = jest.fn();
  test('Deve retornar um httpResponse 200 e os livros se forem encontrados com o valor informado', async function () {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido',
    };
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right(livroDTO));
    const httpRequest = {
      query: {
        valor: 'nome_valido',
      },
    };

    const response = await buscarLivroOorNomeOuIsbnController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(200, livroDTO));
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenLastCalledWith(
      httpRequest.query,
    );
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1);
  });
});
