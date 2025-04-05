const { Either } = require('../shared/errors');

module.exports = function buscarUsarioPorCpfUseCase({ usuariosRepository }) {
  return async function ({ CPF }) {
    const usuario = await usuariosRepository.buscarporCpf(CPF);
    return Either.Right(usuario);
  };
};
