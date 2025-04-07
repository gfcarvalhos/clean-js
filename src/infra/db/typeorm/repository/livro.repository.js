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

  return { cadastrar };
};

module.exports = { livroRepository };
