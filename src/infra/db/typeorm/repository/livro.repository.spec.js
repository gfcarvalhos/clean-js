const {
  livroRepository,
  typeormLivroRepository,
} = require('./livro.repository');

describe('Livro Repository', function () {
  let sut;
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 'quantidade_valida',
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido',
  };

  beforeEach(function () {
    typeormLivroRepository.delete({});
  });
  beforeAll(function () {
    sut = livroRepository();
  });
  test('Deve retornar void ao criar um livro', async function () {
    const livroCriado = await sut.cadastrar(livroDTO);

    expect(livroCriado).toBeUndefined;
  });
});
