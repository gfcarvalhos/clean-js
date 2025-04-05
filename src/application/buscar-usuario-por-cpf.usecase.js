const { Either, AppError } = require('../shared/errors');

module.exports = function buscarUsarioPorCpfUseCase({ usuariosRepository }) {
  if (!usuariosRepository) throw new AppError(AppError.dependencias);
  return async function ({ CPF }) {
    if (!CPF) throw new AppError(AppError.parametrosObrigatoriosAusentes);
    const usuario = await usuariosRepository.buscarporCpf(CPF);
    return Either.Right(usuario);
  };
};
