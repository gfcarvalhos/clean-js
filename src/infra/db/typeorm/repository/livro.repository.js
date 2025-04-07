const { Like } = require('typeorm');
const { typeormServer } = require('../setup');

const typeormLivroRepository = typeormServer.getRepository('Livro');

const livrosRepository = function () {
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

  const buscarPorNomeOuISBN = async function (valor) {
    const buscaLivroCadastrado = await typeormLivroRepository.find({
      where: [{ nome: Like(`%${valor}%`) }, { ISBN: valor }],
    });

    return buscaLivroCadastrado;
  };

  return { cadastrar, existePorISBN, buscarPorNomeOuISBN };
};

module.exports = { livrosRepository, typeormLivroRepository };
