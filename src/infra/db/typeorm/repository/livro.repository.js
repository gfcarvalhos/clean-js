const { typeormServer } = require('../setup');

const typeormLivroRepository = typeormServer.getRepository('Livro');

const livroRepository = function () {
  const cadastrar = async function ({ nome, quantidade, autor, genero, ISBN }) {
    await typeormLivroRepository.save({
      nome,
      quantidade,
      autor,
      genero,
      ISBN,
    });
  };

  const existePorISBN = async function (ISBN) {
    const existeLivroPorISBN = await typeormLivroRepository.count({
      where: {
        ISBN,
      },
    });

    return !!existeLivroPorISBN;
  };

  return { cadastrar, existePorISBN };
};

module.exports = { livroRepository, typeormLivroRepository };
