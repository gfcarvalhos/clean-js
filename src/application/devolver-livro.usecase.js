const { Either } = require('../shared/errors');

module.exports = function devolver({ emprestimosRepository }) {
  return async function ({ emprestimo_id, data_devolucao }) {
    await emprestimosRepository.devolver({
      emprestimo_id,
      data_devolucao,
    });

    const verificaMulta = 'Multa por atraso: R$ 0';
    return Either.Right(verificaMulta);
  };
};
