const { livroRepository } = require('./livro.repository');

describe('Livro Repository', function () {
  test('Deve retornar void ao criar um livro', async function () {
    const sut = livroRepository();
    const livroCriado = await sut.cadastrar({
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido',
    });

    expect(livroCriado).toBeUndefined;
  });
});
