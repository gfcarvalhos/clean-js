const { Either, AppError } = require('../shared/errors');

module.exports = function buscarEmprestimosPendentesUserCase({
  emprestimosRepository,
}) {
  if (!emprestimosRepository) throw new AppError(AppError.dependencias);
  return async function () {
    const emprestimosPendentes =
      await emprestimosRepository.buscarPendentesComLivroComUsuario();
    return Either.Right(emprestimosPendentes);
  };
};
