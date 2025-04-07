const { typeormServer } = require('../setup');

const typeormEmprestimoRepository = typeormServer.getRepository('Emprestimo');

const emprestimoRepository = function () {
  const emprestar = async function ({
    usuario_id,
    livro_id,
    data_saida,
    data_retorno,
  }) {
    await typeormEmprestimoRepository.save({
      usuario_id,
      livro_id,
      data_saida,
      data_retorno,
    });
  };

  return { emprestar };
};

module.exports = { emprestimoRepository, typeormEmprestimoRepository };
