const {
  livroRepository,
  typeormLivroRepository,
} = require('./livro.repository');

describe('Livro Repository', function () {
  let sut;
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
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

    expect(livroCriado).toBeUndefined();
  });

  test('Deve retornar true ao passar ISBN existente no banco', async function () {
    await typeormLivroRepository.save(livroDTO);
    const existeLivro = await sut.existePorISBN('ISBN_valido');

    expect(existeLivro).toBe(true);
  });

  test('Deve retornar false ao passar ISBN inexistente no banco', async function () {
    const existeLivro = await sut.existePorISBN('ISBN_valido');

    expect(existeLivro).toBe(false);
  });

  test('Deve retornar Livro a partir da busca com parametro de nome', async function () {
    await typeormLivroRepository.save(livroDTO);
    const livro = await sut.buscarPorNomeOuISBN('nome_valido');

    expect(livro).toHaveLength(1);
    expect(livro[0].nome).toEqual('nome_valido');
  });

  test('Deve retornar Livro a partir da busca com parametro de ISBN', async function () {
    await typeormLivroRepository.save(livroDTO);
    const livro = await sut.buscarPorNomeOuISBN('ISBN_valido');

    expect(livro).toHaveLength(1);
    expect(livro[0].ISBN).toEqual('ISBN_valido');
  });

  test('Deve retornar array vazio a partir da busca com parametro', async function () {
    const livro = await sut.buscarPorNomeOuISBN('valor_valido');

    expect(livro).toHaveLength(0);
  });
});
