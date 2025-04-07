const { typeormServer } = require('../setup');

const typeormEmprestimoRepository = typeormServer.getRepository('Emprestimo');

const emprestimosRepository = function () {
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

  const devolver = async function ({ emprestimo_id, data_devolucao }) {
    await typeormEmprestimoRepository.update(emprestimo_id, { data_devolucao });
    const { data_retorno } = await typeormEmprestimoRepository.findOneBy({
      id: emprestimo_id,
    });

    return { data_retorno };
  };

  return { emprestar, devolver };
};

module.exports = { emprestimosRepository, typeormEmprestimoRepository };
